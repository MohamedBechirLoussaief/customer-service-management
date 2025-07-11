import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFactureById } from "../../services/FactureService";
import ListPieceRechangeReparation from "../PieceRechangeReparation/ListPieceRechangeReparation";

const DetailsFacture = () => {
  const { idFacture } = useParams();
  const [facture, setFacture] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await getFactureById(idFacture);
        setFacture(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des détails de la facture.");
        setLoading(false);
        console.error("Erreur :", err);
      }
    };

    if (idFacture) {
      fetchFacture();
    }
  }, [idFacture]);

  const handleImprimer = () => {
    window.print();
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        <p>{error}</p>
        <button onClick={() => setLoading(true)} className="btn btn-warning">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-white text-dark text-center py-4">
          <h2>FACTURE</h2>
          <p className="lead">FACTURE N° {facture.numero}</p>
          <p>Date : {facture.date || "Non disponible"}</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>ÉMETTEUR</h5>
              <p>
                <strong>Nom de l'entreprise :</strong> RepAppBuro
              </p>
              <p>
                <strong>Adresse :</strong> Sfax
              </p>
              <p>
                <strong>Téléphone :</strong> +216 28 567 553
              </p>
              <p>
                <strong>Email :</strong> RepAppBuro@gmail.com
              </p>
            </div>
            <div className="col-md-6 text-right">
              <h5>DESTINATAIRE</h5>
              <p>
                <strong>Client :</strong>{" "}
                {facture.reparation?.demandeReparation?.client?.nom ||
                  "Non disponible"}
              </p>
              <p>
                <strong>Adresse :</strong>{" "}
                {facture.reparation?.demandeReparation?.client?.adresse ||
                  "Non disponible"}
              </p>
              <p>
                <strong>Téléphone :</strong> +216{" "}
                {facture.reparation?.demandeReparation?.client?.numTel ||
                  "Non disponible"}
              </p>
            </div>
          </div>

          <h4>DÉTAILS DE LA FACTURE</h4>
          <ListPieceRechangeReparation
            caller="Facture"
            idReparation={facture.reparation?.idReparation}
          />

          <div className="mt-4 text-right">
            <h5>
              <strong>Total HT :</strong> {facture.montantTotal} TND
            </h5>
          </div>
        </div>

        <div className="card-footer text-center py-3">
          <button className="btn btn-success" onClick={handleImprimer}>
            <i className="fas fa-print"></i> Imprimer la Facture
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsFacture;
