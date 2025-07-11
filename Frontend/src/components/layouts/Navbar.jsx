import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand text-dark fs-4 fw-bold" to="/">
          RepAppBuro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark fs-5"
                href="#"
                id="clientDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Client
              </a>
              <ul className="dropdown-menu" aria-labelledby="clientDropdown">
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/add-client"
                  >
                    Ajouter Client
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/list-clients"
                  >
                    Liste Clients
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark fs-5"
                href="#"
                id="appareilDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Appareil
              </a>
              <ul className="dropdown-menu" aria-labelledby="appareilDropdown">
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/add-Appareil"
                  >
                    Ajouter Appareil
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/list-Appareils"
                  >
                    Liste Appareils
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark fs-5"
                href="#"
                id="reparationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Réparation
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="reparationDropdown"
              >
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/add-DemandeReparation"
                  >
                    Ajouter Demande Réparation
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/list-DemandeReparation"
                  >
                    Liste Demandes Réparation
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/list-reparation"
                  >
                    Liste réparation
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link text-dark fs-5"
                href="#"
                id="piecesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pièces de Rechange
              </a>
              <ul className="dropdown-menu" aria-labelledby="piecesDropdown">
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/typesPieces"
                  >
                    Gérer Types de Pièces
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-dark fs-5"
                    to="/pieceRechange"
                  >
                    Gérer Pièces de Rechange
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <Link className="nav-link text-dark fs-5" to="/admin-dashboard">
            Admin dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
