package org.Project.project.Service;


import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.TypePieceRepository;
import org.Project.project.interfaces.ITypePiece;
import org.Project.project.models.TypePiece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class TypePieceService implements ITypePiece{

	@Autowired
	private TypePieceRepository repository;

	@Override
	public TypePiece ajouter(TypePiece type) {
		return repository.save(type);
		
	}

	@Override
	public boolean supprimer(Long idType) {
		repository.deleteById(idType);
		if(repository.findById(idType)==null)
			return true;
		return false;
	}

	

	@Override
	public List<TypePiece> findAll() {
		return  repository.findAll();
		
	}

	@Override
	public boolean modifier(Long idType, TypePiece typePiece) {
		Optional<TypePiece> typePieceAncien =repository.findById(idType);
		if(typePieceAncien.isPresent()) {
			typePieceAncien.get().setTarifH(typePiece.getTarifH());
			typePieceAncien.get().setType(typePiece.getType());
			
			repository.save(typePieceAncien.get());
			if(typePiece.equals(typePieceAncien.get())) {
				return true;
			}
			
		}
		return false;
	}

	@Override
	public TypePiece findById(Long idType) {
		Optional<TypePiece> typePiece =repository.findById(idType);
		if (typePiece.isPresent()) {
			return typePiece.get();
		}
		return null;
	}
	

}
