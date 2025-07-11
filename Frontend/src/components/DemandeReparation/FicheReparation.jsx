import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListPieceRechangeReparation from "../PieceRechangeReparation/ListPieceRechangeReparation";

const FicheReparation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { demandeReparation } = location.state;
  const { reparation } = location.state;

  const handlePrint = () => {
    window.print();
  };

  const handleRetour = () => {
    navigate(-1);
  };

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        <div className="card-header text-center">
          <h1>Fiche de Réparation</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h3>Client</h3>
              <p>
                <strong>Nom :</strong> {demandeReparation.client.nom}
              </p>
              <p>
                <strong>Adresse :</strong> {demandeReparation.client.adresse}
              </p>
              <p>
                <strong>Téléphone :</strong> {demandeReparation.client.numTel}
              </p>
            </div>

            <div className="col-md-6">
              <h3>Appareil</h3>
              <p>
                <strong>Marque :</strong> {demandeReparation.appareil.marque}
              </p>
              <p>
                <strong>Modèle :</strong> {demandeReparation.appareil.modele}
              </p>
              <p>
                <strong>Numéro de série :</strong>{" "}
                {demandeReparation.appareil.numSerie}
              </p>
              <p>
                <strong>Symptômes de panne :</strong>{" "}
                {demandeReparation.symptomesPanne}
              </p>
              <p>
                <strong>Date dépôt de l'appareil :</strong>{" "}
                {demandeReparation.dateDepotAppareil}
              </p>
              <p>
                <strong>Date prévue de réparation :</strong>{" "}
                {demandeReparation.datePrevueReparation}
              </p>
            </div>
          </div>
        </div>

        {reparation && (
          <div className="card-body">
            <h3>Réparation</h3>
            <p>
              <strong>Date de réparation :</strong> {reparation.dateRep}
            </p>
            <p>
              <strong>Temps de main d’œuvre :</strong> {reparation.tempsMO}
            </p>
            <p>
              <strong>Description :</strong> {reparation.description}
            </p>
          </div>
        )}

        {reparation && (
          <ListPieceRechangeReparation
            caller="Fiche"
            idReparation={reparation.idReparation}
          />
        )}

        <div className="card-footer text-center">
          <button className="btn btn-success me-2" onClick={handlePrint}>
            <i className="fas fa-print"></i> Imprimer
          </button>
          <button className="btn btn-secondary" onClick={handleRetour}>
            <i className="fas fa-arrow-left"></i> Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default FicheReparation;
