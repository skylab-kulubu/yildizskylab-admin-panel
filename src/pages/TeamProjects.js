import React, { useState, useEffect } from "react";
import { fetchTeams, addTeamProject, removeTeamProject } from "../services/teamsService";
import { fetchProjects } from "../services/projectsService";

const TeamProjects = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    const getTeamsAndProjects = async () => {
      const teamsData = await fetchTeams();
      setTeams(teamsData); // teamsData'daki yapıya göre ayarladım
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    };
    getTeamsAndProjects();
  }, []);

  const handleAddProject = async () => {
    if (selectedTeam && selectedProjectId) {
      await addTeamProject(selectedTeam.id, selectedProjectId);
      alert("Proje başarıyla eklendi!");
    }
  };

  const handleRemoveProject = async (projectId) => {
    if (selectedTeam) {
      await removeTeamProject(selectedTeam.id, projectId);
      alert("Proje başarıyla çıkarıldı!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Takım Projeleri</h1>

      {/* Team Selection */}
      <select
        onChange={(e) => setSelectedTeam(teams.find((team) => team.id === parseInt(e.target.value)))}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Bir takım seçin</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      {/* Project List and Management */}
      {selectedTeam && (
        <div className="mt-4">
          <h2 className="text-lg">Projeler:</h2>
          {selectedTeam.projects && selectedTeam.projects.map((project) => (
            <div key={project.id} className="flex justify-between items-center">
              <p>{project.name}</p>
              <button
                className="text-red-500"
                onClick={() => handleRemoveProject(project.id)}
              >
                Projeyi Çıkar
              </button>
            </div>
          ))}

          {/* Add New Project */}
          <div className="mt-4">
            <select
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Bir proje seçin</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <button onClick={handleAddProject} className="ml-2 bg-green-500 text-white p-2 rounded">
              Proje Ekle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamProjects;
