import axios from "axios";

const BASE_URL = "http://localhost:8081/TypePiece";

const getAllTypePieces = () => axios.get(`${BASE_URL}/list`);

const getTypePieceById = (id) => axios.get(`${BASE_URL}/${id}`);

const addTypePiece = (typePiece) => axios.post(`${BASE_URL}/ajouter`, typePiece);

const updateTypePiece = (id, typePiece) => axios.put(`${BASE_URL}/miseAJour/${id}`, typePiece);

const deleteTypePiece = (id) => axios.delete(`${BASE_URL}/supprimer/${id}`);

export {
  getAllTypePieces,
  getTypePieceById,
  addTypePiece,
  updateTypePiece,
  deleteTypePiece,
};
