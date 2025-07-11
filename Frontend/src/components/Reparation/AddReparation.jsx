import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createReparation } from "../../services/ReparationService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddReparation = () => {
  const { id } = useParams();

  const [description, setDescription] = useState("");
  const [tarifHMO, setTarifHMO] = useState(0);
  const [tempsMO, setTempsMO] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reparation = {
        dateRep: new Date().toISOString().split("T")[0],
        description,
        tempsMO,
        demandeReparation: { idDemandeReparation: id },
      };
      const response = await createReparation(reparation);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: `Reparation a été ajouté avec succès !`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: `Une erreur s'est produite lors de l'ajout de reparation.`,
        });
      }

      setDescription("");
      setTarifHMO(0);
      setTempsMO("");

      navigate(`/details-Reparation/${response.data.idReparation}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réparation:", error);
      alert(
        "Erreur: " + (error.response?.data || "Une erreur s'est produite.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter une Réparation</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tarifHMO" className="form-label">
            Tarif HMO:
          </label>
          <input
            type="number"
            id="tarifHMO"
            value={10}
            onChange={(e) => setTarifHMO(e.target.value)}
            step="0.01"
            disabled
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tempsMO" className="form-label">
            Temps MO:
          </label>
          <input
            type="time"
            id="tempsMO"
            value={tempsMO}
            onChange={(e) => setTempsMO(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default AddReparation;
