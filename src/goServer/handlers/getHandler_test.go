package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetHandler(t *testing.T) {

	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetHandler)

	handler.ServeHTTP(rr, req)

	status := rr.Code

	if status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	headers := rr.Result().Header
	_, accCtrlOk := headers["Access-Control-Allow-Origin"]

	if !accCtrlOk {
		t.Error("handler did not return the Access-Control-Allow-Origin header")
	}

	// fmt.Printf("header: %v", headers)

	// Check the response body is what we expect.
	// expected := `{"alive": true}`
	// if rr.Body.String() != expected {
	//     t.Errorf("handler returned unexpected body: got %v want %v",
	//         rr.Body.String(), expected)
	// }
}
