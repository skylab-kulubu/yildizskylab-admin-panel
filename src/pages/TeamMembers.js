import React, { useState, useEffect } from "react";
import { fetchTeams, fetchTeamById, addTeamLead, removeTeamLead } from "../services/teamsService";
import { fetchUsers } from "../services/usersService";

const TeamMembers = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const getTeamsAndUsers = async () => {
      try {
        const teamsData = await fetchTeams();
        console.log('Fetched teams data:', teamsData);
        setTeams(teamsData); // Adjusted based on API response
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching teams or users:', error);
      }
    };
    getTeamsAndUsers();
  }, []);

  const handleTeamSelection = async (teamId) => {
    if (teamId) {
      const teamData = await fetchTeamById(teamId);
      console.log('Selected team data:', teamData);
      setSelectedTeam(teamData.data);
    } else {
      setSelectedTeam(null);
    }
  };

  const handleAddMember = async () => {
    if (selectedTeam && selectedUserId) {
      const userIdAsInt = parseInt(selectedUserId, 10);
      await addTeamLead(selectedTeam.id, userIdAsInt);
      alert("Üye başarıyla eklendi!");
      // Refresh selected team data
      const updatedTeam = await fetchTeamById(selectedTeam.id);
      setSelectedTeam(updatedTeam.data);
    }
  };

  const handleRemoveMember = async (userId) => {
    if (selectedTeam) {
      await removeTeamLead(selectedTeam.id, userId);
      alert("Üye başarıyla çıkarıldı!");
      // Refresh selected team data
      const updatedTeam = await fetchTeamById(selectedTeam.id);
      setSelectedTeam(updatedTeam.data);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Takım Üyeleri</h1>

      {/* Team Selection */}
      <select
        onChange={(e) => handleTeamSelection(parseInt(e.target.value))}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Bir takım seçin</option>
        {Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))
        ) : (
          <option value="">Takım bulunamadı</option>
        )}
      </select>

      {/* Display Selected Team Details */}
      {selectedTeam ? (
        <>
          <h2 className="text-lg mt-4">Takım Adı: {selectedTeam.name}</h2>
          {/* Member List and Management */}
          {Array.isArray(selectedTeam.team_leads) && selectedTeam.team_leads.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-lg">Üyeler:</h2>
              {selectedTeam.team_leads.map((member) => (
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
            </div>
          ) : (
            <p className="mt-4">Bu takımda henüz üye yok.</p>
          )}

          {/* Add New Member */}
          <div className="mt-4">
            <select
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Bir üye seçin</option>
              {Array.isArray(users) && users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button onClick={handleAddMember} className="ml-2 bg-green-500 text-white p-2 rounded">
              Üye Ekle
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4">Takım seçiniz...</p>
      )}
    </div>
  );
};

export default TeamMembers;
