FROM golang:1.17.4-alpine

WORKDIR /usr/src/app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN touch .env

RUN go build -o main

CMD ["./main"]