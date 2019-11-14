package controllers

import "regexp"

import "net/http"

type myController struct {
	myRoute *regexp.Regexp
}

func (mc myController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		switch r.Method {
		case http.MethodGet: //todo
		case http.MethodPost: //todo
		default:
			w.WriteHeader(http.StatusNotImplemented)
		}
	} else {
		matches := mc.myRoute.FindStringSubmatch(r.URL.Path)
		if len(matches) == 0 {
			w.WriteHeader(http.StatusNotFound)
			return
		}
	}
}

func newMyController() *myController {
	return &myController{
		myRoute: regexp.MustCompile(`/`),
	}
}
