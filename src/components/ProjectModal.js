import React, { useState, useEffect } from 'react';
import { FaTimes, FaTrash, FaSave } from 'react-icons/fa';

const ProjectModal = ({
  isOpen,
  closeModal,
  project,
  isEditMode,
  handleSaveProject,
  handleDeleteProject
}) => {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    if (project) {
      setFormState({
        id: project.id || '',
        name: project.name || '',
        description: project.description || '',
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    handleSaveProject(formState);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#1a1a1a] text-[#EADAFF] rounded-lg shadow-lg w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside the modal
      >
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-xl font-semibold">
            {isEditMode ? 'Projeyi Düzenle' : 'Proje Ekle'}
          </h2>
          <button
            className="text-[#EADAFF] hover:text-gray-100"
            onClick={closeModal}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Project Name */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Proje İsmi:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 rounded-md bg-gray-800 text-[#EADAFF] border border-gray-700"
          />
        </div>

        {/* Project Description */}
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

        {/* Save and Delete Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
          >
            <FaSave className="mr-2" />
            {isEditMode ? 'Güncelle' : 'Kaydet'}
          </button>

          {isEditMode && (
            <button
              onClick={() => handleDeleteProject(formState.id)}
              className="bg-red-500 hover:bg-red-600 text-[#EADAFF] py-2 px-4 rounded-lg flex items-center"
            >
              <FaTrash className="mr-2" />
              Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
