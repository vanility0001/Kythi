package main

import (
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

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

	server := fiber.New()

	server.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	server.Listen(":" + os.Getenv("PORT"))
}
