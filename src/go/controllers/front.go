package controllers

import "net/http"

func RegisterControllers() {
	mc := newMyController()

	http.Handle("/", mc)
}
