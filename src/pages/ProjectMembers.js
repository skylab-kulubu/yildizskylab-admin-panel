import React, { useState, useEffect } from "react";
import { fetchProjects, addProjectMember, removeProjectMember } from "../services/projectsService";
import { fetchUsers } from "../services/usersService";

const ProjectMembers = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const getProjectsAndUsers = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData.data);
      const usersData = await fetchUsers();
      setUsers(usersData.data);
    };
    getProjectsAndUsers();
  }, []);

  const handleAddMember = async () => {
    if (selectedProject && selectedUserId) {
      await addProjectMember(selectedProject.id, selectedUserId);
      alert("Üye başarıyla eklendi!");
    }
  };

  const handleRemoveMember = async (userId) => {
    if (selectedProject) {
      await removeProjectMember(selectedProject.id, userId);
      alert("Üye başarıyla çıkarıldı!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Proje Üyeleri</h1>

      {/* Project Selection */}
      <select
        onChange={(e) => setSelectedProject(projects.find((project) => project.id === parseInt(e.target.value)))}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Bir proje seçin</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>

      {/* Member List and Management */}
      {selectedProject && (
        <div className="mt-4">
          <h2 className="text-lg">Üyeler:</h2>
          {selectedProject.members.map((member) => (
            <div key={member.id} className="flex justify-between items-center">
              <p>{member.name}</p>
              <button
                className="text-red-500"
                onClick={() => handleRemoveMember(member.id)}
              >
                Üyeyi Çıkar
              </button>
            </div>
          ))}

          {/* Add New Member */}
          <div className="mt-4">
            <select
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Bir üye seçin</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button onClick={handleAddMember} className="ml-2 bg-green-500 text-white p-2 rounded">
              Üye Ekle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMembers;
