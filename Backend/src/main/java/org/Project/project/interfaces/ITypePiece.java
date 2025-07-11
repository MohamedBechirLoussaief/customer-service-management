package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;

import org.Project.project.models.TypePiece;

public interface ITypePiece {

	public TypePiece ajouter(TypePiece type);
	public boolean supprimer(Long idType);
	public boolean modifier(Long idType,TypePiece typePiece);
	public List<TypePiece> findAll();
	public TypePiece findById(Long idType);
}
