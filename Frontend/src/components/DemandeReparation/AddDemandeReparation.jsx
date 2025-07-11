import React, { useState } from "react";
import { createDemandeReparation } from "../../services/DemandeReparationService";
import AddClient from "../Client/AddClient";
import ListAppareilClient from "../Appareil/ListAppareilClient";
import AddAppareil from "../Appareil/AddAppareil";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDemandeReparation = () => {
  const [client, setClient] = useState(null);
  const [appareil, setAppareil] = useState(null);
  const [symptomesPanne, setSymptomesPanne] = useState("");
  const [datePrevueReparation, setDatePrevueReparation] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const demandeReparationData = {
      symptomesPanne,
      datePrevueReparation,
      dateDepotAppareil: new Date().toISOString().split("T")[0],
      etat: "En Attente",
      client,
      appareil,
    };

    try {
      const response = await createDemandeReparation(demandeReparationData);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `Demande de reparation a été ajouté avec succès !`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: `Une erreur s'est produite lors de l'ajout de demande de reparation.`,
        });
      }
      navigate(
        `/details-demande-reparation/${response.data.idDemandeReparation}`
      );
      console.log("Demande de réparation ajoutée avec succès", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de la demande de réparation",
        error
      );
    }
  };

  const handleSelectedClient = (client) => {
    setClient(client);
  };

  const handleSelectedAppareil = (appareil) => {
    setAppareil(appareil);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div
            className="p-4 card shadow-sm border-0 rounded-lg"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h3 className="mb-4 text-center text-dark">Sélectionner Client</h3>
            <AddClient
              caller="DemandeReparation"
              onSelectedClient={handleSelectedClient}
            />
            <p>Client : {client ? client.nom : "Sélectionner un client"}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="p-4 card shadow-sm border-0 rounded-lg"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <h3 className="mb-4 text-center text-dark">
              Sélectionner Appareil
            </h3>
            <AddAppareil
              inClient={client}
              caller="DemandeReparation"
              onAppareilAdded={handleSelectedAppareil}
            />
            {client && (
              <ListAppareilClient
                client={client}
                caller="DemandeReparation"
                onAppareilSelected={handleSelectedAppareil}
              />
            )}
            <p>
              Appareil :{" "}
              {appareil ? appareil.marque : "Sélectionner un appareil"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-4 p-4 card shadow-sm border-0 rounded-lg"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h2 className="mb-4 text-center text-dark">
          Ajouter Demande de Réparation
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="symptomesPanne" className="form-label text-muted">
              Symptômes de la panne
            </label>
            <input
              type="text"
              id="symptomesPanne"
              className="form-control shadow-sm"
              value={symptomesPanne}
              onChange={(e) => setSymptomesPanne(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="datePrevueReparation"
              className="form-label text-muted"
            >
              Date prévue de réparation
            </label>
            <input
              type="date"
              id="datePrevueReparation"
              className="form-control shadow-sm"
              value={datePrevueReparation}
              onChange={(e) => setDatePrevueReparation(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-dark w-100 py-2 shadow-sm">
              Ajouter Demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDemandeReparation;
