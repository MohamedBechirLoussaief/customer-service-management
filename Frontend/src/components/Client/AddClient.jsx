import React, { useState } from "react";
import { createClient, getClientByNumTel } from "../../services/ClientService";
import Swal from "sweetalert2";
const AddClient = ({ caller, onSelectedClient }) => {
  const [client, setClient] = useState(null);
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numTel, setNumTel] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createClient({ nom, adresse, numTel });
      if (caller != "DemandeReparation") {
        setNom("");
        setAdresse("");
        setNumTel("");
      }
      setMessage("Client ajouté avec succès !");
      setIsError(false);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `Client a été ajouté avec succès !`,
          timer: 2000,
          showConfirmButton: false,
        });
        onSelectedClient(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: `Une erreur s'est produite lors de l'ajout de client.`,
        });
      }
    } catch {
      setMessage("Erreur lors de l'ajout du client !");
      setIsError(true);
    }
  };

  const handleRechercher = async (numTel) => {
    try {
      const response = await getClientByNumTel(numTel);
      setClient(response.data);
      if (response.data) {
        setAdresse(response.data.adresse);
        setNom(response.data.nom);
        onSelectedClient(response.data);
      }
    } catch {
      console.error("Erreur lors de la recherche du client");
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="p-4 card shadow-sm border-0 rounded-lg"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h2 className="mb-4 text-center text-dark">Ajouter un Client</h2>

        <div className="mb-3 d-flex">
          <div className="flex-grow-1">
            <label htmlFor="numTel" className="form-label text-muted">
              Numéro de Téléphone
            </label>
            <input
              type="text"
              id="numTel"
              className="form-control shadow-sm"
              placeholder="Numéro de Téléphone"
              value={numTel}
              onChange={(e) => setNumTel(e.target.value)}
              required
              pattern="\d{8}"
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary ms-2 py-2 shadow-sm align-self-stretch"
            onClick={() => handleRechercher(numTel)}
          >
            Rechercher
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label text-muted">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            className="form-control shadow-sm"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="adresse" className="form-label text-muted">
            Adresse
          </label>
          <input
            type="text"
            id="adresse"
            className="form-control shadow-sm"
            placeholder="Adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 py-2 shadow-sm">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddClient;
