package routes

import (
	"net/http"
	"server/handlers"
)

func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("🚀 Server is up!"))
	})

	mux.HandleFunc("/api/v1/users", handlers.GetUsers)

	return mux
}
