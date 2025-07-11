package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;


import org.Project.project.models.PieceRechangesReparation;

public interface IPieceRechangesReparation {

	public PieceRechangesReparation ajouter(PieceRechangesReparation pieceRechangesReparation);
	public boolean supprimer(Long idPieceRechange,Long idReparation);
	public boolean modifier(Long idPieceRechange,Long idReparation,PieceRechangesReparation pieceRechangesReparation);
	public List<PieceRechangesReparation> findAll();
	public PieceRechangesReparation findById(Long idPieceRechange,Long idReparation);
	public List<Object[]> getPieceRechangesByReparationId(Long idReparation);
}
