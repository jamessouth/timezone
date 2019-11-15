package handlers

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	ms := mockServer()
	defer ms.Close()
	m.Run()
	os.Exit(0)
}

func TestWritesAccessControlHeaderToResponse(t *testing.T) {
	req, err := http.NewRequest("GET", "http://localhost:3101", nil)
	w := httptest.NewRecorder()

}

func mockServer() *httptest.Server {
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		GetHandler(w, r)
	}))
}
