package routes

import (
	"net/http"
	"server/handlers"
	"server/middleware"
)

func SetupRoutes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("🚀 Server is up!"))
	})

	// Wrap handler with CORS middleware
	mux.HandleFunc("/api/v1/users", middleware.CORSMiddleware(handlers.GetUsers))

	return mux
}
