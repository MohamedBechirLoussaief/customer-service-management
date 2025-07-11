import axios from "axios";

const BASE_URL = "http://localhost:8081/PieceRechangeReparation";

const ajouter = (pieceRechangesReparation) => axios.post(`${BASE_URL}/ajouter`, pieceRechangesReparation);

const supprimer = (idReparation, idPieceRechange) => axios.delete(`${BASE_URL}/supprimer/${idReparation}/${idPieceRechange}`);

const miseAJour = (idReparation, idPieceRechange, pieceRechangesReparation) => axios.put(`${BASE_URL}/miseAJour/${idReparation}/${idPieceRechange}`, pieceRechangesReparation);

const getAll = () => axios.get(`${BASE_URL}/list`);

const getById = (idReparation, idPieceRechange) => axios.get(`${BASE_URL}/${idReparation}/${idPieceRechange}`);

const getPieceRechangesByReparationId = (idReparation) => axios.get(`${BASE_URL}/reparation/${idReparation}`);

export {
  ajouter,
  supprimer,
  miseAJour,
  getAll,
  getById,
  getPieceRechangesByReparationId,
};
