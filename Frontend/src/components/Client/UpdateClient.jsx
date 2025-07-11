import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, updateClient } from "../../services/ClientService";

const UpdateClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [numTel, setNumTel] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClientById(id);
        setNom(response.data.nom);
        setAdresse(response.data.adresse);
        setNumTel(response.data.numTel);
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
      }
    };

    fetchClient();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateClient(id, { nom, adresse, numTel });
      navigate("/list-clients");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="p-4 card shadow-sm border-0 rounded-lg"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2 className="mb-4 text-center text-dark">Modifier le Client</h2>

        <div className="mb-3">
          <label htmlFor="nom" className="form-label text-muted">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            className="form-control shadow-sm"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numTel" className="form-label text-muted">
            Numéro Téléphone
          </label>
          <input
            type="text"
            id="numTel"
            className="form-control shadow-sm"
            value={numTel}
            onChange={(e) => setNumTel(e.target.value)}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="btn btn-secondary w-100 py-2 shadow-sm"
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default UpdateClient;
