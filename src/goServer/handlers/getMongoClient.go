package handlers

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
GetMongoClient connects to the db and returns the client
*/
func GetMongoClient() (*mongo.Client, context.Context, error) {

	defer func() {
		if err := recover(); err != nil {
			log.Println("panic occurred:", err)
		}
	}()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("moneeeeeeeeeeeeeeeeeeeee17"))

	return client, ctx, err
}
