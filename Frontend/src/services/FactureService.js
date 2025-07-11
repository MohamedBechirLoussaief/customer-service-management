import axios from "axios";

const BASE_URL = "http://localhost:8081/Facture"; // Adjust this URL to match your backend

const ajouterFacture = (facture) => axios.post(`${BASE_URL}/ajouter`, facture);

const supprimerFacture = (id) => axios.delete(`${BASE_URL}/supprimer/${id}`);

const modifierFacture = (id, facture) => axios.put(`${BASE_URL}/miseAJour/${id}`, facture);

const getAllFactures = () => axios.get(`${BASE_URL}/list`);

const getFactureById = (id) => axios.get(`${BASE_URL}/${id}`);

const getFactureByReparationId = (idReparation) => axios.get(`${BASE_URL}/reparation/${idReparation}`);

export {
  ajouterFacture,
  supprimerFacture,
  modifierFacture,
  getAllFactures,
  getFactureById,
  getFactureByReparationId
};
