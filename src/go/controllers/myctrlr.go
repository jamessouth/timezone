package controllers

import (
	"regexp"

	"net/http"

	"github.com/jamessouth/timezones/src/go/handlers"
)

type myController struct {
	myRoute *regexp.Regexp
}

func (mc myController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		switch r.Method {
		case http.MethodGet:
			mc.getRoute()
		case http.MethodPost:
			mc.postRoute()
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

func (mc *myController) getRoute() {
	handlers.GetHandler()
}

func (mc *myController) postRoute() {
	handlers.PostHandler()
}

func newMyController() *myController {
	return &myController{
		myRoute: regexp.MustCompile(`/`),
	}
}
