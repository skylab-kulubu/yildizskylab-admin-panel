import React, { useRef } from "react";
import { FaTimes, FaTrash, FaEdit, FaSave } from "react-icons/fa"; // Importing icons from Font Awesome
import { updateUser, deleteUser } from "../services/usersService"; // Importing the services

const UserModal = ({
  isOpen,
  closeModal,
  user,
  isEditMode,
  setIsEditMode,
  refreshUsersList, // Function to refresh users after update/delete
}) => {
  const nameRef = useRef(user.name);
  const lastNameRef = useRef(user.last_name);
  const emailRef = useRef(user.email);
  const phoneRef = useRef(user.telephone_number);
  const universityRef = useRef(user.university);
  const departmentRef = useRef(user.department);
  const birthRef = useRef(user.date_of_birth);
  const roleRef = useRef(user.role);

  if (!isOpen) return null; // Do not render if modal is not open

  // Handle Update User
  const handleUpdateUser = async () => {
    console.log(user);
    const newUser = {
      id: user.id,
      name: nameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      telephone_number: phoneRef.current.value,
      university: universityRef.current.value,
      department: departmentRef.current.value,
      date_of_birth: "2000-01-01T00:00:00.000Z",
      role: roleRef.current.value,
    };
    console.log(newUser);
    try {
      await updateUser(newUser); // Call the updateUser service
      refreshUsersList(); // Refresh the users list after update
      closeModal(); // Close the modal after update
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id); // Call the deleteUser service
      refreshUsersList(); // Refresh the users list after delete
      closeModal(); // Close the modal after delete
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      {/* Modal Content */}
      <div
        className="bg-[#1a1a1a] text-[#EADAFF] rounded-lg shadow-lg w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Kullanıcıyı Düzenle" : "Kullanıcı Detayları"}
          </h2>
          <button
            className="text-[#EADAFF] hover:text-gray-100"
            onClick={closeModal}
          >
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
              ref={nameRef}
              defaultValue={user.name}
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
              ref={lastNameRef}
              defaultValue={user.last_name}
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
              ref={emailRef}
              defaultValue={user.email}
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
              ref={phoneRef}
              defaultValue={user.telephone_number}
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
              ref={universityRef}
              defaultValue={user.university}
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
              ref={departmentRef}
              defaultValue={user.department}
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
              ref={birthRef}
              defaultValue={user.date_of_birth}
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
              ref={roleRef}
              defaultValue={user.role}
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
            onClick={handleDeleteUser}
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
