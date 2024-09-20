import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/usersService';
import UserModal from '../components/UserModal'; // Custom modal

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData.data || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Kullanıcılar alınamadı.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Open Modal to View/Edit User
  const openModal = (user) => {
    setCurrentUser(user);
    setModalIsOpen(true);
    setIsEditMode(false);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentUser(null);
  };

  // Handle Input Changes in Edit Mode
  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  // Handle Update User
  const handleUpdateUser = async () => {
    try {
      // Call your update service here
      // await updateUser(currentUser);
      closeModal();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    try {
      // Call your delete service here
      // await deleteUser(userId);
      closeModal();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#eadaff] text-center">Kullanıcılar</h1>
      <div className="flex flex-wrap mt-4">
        {users.map((user) => (
          <div
          key={user.id}
          className="bg-[#1a1a1a] shadow-[0_0_15px_10px_rgba(234,218,255,0.5)] p-6 m-8 w-64 rounded-lg cursor-pointer transition duration-300 hover:shadow-[0_0_15px_10px_rgba(234,218,255,0.8)]"
          onClick={() => openModal(user)}
        >
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <p className="text-gray-300">{user.email}</p>
          </div>
        ))}
      </div>

      {/* User Modal */}
      {modalIsOpen && (
        <UserModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          user={currentUser}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          handleInputChange={handleInputChange}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default Users;
