package main

import (
	"net/http"
	"github.com/jamessouth/timezones/src/go/controllers"
)

func main() {
	controllers.RegisterControllers()
	http.ListenAndServe(":3101", nil)
}
