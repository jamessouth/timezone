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

	client, ctx, collection := GetMongoClient()
	fmt.Println(client, ctx, collection)

	if collection != nil {

		res, err := collection.InsertOne(context.Background(), bson.M{"hello": "world"})
		fmt.Println(res)
		if err != nil {
			fmt.Println("There was an error:", err)
			// w.Write([]byte("thre was n error"))
		}
	} else {

		w.Write([]byte("Error connecting to database. Please try again."))
	}
	// id := res.InsertedID
	// fmt.Println(id)
	// err3 := client.Disconnect(ctx)
	// if err3 != nil {
	// 	fmt.Print("err3", err3)
	// }
	// fmt.Println("closed")
	// return
}
