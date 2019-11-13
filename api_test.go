package main

import (
	"fmt"
	"github.com/zoe-gonzales/meet-up-do-stuff/api"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestShouldSendEventToClient(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(api.GetSingleEvent))
	defer ts.Close()
	url := ts.URL + "/events/26"
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	eventDetails, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", eventDetails)
}
