import React, { useState, useEffect } from "react";
import {
  getAllTypePieces,
  addTypePiece,
  updateTypePiece,
  deleteTypePiece,
} from "../../services/TypePieceService";

const TypePiece = () => {
  const [typePieces, setTypePieces] = useState([]);
  const [type, setType] = useState("");
  const [idTypePiece, setIdTypePiece] = useState(null);

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { type };

    try {
      if (idTypePiece) {
        await updateTypePiece(idTypePiece, formData);
      } else {
        await addTypePiece(formData);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du type de pièce :",
        error
      );
    }
  };

  const handleEdit = (typePiece) => {
    setType(typePiece.type);
    setIdTypePiece(typePiece.idTypePiece);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTypePiece(id);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du type de pièce :", error);
    }
  };

  const resetForm = () => {
    setType("");
    setIdTypePiece(null);
  };

  return (
    <div className="container mt-4" style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h2 className="mb-4">Gestion des Types de Pièces</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Type :</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button
            type="submit"
            className={`btn ${idTypePiece ? "btn-secondary" : "btn-dark"}`}
          >
            {idTypePiece ? "Mettre à jour" : "Ajouter"}
          </button>
        </form>
      </div>

      <div style={{ flex: 1 }}>
        <h3 className="mb-3">Liste des Types de Pièces</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {typePieces.map((piece) => (
              <tr key={piece.idTypePiece}>
                <td>{piece.idTypePiece}</td>
                <td>{piece.type}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => handleEdit(piece)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(piece.idTypePiece)}
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
  );
};

export default TypePiece;
