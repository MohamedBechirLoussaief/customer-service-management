import axios from 'axios';

const API_URL = 'http://localhost:8081/utilisateurs';

const ajouter = (utilisateur) => axios.post(`${API_URL}/ajouter`, utilisateur);
const supprimer = (id) => axios.delete(`${API_URL}/supprimer/${id}`);
const modifier = (id, utilisateur) => axios.put(`${API_URL}/miseAJour/${id}`, utilisateur);
const getAll = () => axios.get(`${API_URL}/list`);
const getById = (id) => axios.get(`${API_URL}/${id}`);
const verifier = (username, password) => axios.get(`${API_URL}/Verifier/${username}/${password}`);
const findByUsername = (username) => axios.get(`${API_URL}/username/${username}`);

export {
     ajouter,
     supprimer,
     modifier,
     getAll,
     getById,
     verifier,
     findByUsername,
   };
   