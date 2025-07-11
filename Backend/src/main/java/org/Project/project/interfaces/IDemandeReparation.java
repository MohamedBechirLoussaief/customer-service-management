package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;



import org.Project.project.models.DemandeReparation;

public interface IDemandeReparation {

	public DemandeReparation ajouter(DemandeReparation demandeReparation);
	public boolean supprimer(Long idDemandeReparation);
	public boolean modifier(Long idDemandeReparation,DemandeReparation demandeReparation);
	public List<DemandeReparation> findAll();
	public DemandeReparation findById(Long idDemandeReparation);
	DemandeReparation modifierEtat(String etat, Long idDemandeReparation);
	
	
}
