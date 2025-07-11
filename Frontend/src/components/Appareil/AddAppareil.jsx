import React, { useState } from "react";
import Swal from "sweetalert2";
import { addAppareil } from "../../services/AppareilService";
import { getClientByNumTel } from "../../services/ClientService";

const AddAppareil = ({ inClient, caller, onAppareilAdded }) => {
  const [numSerie, setNumSerie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [numTel, setNumTel] = useState("");
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

  const handleFetchClient = async () => {
    try {
      const { data } = await getClientByNumTel(numTel);
      setClient(data);
      setError("");
    } catch {
      setError("Client introuvable");
      setClient(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inClient && !client) {
      Swal.fire({
        icon: "warning",
        title: "Client manquant",
        text: "Veuillez d’abord rechercher ou sélectionner un client valide.",
      });
      return;
    }

    const appareil = {
      numSerie,
      marque,
      modele,
      client: caller === "DemandeReparation" ? inClient : client,
    };
    try {
      const { data } = await addAppareil(appareil);
      if (caller != "DemandeReparation") {
        setNumSerie("");
        setMarque("");
        setModele("");
        setNumTel("");
        setClient(null);
      }

      if (data) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `Appareil a été ajouté avec succès !`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: `Une erreur s'est produite lors de l'ajout de l'appareil.`,
        });
      }
      {
        caller = "DemandeReparation" & onAppareilAdded(data);
      }
    } catch {}
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-dark">Ajouter un Appareil</h2>
      <div
        className="card p-4 shadow-sm border-0 rounded-lg"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <form onSubmit={handleSubmit}>
          {caller !== "DemandeReparation" && (
            <div className="mb-3">
              <label htmlFor="numTel" className="form-label text-muted">
                Numéro de Téléphone du Client
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  id="numTel"
                  placeholder="Numéro de Téléphone"
                  value={numTel}
                  onChange={(e) => setNumTel(e.target.value)}
                  className="form-control me-2 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleFetchClient}
                  className="btn btn-secondary text-white shadow-sm"
                >
                  Rechercher
                </button>
              </div>
              {error && <div className="text-danger mt-2">{error}</div>}
              {client && (
                <div className="mt-2">
                  <strong>Client :</strong> {client.nom}
                </div>
              )}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="numSerie" className="form-label text-muted">
              Numéro de Série
            </label>
            <input
              type="text"
              id="numSerie"
              placeholder="Numéro de Série"
              value={numSerie}
              onChange={(e) => setNumSerie(e.target.value)}
              className="form-control shadow-sm"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="marque" className="form-label text-muted">
              Marque
            </label>
            <input
              type="text"
              id="marque"
              placeholder="Marque"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="form-control shadow-sm"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="modele" className="form-label text-muted">
              Modèle
            </label>
            <input
              type="text"
              id="modele"
              placeholder="Modèle"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              className="form-control shadow-sm"
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 shadow-sm">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppareil;
