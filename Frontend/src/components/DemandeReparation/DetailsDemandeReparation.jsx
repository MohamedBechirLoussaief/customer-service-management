import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import {
  getDemandeReparationById,
  updateDemandeReparationEtat,
} from "../../services/DemandeReparationService";
import { getReparationByIdDemandeReparation } from "../../services/ReparationService";

const DetailsDemandeReparation = () => {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [etat, setEtat] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const fetchDemandeDetails = async () => {
    try {
      const response = await getDemandeReparationById(id);
      setDemande(response.data);
      setEtat(response.data.etat);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors de la récupération des détails.");
      setLoading(false);
      console.error(
        "Erreur lors de la récupération des détails de la demande de réparation:",
        error
      );
    }
  };

  const handleEtatChange = (event) => {
    setEtat(event.target.value);
  };

  const handleUpdateEtat = async () => {
    try {
      await updateDemandeReparationEtat(id, etat);
      alert("État mis à jour avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état:", error);
      alert("Erreur lors de la mise à jour de l'état.");
    }
  };

  const handleReparation = async (idDemandeReparation) => {
    try {
      const response = await getReparationByIdDemandeReparation(
        idDemandeReparation
      );
      const reparation = response.data;
      if (reparation) {
        navigate(`/details-Reparation/${reparation.idReparation}`);
      } else {
        navigate(`/add-Reparation/${idDemandeReparation}`);
      }
    } catch (error) {
      navigate(`/add-Reparation/${idDemandeReparation}`);
    }
  };

  const handleFiche = (demandeReparation) => {
    navigate("/fiche-reparation", { state: { demandeReparation } });
  };
  useEffect(() => {
    fetchDemandeDetails();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Détails de la Demande de Réparation</h2>
      <div>
        <p>
          <strong>ID:</strong> {demande.idDemandeReparation}
        </p>
        <p>
          <strong>Symptômes de Panne:</strong> {demande.symptomesPanne}
        </p>
        <p>
          <strong>Date Prévue de Réparation:</strong>{" "}
          {demande.datePrevueReparation}
        </p>
        <p>
          <strong>Date de Dépôt:</strong> {demande.dateDepotAppareil}
        </p>

        <div className="mb-3">
          <label htmlFor="etat">État:</label>
          <select
            id="etat"
            value={etat}
            onChange={handleEtatChange}
            className="form-select"
          >
            <option value="en_attente">En Attente</option>
            <option value="en_cours">En Cours</option>
            <option value="terminee">Terminée</option>
            <option value="annulee">Annulée</option>
          </select>
        </div>

        <p>
          <strong>Client:</strong> {demande.client?.nom || "N/A"}
        </p>
        <p>
          <strong>Appareil:</strong> {demande.appareil?.modele || "N/A"}
        </p>
      </div>

      <button
        onClick={handleUpdateEtat}
        className="btn btn-success mt-2 ms-2"
        disabled={etat === demande.etat}
      >
        Mettre à jour l'état
      </button>
      <button
        onClick={() => handleReparation(demande.idDemandeReparation)}
        className="btn btn-primary mt-2 ms-2"
      >
        Réparation
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mt-2 ms-2"
      >
        Retour
      </button>
      <button
        onClick={() => handleFiche(demande)}
        className="btn btn-secondary mt-2 ms-2"
      >
        Fiche reparation
      </button>
    </div>
  );
};

export default DetailsDemandeReparation;
