import axios from 'axios';

const API_URL = 'http://localhost:8081/Appareil';

const getAllAppareils = () => axios.get(`${API_URL}/list`);

const addAppareil = (appareil) => axios.post(`${API_URL}/ajouter`, appareil);

const deleteAppareil = (id) => axios.delete(`${API_URL}/supprimer/${id}`);

const updateAppareil = (id, appareil) => axios.put(`${API_URL}/miseAJour/${id}`, appareil);

const getAppareilById = (id) => axios.get(`${API_URL}/${id}`);

const getAppareilByIdClient = (id) => axios.get(`${API_URL}/${id}/appareils`);

export {
  getAllAppareils,
  addAppareil,
  deleteAppareil,
  updateAppareil,
  getAppareilById,
  getAppareilByIdClient
};
