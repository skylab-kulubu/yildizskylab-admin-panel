import React from 'react';
import { FaTimes, FaTrash, FaEdit, FaSave } from 'react-icons/fa'; // Importing icons from Font Awesome
import { updateUser, deleteUser } from '../services/usersService'; // Importing the services

const UserModal = ({
  isOpen,
  closeModal,
  user,
  isEditMode,
  setIsEditMode,
  handleInputChange,
  refreshUsersList // Function to refresh users after update/delete
}) => {
  if (!isOpen) return null; // Do not render if modal is not open

  // Handle Update User
  const handleUpdateUser = async () => {
    try {
      await updateUser(user); // Call the updateUser service
      refreshUsersList(); // Refresh the users list after update
      closeModal(); // Close the modal after update
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId); // Call the deleteUser service
      refreshUsersList(); // Refresh the users list after delete
      closeModal(); // Close the modal after delete
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
      {/* Modal Content */}
      <div className="bg-[#1a1a1a] text-[#EADAFF] rounded-lg shadow-lg w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-xl font-semibold">{isEditMode ? 'Kullanıcıyı Düzenle' : 'Kullanıcı Detayları'}</h2>
          <button className="text-[#EADAFF] hover:text-gray-100" onClick={closeModal}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4">
          <label className="block text-sm font-medium">İsim:</label>
          {isEditMode ? (
            <input
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.name}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Soyisim:</label>
          {isEditMode ? (
            <input
              type="text"
              name="last_name"
              value={user.last_name || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.last_name}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Email:</label>
          {isEditMode ? (
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.email}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Telefon Numarası:</label>
          {isEditMode ? (
            <input
              type="text"
              name="telephone_number"
              value={user.telephone_number || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.telephone_number}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Üniversite:</label>
          {isEditMode ? (
            <input
              type="text"
              name="university"
              value={user.university || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.university}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Bölüm:</label>
          {isEditMode ? (
            <input
              type="text"
              name="department"
              value={user.department || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.department}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Doğum Tarihi:</label>
          {isEditMode ? (
            <input
              type="datetime-local"
              name="date_of_birth"
              value={user.date_of_birth || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.date_of_birth}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Rol:</label>
          {isEditMode ? (
            <input
              type="text"
              name="role"
              value={user.role || ''}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
            />
          ) : (
            <p className="mt-1">{user.role}</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end space-x-4">
          {isEditMode && (
            <button
              onClick={handleUpdateUser}
              className="bg-green-500 hover:bg-green-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
            >
              <FaSave className="mr-2" /> Kaydet
            </button>
          )}
          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
            >
              <FaEdit className="mr-2" /> Düzenle
            </button>
          )}
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="bg-red-500 hover:bg-red-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
