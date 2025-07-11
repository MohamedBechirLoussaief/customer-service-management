package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;



import org.Project.project.models.Utilisateur;

public interface IUtilisateur {

	public Utilisateur ajouter(Utilisateur utilisateur);
	public boolean supprimer(Long idUtlisateur);
	public Utilisateur modifier(Long idUtlisateur,Utilisateur utilisateur);
	public List<Utilisateur> findAll();
	public Utilisateur findById(Long idUtlisateur);
	public Utilisateur findByUsername(String username);
	public boolean verifierUtilisateur(String username,String password);
}
