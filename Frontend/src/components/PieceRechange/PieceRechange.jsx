import React, { useState, useEffect } from "react";
import {
  getAllPieceRechanges,
  addPieceRechange,
  updatePieceRechange,
  deletePieceRechange,
} from "../../services/PieceRechangeService";
import { getAllTypePieces } from "../../services/TypePieceService";

const PieceRechange = () => {
  const [pieceRechanges, setPieceRechanges] = useState([]);
  const [typePieces, setTypePieces] = useState([]);

  const [code, setCode] = useState("");
  const [nom, setNom] = useState("");
  const [prixAchat, setPrixAchat] = useState("");
  const [prixHT, setPrixHT] = useState("");
  const [prixTTC, setPrixTTC] = useState("");
  const [type, setType] = useState("");

  const [editId, setEditId] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Ajouter");

  useEffect(() => {
    fetchPieceRechanges();
    fetchTypePieces();
  }, []);

  const fetchPieceRechanges = async () => {
    const response = await getAllPieceRechanges();
    setPieceRechanges(response.data);
  };

  const fetchTypePieces = async () => {
    try {
      const response = await getAllTypePieces();
      setTypePieces(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des types de pièces :",
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pieceData = {
      code,
      nom,
      prixAchat,
      prixHT,
      prixTTC,
      type: { idTypePiece: type },
    };

    if (editId) {
      await updatePieceRechange(editId, pieceData);
      setEditId(null);
      setButtonLabel("Ajouter");
    } else {
      await addPieceRechange(pieceData);
    }

    setCode("");
    setNom("");
    setPrixAchat("");
    setPrixHT("");
    setPrixTTC("");
    setType("");

    fetchPieceRechanges();
  };

  const handleEdit = (piece) => {
    setEditId(piece.idPieceRechange);
    setCode(piece.code);
    setNom(piece.nom);
    setPrixAchat(piece.prixAchat);
    setPrixHT(piece.prixHT);
    setPrixTTC(piece.prixTTC);
    setType(piece.type?.idTypePiece || "");
    setButtonLabel("Modifier");
  };

  const handleDelete = async (id) => {
    await deletePieceRechange(id);
    fetchPieceRechanges();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Gestion des Pièces de Rechange</h2>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
              <label>Code</label>
              <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Prix Achat</label>
              <input
                type="number"
                value={prixAchat}
                onChange={(e) => setPrixAchat(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Prix HT</label>
              <input
                type="number"
                value={prixHT}
                onChange={(e) => setPrixHT(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Prix TTC</label>
              <input
                type="number"
                value={prixTTC}
                onChange={(e) => setPrixTTC(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Sélectionner un type</option>
                {typePieces.map((type) => (
                  <option key={type.idTypePiece} value={type.idTypePiece}>
                    {type.type}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className={`btn ${
                buttonLabel === "Ajouter" ? "btn-dark" : "btn-secondary"
              }`}
            >
              {buttonLabel}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h2>Liste des Pièces de Rechange</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Nom</th>
                <th>Prix Achat</th>
                <th>Prix HT</th>
                <th>Prix TTC</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pieceRechanges.map((piece) => (
                <tr key={piece.idPieceRechange}>
                  <td>{piece.idPieceRechange}</td>
                  <td>{piece.code}</td>
                  <td>{piece.nom}</td>
                  <td>{piece.prixAchat}</td>
                  <td>{piece.prixHT}</td>
                  <td>{piece.prixTTC}</td>
                  <td>{piece.type.type || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(piece)}
                      className="btn btn-secondary btn-sm me-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(piece.idPieceRechange)}
                      className="btn btn-danger btn-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PieceRechange;
