package org.Project.project.Repository;

import java.util.Optional;
import org.Project.project.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long>{
	
	Optional<Client>  findByNumTel(String numTel);
}
