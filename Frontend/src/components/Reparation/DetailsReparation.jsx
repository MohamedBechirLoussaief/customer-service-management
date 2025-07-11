import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListPieceRechangeReparation from "../PieceRechangeReparation/ListPieceRechangeReparation";
import { getReparationById } from "../../services/ReparationService";
import { ajouter } from "../../services/PieceRechangeReparationService";
import { getAllTypePieces } from "../../services/TypePieceService";
import { getPieceRechangesByType } from "../../services/PieceRechangeService";
import {
  getFactureByReparationId,
  ajouterFacture,
} from "../../services/FactureService";

export const DetailsReparation = () => {
  const [reparation, setReparation] = useState(null);
  const [error, setError] = useState(null);
  const [typePieces, setTypePieces] = useState([]);
  const [pieceRechanges, setPieceRechanges] = useState([]);
  const [selectedTypePiece, setSelectedTypePiece] = useState("");
  const [selectedPieceRechange, setSelectedPieceRechange] = useState("");
  const [qte, setQte] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [facture, setFacture] = useState(null);
  const { idReparation } = useParams();
  const navigate = useNavigate();

  const fetchReparation = async (id) => {
    try {
      const response = await getReparationById(id);
      setReparation(response.data);
    } catch (error) {
      setError("Erreur lors de la récupération des détails de la réparation.");
      console.error("Erreur lors de la récupération des détails:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTypePieces = async () => {
    try {
      const response = await getAllTypePieces();
      setTypePieces(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des types de pièces:",
        error
      );
    }
  };

  const fetchPieceRechanges = async (typePieceId) => {
    try {
      const response = await getPieceRechangesByType(typePieceId);
      setPieceRechanges(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des pièces de rechange:",
        error
      );
      setPieceRechanges([]);
    }
  };

  const handleTypePieceChange = (e) => {
    const typePieceId = e.target.value;
    setSelectedTypePiece(typePieceId);
    setSelectedPieceRechange("");
    setPieceRechanges([]);
    if (typePieceId) {
      fetchPieceRechanges(typePieceId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPieceRechange || !qte || isNaN(qte)) {
      alert("Veuillez sélectionner une pièce valide et une quantité.");
      return;
    }

    const pieceRechangeReparation = {
      idPieceRechangeReparation: {
        idPieceRechange: Number(selectedPieceRechange),
        idReparation: Number(idReparation),
      },
      pieceRechange: { idPieceRechange: Number(selectedPieceRechange) },
      reparation: { idReparation: Number(idReparation) },
      qte: Number(qte),
    };

    try {
      await ajouter(pieceRechangeReparation);
      setSelectedTypePiece("");
      setSelectedPieceRechange("");
      setQte("");
      setPieceRechanges([]);
      setRefresh((prev) => !prev);
    } catch (error) {
      alert("Erreur lors de l'ajout de la pièce de réparation.");
      console.error("Erreur lors de l'ajout:", error);
    }
  };

  const handleFacturation = async () => {
    try {
      if (facture) {
        navigate(`/details-Facture/${facture.idFacture}`);
      } else {
        const facture = { reparation: { idReparation: idReparation } };

        const newFacture = await ajouterFacture(facture);
        navigate(`/details-Facture/${newFacture.data.idFacture}`);
      }
    } catch (error) {
      console.error("Erreur lors de la facturation:", error);
      alert("Erreur lors de la création de la facture. Veuillez réessayer.");
    }
  };

  const fetchFacture = async () => {
    try {
      const response = await getFactureByReparationId(idReparation);
      setFacture(response.data);
    } catch (error) {
      setFacture(null);
    }
  };

  const handleFiche =(demandeReparation,reparation)=>{
    navigate("/fiche-reparation",{state:{
      demandeReparation,
      reparation
    }})
  }

  useEffect(() => {
    if (idReparation) {
      try {
        fetchFacture();
      } catch (error) {
        setFacture(null);
      }

      fetchReparation(idReparation);
    }
    fetchTypePieces();
  }, [idReparation]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!reparation) {
    return <div>La réparation n'a pas été trouvée.</div>;
  }
  const isFormDisabled =
    !selectedTypePiece || !selectedPieceRechange || !qte || isNaN(qte);

  return (
    <div className="container mt-4" style={{ display: "flex", gap: "2rem" }}>
      <div className="w-50">
        <h3>Ajouter une Pièce de Réparation</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="typePiece" className="form-label">
              Type Pièce:
            </label>
            <select
              id="typePiece"
              value={selectedTypePiece}
              onChange={handleTypePieceChange}
              className="form-control"
              required
              disabled={loading || facture}
            >
              <option value="">Sélectionner le Type Pièce</option>
              {typePieces.map((typePiece) => (
                <option
                  key={typePiece.idTypePiece}
                  value={typePiece.idTypePiece}
                >
                  {typePiece.type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="pieceRechange" className="form-label">
              Pièce de Rechange:
            </label>
            <select
              id="pieceRechange"
              value={selectedPieceRechange}
              onChange={(e) => setSelectedPieceRechange(e.target.value)}
              className="form-control"
              required
              disabled={
                !selectedTypePiece ||
                pieceRechanges.length === 0 ||
                loading ||
                facture
              }
            >
              <option value="">Sélectionner la Pièce de Rechange</option>
              {pieceRechanges.length > 0 ? (
                pieceRechanges.map((pieceRechange) => (
                  <option
                    key={pieceRechange.idPieceRechange}
                    value={pieceRechange.idPieceRechange}
                  >
                    {pieceRechange.nom}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Aucune pièce disponible
                </option>
              )}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="qte" className="form-label">
              Quantité:
            </label>
            <input
              type="number"
              id="qte"
              value={qte}
              onChange={(e) => setQte(e.target.value)}
              className="form-control"
              required
              disabled={loading || facture}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isFormDisabled || facture}
          >
            Ajouter
          </button>
        </form>
      </div>

      <div className="w-50">
        <h2>Détails de la Réparation {reparation.idReparation}</h2>
        <p>Date: {reparation.dateRep}</p>
        <p>Description: {reparation.description}</p>
        <p>Tarif HMO: 10 DT</p>
        <p>Temps MO: {reparation.tempsMO}</p>
        {facture ? (
          <p>Facture N°: {facture.numero}</p>
        ) : (
          <p>Pas encore facturé</p>
        )}
        <button className="btn btn-success" onClick={handleFacturation}>
          Facture
        </button>
        <button className="btn btn-success" onClick={()=>handleFiche(reparation.demandeReparation,reparation)}>
          Fiche reparation
        </button>
        <ListPieceRechangeReparation
          facture={facture}
          idReparation={reparation.idReparation}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default DetailsReparation;
