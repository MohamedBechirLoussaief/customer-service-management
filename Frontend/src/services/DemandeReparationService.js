import axios from 'axios';

const API_URL = 'http://localhost:8081/DemandeReparation';

const getAllDemandeReparations = () => axios.get(`${API_URL}/list`);
const getDemandeReparationById = (id) => axios.get(`${API_URL}/${id}`);
const createDemandeReparation = (demandeReparation) => axios.post(`${API_URL}/ajouter`, demandeReparation);
const updateDemandeReparation = (id, demandeReparation) => axios.put(`${API_URL}/miseAJour/${id}`, demandeReparation);
const deleteDemandeReparation = (id) => axios.delete(`${API_URL}/supprimer/${id}`);
const updateDemandeReparationEtat = (id, etat) => axios.put(`${API_URL}/miseAJourEtat/${id}/${etat}`);
export {
  getAllDemandeReparations,
  getDemandeReparationById,
  createDemandeReparation,
  updateDemandeReparation,
  deleteDemandeReparation,
  updateDemandeReparationEtat
};
