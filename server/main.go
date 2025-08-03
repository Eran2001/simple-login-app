package main

import (
	"fmt"
	"log"
	"net/http"
	"server/configs"
	"server/db"
	"server/routes"
)

func main() {
	configs.LoadEnv()
	db.InitDB()

	router := routes.SetupRoutes()

	fmt.Println("✅ Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
