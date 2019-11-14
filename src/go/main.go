package main

import "net/http"

func main() {
	controllers.RegisterControllers()
	http.ListenAndServe(":3101", nil)
}
