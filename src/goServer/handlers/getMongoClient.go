package handlers

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
GetMongoClient connects to the db and returns the client
*/
func GetMongoClient() (*mongo.Client, context.Context, *mongo.Collection) {

	defer func() {
		if err := recover(); err != nil {
			log.Println("panic occurred in getMongoClient:", err)
		}
	}()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017").SetServerSelectionTimeout(5*time.Second))

	if err != nil {
		fmt.Println("There was an error:", err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		fmt.Println("There was a connection (ping) error:", err)
		return nil, nil, nil
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("tzs").Collection("timezones")

	return client, ctx, collection
}
