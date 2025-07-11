package org.Project.project.Repository;

import org.Project.project.models.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FactureRepository extends JpaRepository<Facture,Long>{
	
	public Facture findByReparation_IdReparation(Long idReparation);
	@Query("SELECT COUNT(f) FROM Facture f WHERE DATE(f.date) = CURRENT_DATE")
	public Long countFactureAujourdhui();


}
