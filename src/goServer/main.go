package main

import (
	"fmt"
	"net/http"

	"github.com/jamessouth/timezones/src/goServer/controllers"
)

func main() {
	fmt.Println("server running on port 3101!")
	controllers.RegisterControllers()
	http.ListenAndServe(":3101", nil)

}
