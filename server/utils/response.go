package utils

import (
	"encoding/json"
	"net/http"
)

type ApiResponse struct {
	Code    string         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func SendResponse(w http.ResponseWriter, statusCode int, code string, message string, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(ApiResponse{
		Code:    code,
		Message: message,
		Data:    data,
	})
}

func SendError(w http.ResponseWriter, statusCode int, message string) {
	statusText := http.StatusText(statusCode)
	SendResponse(w, statusCode, statusText, message, nil)
}

