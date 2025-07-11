package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;



import org.Project.project.models.Facture;

public interface IFacture {

	public Facture ajouter(Facture facture);
	public boolean supprimer(Long idFacture);
	public boolean modifier(Long idFacture,Facture facture);
	public List<Facture> findAll();
	public Facture findById(Long idFacture);
	public Facture findByIdReparation(Long idReparation);
}
