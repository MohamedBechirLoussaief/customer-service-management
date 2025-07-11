import axios from 'axios';

const API_URL = 'http://localhost:8081/Client';


const getAllClients = () => axios.get(`${API_URL}/list`);
const getClientById = (id) => axios.get(`${API_URL}/${id}`);
const getClientByNumTel = (numTel) => axios.get(`${API_URL}/telephone/${numTel}`);
const createClient = (client) => axios.post(`${API_URL}/ajouter`, client);
const updateClient = (id, client) => axios.put(`${API_URL}/miseAJour/${id}`, client);
const deleteClient = (id) => axios.delete(`${API_URL}/supprimer/${id}`);

export {
  getAllClients,
  getClientById,
  getClientByNumTel,
  createClient,
  updateClient,
  deleteClient
};
