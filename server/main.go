package main

import (
	"fmt"
	"log"
	"net/http"

	"server/db"
)

func main() {
	db.InitDB()

	http.HandleFunc("/api/v1/users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		rows, err := db.DB.Query("SELECT id, name, email FROM users")
		if err != nil {
			http.Error(w, "DB query error", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		for rows.Next() {
			var id int
			var name, email string
			rows.Scan(&id, &name, &email)
			fmt.Fprintf(w, "ID: %d, Name: %s, Email: %s\n", id, name, email)
		}
	})

	fmt.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
