package main

import (
	"github.com/jamessouth/timezones/src/goServer/controllers"
	"net/http"
)

func main() {
	controllers.RegisterControllers()
	http.ListenAndServe(":3101", nil)
}
