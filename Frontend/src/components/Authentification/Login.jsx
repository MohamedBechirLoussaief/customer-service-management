import React, { useState } from "react";
import { verifier } from "../../services/UtilisateurService";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifier(username, password);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Utilisateur vérifié avec succès",
          text: "Bienvenue!",
        });
        onLogin(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Échec de la vérification",
        text: "Vérifiez vos identifiants.",
      });
      onLogin(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Connexion</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Mot de passe</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  <i className="fas fa-sign-in-alt"></i> Se connecter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
