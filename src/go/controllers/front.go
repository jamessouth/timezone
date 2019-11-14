package controllers

import "net/http"

/*
RegisterControllers registers a route
*/
func RegisterControllers() {
	mc := newMyController()

	http.Handle("/", mc)
}
