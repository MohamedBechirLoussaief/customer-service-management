import React, { useEffect, useState } from "react";
import { getAllClients, deleteClient } from "../../services/ClientService";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await getAllClients();
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      fetchClients();
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    }
  };

  const handleModify = (id) => {
    navigate(`/UpdateClient/${id}`);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-dark">Liste des Clients</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Numéro Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.idClient}>
                  <td>{client.idClient}</td>
                  <td>{client.nom}</td>
                  <td>{client.adresse}</td>
                  <td>{client.numTel}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(client.idClient)}
                      className="btn btn-danger me-2"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => handleModify(client.idClient)}
                      className="btn btn-secondary"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Aucun client trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
