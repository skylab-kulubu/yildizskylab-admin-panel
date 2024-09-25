import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../services/projectsService';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData.data || []);
      } catch (err) {
        console.error('Projeler alınamadı:', err);
        setError('Projeler alınamadı.');
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const openModal = (project = null) => {
    setCurrentProject(project);
    setIsEditMode(!!project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentProject(null);
  };

  const handleSaveProject = async (project) => {
    try {
      if (isEditMode) {
        await updateProject(project);
      } else {
        await createProject(project);
      }
      refreshProjects();
      closeModal();
    } catch (error) {
      console.error('Proje kaydedilemedi:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      refreshProjects();
    } catch (err) {
      console.error('Proje silinemedi:', err);
    }
  };

  const refreshProjects = async () => {
    const projectsData = await fetchProjects();
    setProjects(projectsData.data || []);
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Projeler</h1>
      <button
        onClick={() => openModal()}
        className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center mb-4"
      >
        Proje Ekle
      </button>
      <div className="flex flex-wrap mt-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 shadow-lg p-6 m-4 w-64 rounded-lg cursor-pointer"
            onClick={() => openModal(project)}
          >
            <h2 className="text-lg font-bold">{project.name}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <ProjectModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          project={currentProject}
          isEditMode={isEditMode}
          handleSaveProject={handleSaveProject}
          handleDeleteProject={handleDeleteProject}
        />
      )}
    </div>
  );
};

export default Projects;
