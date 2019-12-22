// Contains test for retrieving env vars from system or .env
package main

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/zoe-gonzales/meet-up-do-stuff/env"
)

func TestShouldRetrieveEnvVarFromFile(t *testing.T) {
	os.Setenv("youtube_api_key", "123456789")
	var tests = []struct {
		name     string
		varName  string
		expValue string
	}{
		{
			name:     "from_no_dotenv_file",
			varName:  "youtube_api_key",
			expValue: "123456789",
		},
		{
			name:     "from_dotenv_1", // stored in local .env file
			varName:  "google_api_key",
			expValue: "ABCD0EFGH1IJKL2MNOP3",
		},
		{
			name:     "from_dotenv_2", // stored in local .env file
			varName:  "twilio_api_key",
			expValue: "ThisIsYourTwilioAPIKey00123",
		},
	}

	for _, tc := range tests {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			path := "../.env"
			res := env.RetrieveEnvVar(tc.varName, path)
			assert.Equal(t, tc.expValue, res)
		})
	}
}
