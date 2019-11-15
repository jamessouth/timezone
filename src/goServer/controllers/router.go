package controllers

import (
	"regexp"

	"net/http"

	"github.com/jamessouth/timezones/src/goServer/handlers"
)

type myController struct {
	myRoute *regexp.Regexp
}

func (mc myController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		switch r.Method {
		case http.MethodGet:
			mc.getMethod(w, r)
		case http.MethodPost:
			mc.postMethod(w, r)
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

func (mc *myController) getMethod(w http.ResponseWriter, r *http.Request) {
	handlers.GetHandler(w, r)
}

func (mc *myController) postMethod(w http.ResponseWriter, r *http.Request) {
	handlers.PostHandler(w, r)
}

func newMyController() *myController {
	return &myController{
		myRoute: regexp.MustCompile(`/`),
	}
}
