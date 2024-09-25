import api from "../api/api";

// Fetch teams
export const fetchTeams = async (pageId = 1, pageSize = 10) => {
  try {
    const response = await api.get(
      `/teams?page_id=${pageId}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Takımlar getirilemedi: " + error.message);
  }
};

// Create a new team
export const createTeam = async (team) => {
  try {
    const response = await api.post("/teams", team);
    console.log("Team created successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Takım oluşturulamadı: " + error.message);
  }
};

// Update a team
export const updateTeam = async (team) => {
  try {
    console.log("Sending PUT request to update team with the following data:");
    console.log({
      name: team.name, // Name of the team
      description: team.description, // Description of the team
    });

    const response = await api.put(`/teams/${team.id}`, {
      name: team.name,
      description: team.description,
    });

    return response.data;
  } catch (error) {
    console.error("Error during PUT request:");
    console.error("Error message:", error.message);
    console.error("Request body:", {
      name: team.name,
      description: team.description,
    });

    throw new Error("Takım güncellenemedi: " + error.message);
  }
};

// Delete a team
export const deleteTeam = async (teamId) => {
  try {
    console.log("Deleting team with ID:", teamId);
    await api.delete(`/teams/${teamId}`);
    console.log("Team deleted successfully");
  } catch (error) {
    console.error("Error during DELETE request:", error.message);
    throw new Error("Takım silinemedi: " + error.message);
  }
};

// Add a member to a team
export const addTeamMember = async (teamId, userId) => {
  try {
    const response = await api.post("/teams/member", { team_id: teamId, user_id: userId, role: "member" });
    console.log("Team member added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Üye eklenemedi: " + error.message);
  }
};

// Remove a member from a team
export const removeTeamMember = async (teamId, userId) => {
  try {
    const response = await api.delete("/teams/member", { data: { team_id: teamId, user_id: userId } });
    console.log("Team member removed successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Üye çıkarılamadı: " + error.message);
  }
};

// Add a lead to a team
export const addTeamLead = async (teamId, userId) => {
  try {
    const response = await api.post("/teams/member", { team_id: teamId, user_id: userId, role: "lead" });
    console.log("Team lead added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Lider eklenemedi: " + error.message);
  }
};

// Remove a lead from a team
export const removeTeamLead = async (teamId, userId) => {
  try {
    const response = await api.delete("/teams/lead", { data: { team_id: teamId, user_id: userId } });
    console.log("Team lead removed successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Lider çıkarılamadı: " + error.message);
  }
};

// Add a project to a team
export const addTeamProject = async (teamId, projectId) => {
  try {
    const response = await api.post("/teams/project", { team_id: teamId, project_id: projectId });
    console.log("Team project added successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Proje eklenemedi: " + error.message);
  }
};

// Remove a project from a team
export const removeTeamProject = async (teamId, projectId) => {
  try {
    const response = await api.delete("/teams/project", { data: { team_id: teamId, project_id: projectId } });
    console.log("Team project removed successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Proje çıkarılamadı: " + error.message);
  }
};
