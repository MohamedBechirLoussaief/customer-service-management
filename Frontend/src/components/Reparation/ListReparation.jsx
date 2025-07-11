import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllReparations,
  deleteReparation,
} from "../../services/ReparationService";

const ListReparation = () => {
  const navigate = useNavigate();
  const [reparations, setReparations] = useState([]);
  const [filteredReparations, setFilteredReparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("tout");

  const fetchReparations = async () => {
    try {
      const response = await getAllReparations();
      console.log(response.data);
      setReparations(response.data);
      setFilteredReparations(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors de la récupération des réparations.");
      setLoading(false);
      console.error("Erreur lors de la récupération des réparations:", error);
    }
  };

  useEffect(() => {
    fetchReparations();
  }, []);

  useEffect(() => {
    let filtered = reparations;

    if (searchQuery) {
      filtered = filtered.filter((reparation) =>
        reparation.demandeReparation.client.nom
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (filterOption === "aujourdhui") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter((reparation) => reparation.dateRep === today);
    }

    setFilteredReparations(filtered);
  }, [searchQuery, filterOption, reparations]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette réparation ?"
    );
    if (confirmDelete) {
      try {
        await deleteReparation(id);
        fetchReparations();
        alert("Réparation supprimée avec succès!");
      } catch (error) {
        console.error("Erreur lors de la suppression de la réparation:", error);
        alert("Erreur lors de la suppression de la réparation.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/details-reparation/${id}`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Liste des Réparations</h2>

      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Rechercher par nom du client"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />

        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="form-control me-3"
          style={{ width: "100px" }}
        >
          <option value="tout">Tout</option>
          <option value="aujourdhui">Aujourd'hui</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date de Réparation</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredReparations) &&
          filteredReparations.length > 0 ? (
            filteredReparations.map((reparation) => (
              <tr key={reparation.idReparation}>
                <td>{reparation.idReparation}</td>
                <td>{reparation.demandeReparation.client.nom || "N/A"}</td>
                <td>{reparation.dateRep}</td>
                <td>{reparation.description || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(reparation.idReparation)}
                    className="btn btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleViewDetails(reparation.idReparation)}
                    className="btn btn-info btn-sm ms-2"
                  >
                    Voir Détails
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune réparation trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListReparation;
