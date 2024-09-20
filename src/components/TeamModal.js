import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaSave, FaUserPlus, FaUserTie, FaProjectDiagram } from "react-icons/fa";
import { fetchUsers } from "../services/usersService"; // Import fetchUsers

const TeamModal = ({
  isOpen,
  closeModal,
  team,
  isEditMode,
  handleSaveTeam,
  handleDeleteTeam,
  addMember,
  removeMember,
  addLead,
  removeLead,
  addProject,
  removeProject
}) => {
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    description: "",
    memberId: "",  // Store user ID for member
    leadId: "",    // Store user ID for lead
    projectId: "", // Store project ID
  });

  const [users, setUsers] = useState([]); // Store fetched users

  // Fetch users when the modal is opened
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); // Fetch users
        setUsers(usersData.data || []); // Set the fetched users to state
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (isOpen) {
      getUsers(); // Fetch users if modal is open
    }
  }, [isOpen]);

  useEffect(() => {
    if (team) {
      setFormState({
        id: team.team_id || "",
        name: team.name || "",
        description: team.description || "",
      });
      console.log("Loaded team in modal:", team); // Debugging log
    }
  }, [team]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    handleSaveTeam(formState);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#1a1a1a] text-[#EADAFF] rounded-lg shadow-lg w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Takımı Düzenle" : "Takım Ekle"}
          </h2>
          <button
            className="text-[#EADAFF] hover:text-gray-100"
            onClick={closeModal}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">İsim:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Açıklama:</label>
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          />
        </div>

        {/* Dropdown for adding members */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Üye Seçin:</label>
          <select
            name="memberId"
            value={formState.memberId}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          >
            <option value="">Bir Üye Seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => addMember(parseInt(formState.id), parseInt(formState.memberId))}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaUserPlus className="mr-2" /> Üye Ekle
          </button>
          <button
            onClick={() => removeMember(parseInt(formState.id), parseInt(formState.memberId))}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Üye Sil
          </button>
        </div>

        {/* Dropdown for adding lead */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Lider Seçin:</label>
          <select
            name="leadId"
            value={formState.leadId}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          >
            <option value="">Bir Lider Seçin</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => addLead(parseInt(formState.id), parseInt(formState.leadId))}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaUserTie className="mr-2" /> Lider Ekle
          </button>
          <button
            onClick={() => removeLead(parseInt(formState.id), parseInt(formState.leadId))}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Lider Sil
          </button>
        </div>

        {/* Input for adding projects (assuming projectId is manually entered) */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Proje ID:</label>
          <input
            type="text"
            name="projectId"
            value={formState.projectId}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          />
          <button
            onClick={() => addProject(parseInt(formState.id), parseInt(formState.projectId))}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaProjectDiagram className="mr-2" /> Proje Ekle
          </button>
          <button
            onClick={() => removeProject(parseInt(formState.id), parseInt(formState.projectId))}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-2 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Proje Sil
          </button>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
          >
            <FaSave className="mr-2" /> {isEditMode ? "Güncelle" : "Kaydet"}
          </button>
          {isEditMode && (
            <button
              onClick={() => handleDeleteTeam(parseInt(formState.id))}
              className="bg-red-500 hover:bg-red-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
            >
              <FaTrash className="mr-2" /> Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
