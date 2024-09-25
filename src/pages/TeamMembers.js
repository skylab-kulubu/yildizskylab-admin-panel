import React, { useState, useEffect } from "react";
import { fetchTeams, addTeamMember, removeTeamMember } from "../services/teamsService";
import { fetchUsers } from "../services/usersService";

const TeamMembers = () => {
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

  const handleAddMember = async () => {
    if (selectedTeam && selectedUserId) {
      const userIdAsInt = parseInt(selectedUserId, 10); // selectedUserId string olarak geliyor, bu yüzden int'e çeviriyoruz
      await addTeamMember(selectedTeam.id, userIdAsInt);
      alert("Üye başarıyla eklendi!");
    }
  };

  const handleRemoveMember = async (userId) => {
    if (selectedTeam) {
      await removeTeamMember(selectedTeam.id, userId);
      alert("Üye başarıyla çıkarıldı!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Takım Üyeleri</h1>

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

      {/* Member List and Management */}
      {selectedTeam && selectedTeam.members && selectedTeam.members.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg">Üyeler:</h2>
          {selectedTeam.members.map((member) => (
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
      {selectedTeam && (
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
      )}
    </div>
  );
};

export default TeamMembers;
