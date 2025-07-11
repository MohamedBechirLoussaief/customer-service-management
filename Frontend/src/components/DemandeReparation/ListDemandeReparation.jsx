import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllDemandeReparations,
  deleteDemandeReparation,
} from "../../services/DemandeReparationService";

const ListDemandeReparation = () => {
  const navigate = useNavigate();
  const [demandesReparation, setDemandesReparation] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("tout");

  const fetchDemandesReparation = async () => {
    try {
      const response = await getAllDemandeReparations();
      setDemandesReparation(response.data);
      setFilteredDemandes(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors de la récupération des demandes de réparation.");
      setLoading(false);
      console.error(
        "Erreur lors de la récupération des demandes de réparation:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDemandesReparation();
  }, []);

  useEffect(() => {
    let filtered = demandesReparation;

    if (searchQuery) {
      filtered = filtered.filter((demande) =>
        demande.client.nom.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterOption === "aujourdhui") {
      const today = new Date().toISOString().split("T")[0];
      filtered = filtered.filter(
        (demande) => demande.dateDepotAppareil === today
      );
    } else if (filterOption === "cetteSemaine") {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

      filtered = filtered.filter((demande) => {
        const date = new Date(demande.dateDepotAppareil);
        return date >= startOfWeek && date <= endOfWeek;
      });
    }

    setFilteredDemandes(filtered);
  }, [searchQuery, filterOption, demandesReparation]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette demande ?"
    );
    if (confirmDelete) {
      try {
        await deleteDemandeReparation(id);
        fetchDemandesReparation();
        alert("Demande supprimée avec succès!");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de la demande de réparation:",
          error
        );
        alert("Erreur lors de la suppression de la demande.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/details-demande-reparation/${id}`);
  };

  const handleSortByDate = () => {
    const sortedDemandes = [...filteredDemandes].sort((a, b) => {
      return (
        new Date(b.datePrevueReparation) - new Date(a.datePrevueReparation)
      );
    });
    setFilteredDemandes(sortedDemandes);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Liste des Demandes de Réparation</h2>

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
          className="form-control"
          style={{ width: "100px" }}
        >
          <option value="tout">Tout</option>
          <option value="aujourdhui">Aujourd'hui</option>
          <option value="cetteSemaine">Cette semaine</option>
        </select>
      </div>

      <button onClick={handleSortByDate} className="btn btn-secondary mb-3">
        Trier par Date
      </button>

      {filteredDemandes.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Symptômes de Panne</th>
              <th>Date Prévue de Réparation</th>
              <th>Date de Dépôt</th>
              <th>État</th>
              <th>Client</th>
              <th>Appareil</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDemandes.map((demande) => (
              <tr key={demande.idDemandeReparation}>
                <td>{demande.idDemandeReparation}</td>
                <td>{demande.symptomesPanne}</td>
                <td>{demande.datePrevueReparation}</td>
                <td>{demande.dateDepotAppareil}</td>
                <td>{demande.etat}</td>
                <td>{demande.client.nom || "N/A"}</td>
                <td>{demande.appareil.modele || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(demande.idDemandeReparation)}
                    className="btn btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() =>
                      handleViewDetails(demande.idDemandeReparation)
                    }
                    className="btn btn-info btn-sm ms-2"
                  >
                    Voir Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune demande de réparation trouvée.</p>
      )}
    </div>
  );
};

export default ListDemandeReparation;
