package org.Project.project.Service;


import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.PieceRechangeRepository;
import org.Project.project.interfaces.IPieceRechange;
import org.Project.project.models.PieceRechange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PieceRechangeService implements IPieceRechange {

	@Autowired
	private PieceRechangeRepository repository;

	@Override
	public PieceRechange ajouter(PieceRechange pieceRechange) {
		return repository.save(pieceRechange);
		
	}

	@Override
	public boolean supprimer(Long idPieceRechange) {
		repository.deleteById(idPieceRechange);
		if(repository.findById(idPieceRechange)==null)
			return true;
		return false;
	}



	@Override
	public List<PieceRechange> findAll() {
		return repository.findAll();
		 
	}

	@Override
	public boolean modifier(Long idPieceRechange, PieceRechange pieceRechange) {
		Optional<PieceRechange> pieceRechangeAncien =repository.findById(idPieceRechange);
		if(pieceRechangeAncien.isPresent()) {
			pieceRechangeAncien.get().setCode(pieceRechange.getCode());
			pieceRechangeAncien.get().setNom(pieceRechange.getNom());
			pieceRechangeAncien.get().setPrixAchat(pieceRechange.getPrixAchat());
			pieceRechangeAncien.get().setPrixHT(pieceRechange.getPrixHT());
			pieceRechangeAncien.get().setPrixTTC(pieceRechange.getPrixTTC());
			pieceRechangeAncien.get().setType(pieceRechange.getType());
			repository.save(pieceRechangeAncien.get());
			if(pieceRechange.equals(pieceRechangeAncien.get())) {
				return true;
			}
			
		}
		return false;
		
	}

	@Override
	public PieceRechange findById(Long idPieceRechange) {
		Optional<PieceRechange> pieceRechange =repository.findById(idPieceRechange);
		if (pieceRechange.isPresent()) {
			return pieceRechange.get();
		}
		return null;
	}
	
	@Override
	public List<PieceRechange> findPieceRechangesByType(Long idTypePiece){
		return repository.findByType_idTypePiece(idTypePiece);
	}

	

}
