package handlers

import (
	"net/http"
	"server/db"
	"server/models"
	"server/utils"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
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
