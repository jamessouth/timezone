package handlers

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
GetHandler handles a get method request sent to the server
*/
func GetHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3100")
	w.WriteHeader(http.StatusOK)

	fmt.Print()
	fmt.Println("server running!")
	fmt.Print()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	if err != nil {
		fmt.Println("There was an error: ", err)
	}

	collection := client.Database("tzs").Collection("timezones")

	fmt.Println("collection: ", collection)

	res, err2 := collection.InsertOne(context.Background(), bson.M{"hello": "world"})
	if err2 != nil {
		fmt.Println("err2", err2)
	}
	id := res.InsertedID
	fmt.Println(id)
	err3 := client.Disconnect(ctx)
	if err3 != nil {
		fmt.Print("err3", err3)
	}
	fmt.Println("closed")
	return
}
