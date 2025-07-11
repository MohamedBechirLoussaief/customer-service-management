import { useState, useEffect } from "react";
import {
  deleteAppareil,
  getAllAppareils,
} from "../../services/AppareilService";

const ListAppareil = () => {
  const [appareils, setAppareils] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAppareils = async () => {
    try {
      const { data } = await getAllAppareils();
      setAppareils(data);
    } catch {
      console.error("Error fetching appareils");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppareil(id);
      fetchAppareils();
    } catch {
      console.error("Error deleting appareil");
    }
  };

  const filteredAppareils = appareils.filter((appareil) =>
    appareil.client.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAppareils();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Liste des Appareils</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom du client"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numéro de Série</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppareils.length ? (
            filteredAppareils.map(
              ({ idAppareil, numSerie, marque, modele, client }) => (
                <tr key={idAppareil}>
                  <td>{idAppareil}</td>
                  <td>{numSerie}</td>
                  <td>{marque}</td>
                  <td>{modele}</td>
                  <td>
                    {client.nom}/{client.numTel}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(idAppareil)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Aucun appareil trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppareil;
