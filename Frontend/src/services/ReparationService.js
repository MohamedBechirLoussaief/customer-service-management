import axios from "axios";

const API_BASE_URL = "http://localhost:8081/Reparation";

const createReparation = (reparation) => axios.post(`${API_BASE_URL}/ajouter`, reparation);

const deleteReparation = (id) => axios.delete(`${API_BASE_URL}/supprimer/${id}`);

const updateReparation = (id, reparation) => axios.put(`${API_BASE_URL}/miseAJour/${id}`, reparation);

const getAllReparations = () => axios.get(`${API_BASE_URL}/list`);

const getReparationById = (id) => axios.get(`${API_BASE_URL}/${id}`);

const getReparationByIdDemandeReparation = (id) => axios.get(`${API_BASE_URL}/${id}/reparation`);

export {
    createReparation,
    deleteReparation,
    updateReparation,
    getAllReparations,
    getReparationById,
    getReparationByIdDemandeReparation,
  };
