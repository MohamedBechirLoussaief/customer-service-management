package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;



import org.Project.project.models.PieceRechange;

public interface IPieceRechange {

	public PieceRechange ajouter(PieceRechange pieceRechange);
	public boolean supprimer(Long idPieceRechange);
	public boolean modifier(Long idPieceRechange,PieceRechange pieceRechange);
	public List<PieceRechange> findAll();
	public PieceRechange findById(Long idPieceRechange);
	public List<PieceRechange> findPieceRechangesByType(Long idTypePiece);

}
