package org.Project.project.interfaces;

import java.security.PublicKey;
import java.util.List;
import java.util.Set;

import org.Project.project.models.Reparation;

public interface IReparation {


	public Reparation ajouter(Reparation reparation);
	public boolean supprimer(Long idReparation);
	public boolean modifier(Long idReparation,Reparation reparation);
	public List<Reparation> findAll();
	public Reparation findById(Long idReparation);
	public Reparation findByIdDemandeReparation(Long idDemandeReparation);

}
