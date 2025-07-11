package org.Project.project.Repository;

import org.Project.project.models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long>  {

	Utilisateur findByUsername(String username);
}
