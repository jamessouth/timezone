package handlers

import (
	"fmt"
	"net/http"
)

/*
PostHandler handles a post method request sent to the server
*/
func PostHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("post")
}
