package org.Project.project.Repository;

import java.util.Optional;
import org.Project.project.models.Reparation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReparationRepository extends JpaRepository<Reparation,Long>{
	
	Optional<Reparation> findByDemandeReparation_idDemandeReparation(Long idDemandeReparation);
}
