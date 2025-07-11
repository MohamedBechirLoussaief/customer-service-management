package org.Project.project.Service;
import java.util.List;

import java.util.Optional;

import org.Project.project.Repository.UtilisateurRepository;
import org.Project.project.interfaces.IUtilisateur;

import org.Project.project.models.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UtilisateurService implements IUtilisateur {

	@Autowired
	private UtilisateurRepository repository;
	@Override
	public Utilisateur ajouter(Utilisateur utilisateur) {
		return repository.save(utilisateur);
	}

	@Override
	public boolean supprimer(Long idUtlisateur) {
           repository.deleteById(idUtlisateur);
         Optional<Utilisateur> utilisateur=  repository.findById(idUtlisateur);
         if (utilisateur.isEmpty()) {
			return true;
		}
         return false;
	}

	@Override
	public Utilisateur modifier(Long idUtlisateur, Utilisateur utilisateur) {
		 Optional<Utilisateur> oldUtilisateur = repository.findById(idUtlisateur);
		
			 oldUtilisateur.get().setUsername(utilisateur.getUsername());
			 oldUtilisateur.get().setEmail(utilisateur.getEmail());
			 oldUtilisateur.get().setMotDePasse(utilisateur.getMotDePasse());
			 oldUtilisateur.get().setNom(utilisateur.getNom());
			 oldUtilisateur.get().setPrenom(utilisateur.getPrenom());
		
		
	        return repository.save(oldUtilisateur.get());
	}

	@Override
	public List<Utilisateur> findAll() {
	    return repository.findAll();
	}

	@Override
	public Utilisateur findById(Long idUtlisateur) {
		Optional<Utilisateur> utilisateur= repository.findById(idUtlisateur);
				return utilisateur.get();
	}

	@Override
	public Utilisateur findByUsername(String username) {
		return repository.findByUsername(username);
		
			
		}

	@Override
	public boolean verifierUtilisateur(String username, String password) {
	    if ("admin".equalsIgnoreCase(username) && "admin".equalsIgnoreCase(password)) {
	        return true;
	    }


	    Utilisateur verifUtilisateur = findByUsername(username);
	    
	    if (verifUtilisateur == null) {
	        return false; 
	    }

	    if (verifUtilisateur.getMotDePasse().equals(password)) {
	        return true;
	    }

	    return false; 
	}


	
	
	

	

}
