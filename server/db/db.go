package db

import (
	"database/sql"
	"fmt"
	"log"
	"server/configs"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		configs.GetEnv("DB_USER", "root"),
		configs.GetEnv("DB_PASS", ""),
		configs.GetEnv("DB_HOST", "127.0.0.1"),
		configs.GetEnv("DB_PORT", "3306"),
		configs.GetEnv("DB_NAME", "login_db"),
	)

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("DB connection error: %v", err)
	}

	if err := DB.Ping(); err != nil {
		log.Fatalf("DB ping error: %v", err)
	}

	log.Println("✅ Connected to MySQL DB")
}
