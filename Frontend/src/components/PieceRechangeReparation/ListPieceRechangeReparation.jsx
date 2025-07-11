import React, { useEffect, useState } from "react";
import {
  getPieceRechangesByReparationId,
  supprimer,
} from "../../services/PieceRechangeReparationService";

const ListPieceRechangeReparation = ({
  facture,
  caller,
  idReparation,
  refresh,
}) => {
  const [pieces, setPieces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPieces = async () => {
    setLoading(true);
    try {
      const response = await getPieceRechangesByReparationId(idReparation);
      setPieces(response.data);
      setError("");
    } catch (err) {
      setError(`Erreur lors de la récupération des pièces : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPieces();
  }, [idReparation, refresh]);

  const handleDelete = async (idPieceRechange) => {
    try {
      await supprimer(idReparation, idPieceRechange);
      fetchPieces();
    } catch (err) {
      setError(`Erreur lors de la suppression de la pièce : ${err.message}`);
    }
  };

  return (
    <div className="container mt-4">
      {caller !== "Facture" && caller !== "Fiche" && (
        <h1>Pièces de Rechange pour la Réparation ID {idReparation}</h1>
      )}
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Chargement des pièces...</p>
      ) : pieces.length === 0 ? (
        <p>Aucune pièce trouvée pour cette réparation.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Code Pièce</th>
              <th>Nom Pièce</th>
              <th>Quantité</th>
              {caller !== "Fiche" && <th>Prix (HT)</th>}
              {caller === "Facture" ? <th>Montant</th> : caller != "Fiche" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pieces.map((piece) => (
              <tr key={piece[0]}>
                <td>{piece[1]}</td>
                <td>{piece[2]}</td>
                <td>{piece[3]}</td>
                {caller != "Fiche" && <td>{piece[4]}DT</td>}
                {caller === "Facture" ? (
                  <td>{piece[3] * piece[4]}</td>
                ) : (
                  caller !== "Fiche" && (
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={facture}
                        onClick={() => handleDelete(piece[0])}
                      >
                        Supprimer
                      </button>
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPieceRechangeReparation;
