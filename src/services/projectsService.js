import api from '../api/api';

// Fetch projects
export const fetchProjects = async (pageId = 1, pageSize = 10) => {
  try {
    const response = await api.get(`/projects?page_id=${pageId}&page_size=${pageSize}`);
    return response.data;
  } catch (error) {
    throw new Error('Projeler getirilemedi: ' + error.message);
  }
};

// Create a new project
export const createProject = async (project) => {
  try {
    const response = await api.post('/projects', project);
    return response.data;
  } catch (error) {
    throw new Error('Proje oluşturulamadı: ' + error.message);
  }
};

// Update a project
export const updateProject = async (project) => {
  try {
    const response = await api.put(`/projects/${project.id}`, project);
    return response.data;
  } catch (error) {
    throw new Error('Proje güncellenemedi: ' + error.message);
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (error) {
    throw new Error('Proje silinemedi: ' + error.message);
  }
};

// Add a member to a project
export const addProjectMember = async (projectId, userId) => {
  try {
    const response = await api.post('/projects/member', { project_id: projectId, user_id: userId });
    return response.data;
  } catch (error) {
    throw new Error('Üye eklenemedi: ' + error.message);
  }
};

// Remove a member from a project
export const removeProjectMember = async (projectId, userId) => {
  try {
    const response = await api.delete('/projects/member', { data: { project_id: projectId, user_id: userId } });
    return response.data;
  } catch (error) {
    throw new Error('Üye çıkarılamadı: ' + error.message);
  }
};
