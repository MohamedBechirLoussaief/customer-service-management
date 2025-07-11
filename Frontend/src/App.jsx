import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import AddClient from "./components/Client/AddClient";
import ClientList from "./components/Client/ClientList";
import UpdateClient from "./components/Client/UpdateClient";
import AddAppareil from "./components/Appareil/AddAppareil";
import AddDemandeReparation from "./components/DemandeReparation/AddDemandeReparation";
import ListDemandeReparation from "./components/DemandeReparation/ListDemandeReparation";
import DetailsDemandeReparation from "./components/DemandeReparation/DetailsDemandeReparation";
import AddReparation from "./components/Reparation/AddReparation";
import TypePiece from "./components/TypePiece/TypePiece";
import PieceRechange from "./components/PieceRechange/PieceRechange";
import DetailsReparation from "./components/Reparation/DetailsReparation";
import DetailsFacture from "./components/Facture/DetailsFacture";
import ListAppareil from "./components/Appareil/ListAppareil";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  
import Login from "./components/Authentification//login";
import ListReparation from "./components/Reparation/ListReparation";
import AddEmployee from "./components/Admin/AddEmployee";
import ListEmployee from "./components/Admin/ListEmployee";
import Home from "./components/layouts/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";
import FicheReparation from "./components/DemandeReparation/FicheReparation";

const App = () => {
    const [auth, setAuth] = useState(false);  

    const user = (isAuthenticated) => {
        setAuth(isAuthenticated); 
    }

    return (
        <Router>
            {auth && <Navbar />}

            <div className="container mt-4">
                <Routes>
                    <Route exact path="/login" element={auth ? <Home /> : <Login onLogin={user} />} />
                    <Route exact path="/" element={auth ? <Home /> : <Login onLogin={user} />} />                
                    <Route path="/admin-dashboard" element={auth ? <AdminDashboard /> : <Navigate to="/login" />} />
                    <Route path="/add-client" element={auth ? <AddClient /> : <Navigate to="/login" />} />
                    <Route path="/list-clients" element={auth ? <ClientList /> : <Navigate to="/" />} />
                    <Route path="/UpdateClient/:id" element={auth ? <UpdateClient /> : <Navigate to="/login" />} />
                    <Route path="/list-Appareils" element={auth ? <ListAppareil /> : <Navigate to="/login" />} />
                    <Route path="/add-Appareil" element={auth ? <AddAppareil /> : <Navigate to="/login" />} />
                    <Route path="/add-DemandeReparation" element={auth ? <AddDemandeReparation /> : <Navigate to="/login" />} />
                    <Route path="/list-DemandeReparation" element={auth ? <ListDemandeReparation /> : <Navigate to="/login" />} />
                    <Route path="/list-reparation" element={auth ? <ListReparation /> : <Navigate to="/login" />} />
                    <Route path="/details-demande-reparation/:id" element={auth ? <DetailsDemandeReparation /> : <Navigate to="/login" />} />
                    <Route path="/add-Reparation/:id" element={auth ? <AddReparation /> : <Navigate to="/login" />} />
                    <Route path="/typesPieces" element={auth ? <TypePiece /> : <Navigate to="/login" />} />
                    <Route path="/pieceRechange" element={auth ? <PieceRechange /> : <Navigate to="/login" />} />
                    <Route path="/details-Reparation/:idReparation" element={auth ? <DetailsReparation /> : <Navigate to="/login" />} />
                    <Route path="/details-Facture/:idFacture" element={auth ? <DetailsFacture /> : <Navigate to="/login" />} />
                    <Route path="/add-employee" element={auth ? <AddEmployee /> : <Navigate to="/login" />} />
                    <Route path="/list-employee" element={auth ? <ListEmployee /> : <Navigate to="/login" />} />
                    <Route path="/fiche-reparation" element={auth ? <FicheReparation /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
