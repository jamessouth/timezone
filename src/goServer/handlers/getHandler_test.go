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
		t.Errorf("handler returned wrong status code: wanted %v but got %v", http.StatusOK, status)
	}

	headers := rr.Result().Header
	accCtrlVal, accCtrl := headers["Access-Control-Allow-Origin"]

	if !accCtrl {
		t.Fatal("handler did not return Access-Control-Allow-Origin header")
	}

	if accCtrlVal[0] != "http://localhost:3100" {
		t.Errorf("handler returned wrong value for ACAO header: wanted %v but got %v", "http://localhost:3100", accCtrlVal[0])
	}

	// fmt.Printf("header: %v", headers)

	// Check the response body is what we expect.
	// expected := `{"alive": true}`
	// if rr.Body.String() != expected {
	//     t.Errorf("handler returned unexpected body: got %v want %v",
	//         rr.Body.String(), expected)
	// }
}
