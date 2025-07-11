package org.Project.project.Repository;

import java.util.List;
import org.Project.project.models.Appareil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppareilRepository extends JpaRepository<Appareil,Long>{
	
	List<Appareil> findByClient_IdClient(Long idClient);
}
