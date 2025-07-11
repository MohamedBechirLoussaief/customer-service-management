import React, { useState } from "react";
import Swal from "sweetalert2";
import { ajouter } from "../../services/UtilisateurService";

const AddEmployee = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [departement, setDepartement] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      username,
      email,
      motDePasse,
      nom,
      prenom,
      departement,
      dateNaissance,
      adresse,
      role: "EMPLOYEE",
    };

    try {
      await ajouter(newEmployee);
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Employé ajouté avec succès!",
      });

      setUsername("");
      setEmail("");
      setMotDePasse("");
      setNom("");
      setPrenom("");
      setDepartement("");
      setDateNaissance("");
      setAdresse("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de l'ajout de l'employé.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un Employé</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Département</label>
          <input
            type="text"
            className="form-control"
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date de naissance</label>
          <input
            type="date"
            className="form-control"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <input
            type="text"
            className="form-control"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
