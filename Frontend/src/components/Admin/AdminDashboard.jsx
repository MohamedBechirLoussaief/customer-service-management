import React from "react";
import { useNavigate } from "react-router-dom";

import Home from "../layouts/Home";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <h2 className="text-center mb-4">Admin dashboard</h2>
      <div className="dropdown mb-4">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Gérer Employee
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/list-employee")}
            >
              List Employee
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => handleNavigate("/add-employee")}
            >
              Ajouter Employee
            </button>
          </li>
        </ul>
      </div>
      <Home caller="admin" />
    </>
  );
};

export default AdminDashboard;
