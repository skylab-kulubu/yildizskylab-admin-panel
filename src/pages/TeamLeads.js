import React, { useState, useEffect } from "react";
import { fetchTeams, addTeamLead, removeTeamLead } from "../services/teamsService";
import { fetchUsers } from "../services/usersService";

const TeamLeads = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const getTeamsAndUsers = async () => {
      const teamsData = await fetchTeams();
      setTeams(teamsData); // teamsData'daki yapıya göre ayarladım
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    getTeamsAndUsers();
  }, []);

  const handleAddLead = async () => {
    if (selectedTeam && selectedUserId) {
      await addTeamLead(selectedTeam.id, selectedUserId);
      alert("Lider başarıyla eklendi!");
    }
  };

  const handleRemoveLead = async (userId) => {
    if (selectedTeam) {
      await removeTeamLead(selectedTeam.id, userId);
      alert("Lider başarıyla çıkarıldı!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Takım Liderleri</h1>

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

      {/* Lead List and Management */}
      {selectedTeam && (
        <div className="mt-4">
          <h2 className="text-lg">Liderler:</h2>
          {selectedTeam.leads && selectedTeam.leads.map((lead) => (
            <div key={lead.id} className="flex justify-between items-center">
              <p>{lead.name}</p>
              <button
                className="text-red-500"
                onClick={() => handleRemoveLead(lead.id)}
              >
                Lideri Çıkar
              </button>
            </div>
          ))}

          {/* Add New Lead */}
          <div className="mt-4">
            <select
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Bir lider seçin</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button onClick={handleAddLead} className="ml-2 bg-green-500 text-white p-2 rounded">
              Lider Ekle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLeads;
