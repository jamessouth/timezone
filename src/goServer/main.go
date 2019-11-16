package main

import (
	"log"
	"net/http"

	"github.com/jamessouth/timezones/src/goServer/controllers"
)

func main() {
	controllers.RegisterControllers()
	log.Fatal(http.ListenAndServe(":3101", nil))
}
