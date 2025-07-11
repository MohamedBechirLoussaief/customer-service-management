import axios from "axios";

const BASE_URL = "http://localhost:8081/PieceRechange";

const getAllPieceRechanges = () => axios.get(`${BASE_URL}/list`);

const getPieceRechangeById = (id) => axios.get(`${BASE_URL}/${id}`);

const addPieceRechange = (pieceRechange) =>axios.post(`${BASE_URL}/ajouter`, pieceRechange);

const updatePieceRechange = (id, pieceRechange) =>axios.put(`${BASE_URL}/miseAJour/${id}`, pieceRechange);

const deletePieceRechange = (id) =>axios.delete(`${BASE_URL}/supprimer/${id}`);

const getPieceRechangesByType = (idType) =>axios.get(`${BASE_URL}/${idType}/piecesRechanges`);

export {
  getAllPieceRechanges,
  getPieceRechangeById,
  addPieceRechange,
  updatePieceRechange,
  deletePieceRechange,
  getPieceRechangesByType,
};
