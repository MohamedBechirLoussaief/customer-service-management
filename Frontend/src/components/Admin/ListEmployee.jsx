import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAll, supprimer, modifier } from "../../services/UtilisateurService";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getAll();
      setEmployees(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la récupération des employés.",
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer!",
    });

    if (confirm.isConfirmed) {
      try {
        await supprimer(id);
        Swal.fire("Supprimé!", "L'employé a été supprimé.", "success");
        fetchEmployees();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la suppression de l'employé.",
        });
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee.idUtilisateur);
    setUpdatedData(employee);
  };

  const handleUpdate = async () => {
    try {
      await modifier(editingEmployee, updatedData);
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Employé modifié avec succès!",
      });
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la modification de l'employé.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Liste des Employés</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.idUtilisateur}>
              <td>
                {editingEmployee === employee.idUtilisateur ? (
                  <input
                    type="text"
                    value={updatedData.nom}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, nom: e.target.value })
                    }
                  />
                ) : (
                  employee.nom
                )}
              </td>
              <td>
                {editingEmployee === employee.idUtilisateur ? (
                  <input
                    type="text"
                    value={updatedData.prenom}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, prenom: e.target.value })
                    }
                  />
                ) : (
                  employee.prenom
                )}
              </td>
              <td>
                {editingEmployee === employee.idUtilisateur ? (
                  <input
                    type="email"
                    value={updatedData.email}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, email: e.target.value })
                    }
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {editingEmployee === employee.idUtilisateur ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleUpdate}
                  >
                    Sauvegarder
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Modifier
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee.idUtilisateur)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
