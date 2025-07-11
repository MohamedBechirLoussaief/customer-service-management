import { useState, useEffect } from "react";
import { getAppareilByIdClient } from "../../services/AppareilService";

const ListAppareilClient = ({ client, caller, onAppareilSelected }) => {
  const [appareils, setAppareils] = useState([]);

  useEffect(() => {
    if (client) {
      const fetchAppareils = async () => {
        try {
          const response = await getAppareilByIdClient(client.idClient);
          setAppareils(response.data);
        } catch {
          console.error("Error fetching appareils");
        }
      };
      fetchAppareils();
    }
  }, [client]);

  return (
    <div>
      <h2 className="text-center mb-4">Liste des Appareils</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Numéro de Série</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Client</th>
            {caller === "DemandeReparation" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {appareils.length ? (
            appareils.map((appareil) => (
              <tr key={appareil.idAppareil}>
                <td>{appareil.idAppareil}</td>
                <td>{appareil.numSerie}</td>
                <td>{appareil.marque}</td>
                <td>{appareil.modele}</td>
                <td>
                  {appareil.client.nom}/{appareil.client.numTel}
                </td>
                {caller === "DemandeReparation" && (
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onAppareilSelected(appareil)}
                    >
                      Choisir
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Aucun appareil trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppareilClient;
