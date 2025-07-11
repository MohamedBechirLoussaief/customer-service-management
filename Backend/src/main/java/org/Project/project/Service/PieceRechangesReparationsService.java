package org.Project.project.Service;


import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.PieceRechangeReparationRepository;
import org.Project.project.interfaces.IPieceRechangesReparation;
import org.Project.project.models.PieceRechangeReparationKey;
import org.Project.project.models.PieceRechangesReparation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class PieceRechangesReparationsService implements IPieceRechangesReparation{
@Autowired
private PieceRechangeReparationRepository repository;

@Override
public PieceRechangesReparation ajouter(PieceRechangesReparation pieceRechangesReparation) {

    return repository.save(pieceRechangesReparation);
}


@Override
public boolean supprimer(Long idPieceRechange, Long idReparation) {
	PieceRechangeReparationKey pieceRechangeReparationKey= new PieceRechangeReparationKey();
	pieceRechangeReparationKey.setIdPieceRechange(idPieceRechange);
	pieceRechangeReparationKey.setIdReparation(idReparation);
	
	repository.deleteById(pieceRechangeReparationKey);
	if(repository.findById(pieceRechangeReparationKey)==null)
		return true;
	return false;
}

@Override
public boolean modifier(Long idPieceRechange, Long idReparation, PieceRechangesReparation pieceRechangesReparation) {
	PieceRechangeReparationKey pieceRechangeReparationKey= new PieceRechangeReparationKey();
	pieceRechangeReparationKey.setIdPieceRechange(idPieceRechange);
	pieceRechangeReparationKey.setIdReparation(idReparation);
	
	Optional<PieceRechangesReparation> pieceRechangesReparationAncien =repository.findById(pieceRechangeReparationKey);
	if(pieceRechangesReparationAncien.isPresent()) {
		pieceRechangesReparationAncien.get().setQte(pieceRechangesReparation.getQte());
		
		
		repository.save(pieceRechangesReparationAncien.get());
		if(pieceRechangesReparation.equals(pieceRechangesReparationAncien.get())) {
			return true;
		}
		
	}
	return false;
}

@Override
public List<PieceRechangesReparation> findAll() {
	return repository.findAll();

}


@Override
public PieceRechangesReparation findById(Long idPieceRechange, Long idReparation) {
	PieceRechangeReparationKey key =new PieceRechangeReparationKey();
	key.setIdPieceRechange(idPieceRechange);
	key.setIdReparation(idReparation);
	
	Optional<PieceRechangesReparation> pieceRechangeReparation =repository.findById(key);
	if (pieceRechangeReparation.isPresent()) {
		return pieceRechangeReparation.get();
	}
	return null;
	
	
}

@Override
public List<Object[]> getPieceRechangesByReparationId(Long idReparation) {
    return repository.findPieceRechangesByReparationId(idReparation);
}

	
}
