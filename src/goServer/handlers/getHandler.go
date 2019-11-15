package handlers

import (
	"fmt"
	"net/http"
)

/*
GetHandler handles a get method request sent to the server
*/
func GetHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("get", r)

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3100")
	w.WriteHeader(http.StatusOK)
}
