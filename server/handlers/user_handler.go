package handlers

import (
	"net/http"
	"server/db"
	"server/models"
	"server/utils"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	rows, err := db.DB.Query("SELECT * FROM users")
	if err != nil {
		utils.SendError(w, http.StatusInternalServerError, "DB query error")
		return
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
			utils.SendError(w, http.StatusInternalServerError, "Error scanning user")
			return
		}
		users = append(users, user)
	}

	utils.SendResponse(w, http.StatusOK, "OK", "success", users)
}

func GetSingleUsers(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/api/v1/users/"):]

	if id == "" {
		utils.SendError(w, http.StatusBadRequest, "User id is required")
		return
	}

	row := db.DB.QueryRow("SELECT * FROM users WHERE id = ?", id)

	var user models.User
    err := row.Scan(&user.ID, &user.Name, &user.Email)
    if err != nil {
        utils.SendError(w, http.StatusNotFound, "User not found")
        return
    }

	utils.SendResponse(w, http.StatusOK, "OK", "success", user)
}
