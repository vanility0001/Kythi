package main

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var fileCollection *mongo.Collection

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal(err)
	}

	if os.Getenv("APP_ENV") == "production" {
		http.PostForm(os.Getenv("DOCKER_STARTUP_WEBHOOK_URL"), url.Values{
			"content":    {"CDN is up and running on docker!"},
			"username":   {"Docker Logs"},
			"avatar_url": {"https://cdn.discordapp.com/attachments/803816121047318529/915951319527874600/docker_facebook_share.png"},
		})
	}

	if client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("MONGO_URI"))); err != nil {
		log.Fatal(err)
	} else {
		fileCollection = client.Database(os.Getenv("MONGO_DATABASE")).Collection("files")
	}

	server := fiber.New(fiber.Config{
		Views: html.New("./pages", ".html"),
	})

	server.Get("*", func(ctx *fiber.Ctx) error {
		var file bson.M
		var isJson bool

		path := strings.Split(ctx.Path(), "/")
		fileName := path[len(path)-1]
		filePath := strings.Join(path[:len(path)-1], "/")

		if strings.HasSuffix(fileName, ".json") {
			isJson = true
			fileName = strings.TrimSuffix(fileName, ".json")
		}

		if filePath == "" {
			filePath = "/"
		}

		if err := fileCollection.FindOne(context.Background(), bson.M{"_id": fileName, "path": filePath}).Decode(&file); err != nil {
			return ctx.SendStatus(http.StatusNotFound)
		}

		mimeType := strings.Split(file["mimeType"].(string), "/")[0]
		uploader := file["uploader"].(primitive.M)
		embed := file["embed"].(primitive.M)
		author := embed["author"].(primitive.M)
		site := embed["site"].(primitive.M)

		if isJson {
			return ctx.JSON(fiber.Map{
				"title":         embed["title"],
				"author_name":   author["text"],
				"author_url":    author["url"],
				"provider_name": site["text"],
				"provider_url":  site["url"],
			})
		}

		return ctx.Render("File", fiber.Map{
			"Embed":    true,
			"Image":    mimeType == "image",
			"Video":    mimeType == "video",
			"Color":    embed["color"],
			"FileURL":  os.Getenv("CDN_URL") + os.Getenv("S3_BUCKET") + "/" + uploader["_id"].(string) + "/" + file["cdnName"].(string),
			"Desc":     embed["description"],
			"EmbedURL": "https://" + ctx.Hostname() + ctx.Path() + ".json",
		})
	})

	server.Listen(":" + os.Getenv("PORT"))
}
