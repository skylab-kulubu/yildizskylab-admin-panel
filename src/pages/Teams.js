import React, { useState, useEffect } from "react";
import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,    // Import add member function
  removeTeamMember, // Import remove member function
  addTeamLead,      // Import add lead function
  removeTeamLead,   // Import remove lead function
  addTeamProject,   // Import add project function
  removeTeamProject // Import remove project function
} from "../services/teamsService";
import TeamModal from "../components/TeamModal"; // Assuming you have a modal for teams
import { FaPlus } from "react-icons/fa";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);

  // Fetch teams when the component mounts
  useEffect(() => {
    const getTeams = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData.data || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Takımlar alınamadı.");
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, []);

  // Open Modal to Add or Edit Team
  const openModal = (team = null) => {
    setCurrentTeam(team);
    setIsEditMode(!!team);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTeam(null);
  };

  // Handle Create or Update Team
  const handleSaveTeam = async (team) => {
    try {
      if (isEditMode) {
        await updateTeam(team);
      } else {
        await createTeam(team);
      }
      refreshTeams();
      closeModal();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  // Handle Delete Team
  const handleDeleteTeam = async (teamId) => {
    try {
      await deleteTeam(teamId);
      refreshTeams();
      closeModal();
    } catch (err) {
      console.error("Error deleting team:", err);
    }
  };

  // Handle adding a member to the team
  const handleAddMember = async (teamId, userId) => {
    try {
      await addTeamMember(teamId, userId);
      refreshTeams();
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  // Handle removing a member from the team
  const handleRemoveMember = async (teamId, userId) => {
    try {
      await removeTeamMember(teamId, userId);
      refreshTeams();
    } catch (err) {
      console.error("Error removing member:", err);
    }
  };

  // Handle adding a lead to the team
  const handleAddLead = async (teamId, userId) => {
    try {
      await addTeamLead(teamId, userId);
      refreshTeams();
    } catch (err) {
      console.error("Error adding lead:", err);
    }
  };

  // Handle removing a lead from the team
  const handleRemoveLead = async (teamId, userId) => {
    try {
      await removeTeamLead(teamId, userId);
      refreshTeams();
    } catch (err) {
      console.error("Error removing lead:", err);
    }
  };

  // Handle adding a project to the team
  const handleAddProject = async (teamId, projectId) => {
    try {
      await addTeamProject(teamId, projectId);
      refreshTeams();
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  // Handle removing a project from the team
  const handleRemoveProject = async (teamId, projectId) => {
    try {
      await removeTeamProject(teamId, projectId);
      refreshTeams();
    } catch (err) {
      console.error("Error removing project:", err);
    }
  };

  // Refresh the list of teams after any CRUD operation
  const refreshTeams = async () => {
    const teamsData = await fetchTeams();
    setTeams(teamsData.data || []);
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Takımlar</h1>
      <button
        onClick={() => openModal()}
        className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center mb-4"
      >
        <FaPlus className="mr-2" /> Takım Ekle
      </button>
      <div className="flex flex-wrap mt-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-[#1a1a1a] shadow-[0_0_15px_10px_rgba(234,218,255,0.5)] p-6 m-4 w-64 rounded-lg cursor-pointer"
            onClick={() => openModal(team)}
          >
            <h2 className="text-lg font-bold text-white">{team.name}</h2>
            <p className="text-gray-300">{team.description}</p>
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {modalIsOpen && (
        <TeamModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          team={currentTeam}
          isEditMode={isEditMode}
          handleSaveTeam={handleSaveTeam}
          handleDeleteTeam={handleDeleteTeam}
          addMember={handleAddMember}       
          removeMember={handleRemoveMember}
          addLead={handleAddLead}           
          removeLead={handleRemoveLead}
          addProject={handleAddProject}     
          removeProject={handleRemoveProject}
        />
      )}
    </div>
  );
};

export default Teams;
