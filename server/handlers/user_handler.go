package handlers

import (
	"net/http"
	"server/db"
	"server/models"
	"server/utils"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	rows, err := db.DB.Query("SELECT id, name, email FROM users")
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "DB query error")
		return
	}
	defer rows.Close()

	var users []models.User

	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
			utils.RespondWithError(w, http.StatusInternalServerError, "Error scanning user")
			return
		}
		users = append(users, user)
	}

	utils.RespondWithJSON(w, http.StatusOK, users)
}
