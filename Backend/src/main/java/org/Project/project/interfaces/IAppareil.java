package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;

import org.Project.project.models.Appareil;
public interface IAppareil {

	public Appareil ajouter(Appareil appareil);
	public boolean supprimer(Long idApparei);
	public boolean modifier(Long idAppareil,Appareil appareil);
	public List<Appareil> findAll();
	public Appareil findById(Long idAppareil);
	public List<Appareil> findByIdClient(Long idClient);
	
}
