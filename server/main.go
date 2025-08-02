package main

import (
	"fmt"
	"log"
	"net/http"

	"server/db"
)

func main() {
	db.InitDB()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Server running 🚀")
	})

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
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
