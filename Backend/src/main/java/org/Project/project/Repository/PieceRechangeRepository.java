package org.Project.project.Repository;

import java.util.List;
import org.Project.project.models.PieceRechange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PieceRechangeRepository extends JpaRepository<PieceRechange,Long> {
	
	public List<PieceRechange> findByType_idTypePiece(long idTypePiece);
}
