package handlers

import (
	"context"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

/*
GetHandler handles a get method request sent to the server
*/
func GetHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3100")
	w.WriteHeader(http.StatusOK)

	fmt.Println("get handler reached")

	// w.Write([]byte("connecting......"))

	client, ctx, err := GetMongoClient()

	if err != nil {
		fmt.Println("There was an error: ", err)
		w.Write([]byte("There was an error.  Please try again."))
	} else {
		fmt.Println("no error........", err)
	}

	collection := client.Database("tzs").Collection("timezones")

	fmt.Println("collection: ", collection)
	w.Write([]byte("collection...."))

	res, err2 := collection.InsertOne(context.Background(), bson.M{"hello": "world"})
	if err2 != nil {
		fmt.Println("err2_fired", err2)
		w.Write([]byte("thre was n error"))
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
