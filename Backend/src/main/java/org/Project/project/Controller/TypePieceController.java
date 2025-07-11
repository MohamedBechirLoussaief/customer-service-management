package org.Project.project.Controller;

import java.util.List;

import org.Project.project.Service.TypePieceService;
import org.Project.project.models.TypePiece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/TypePiece")
public class TypePieceController {

	@Autowired
	private TypePieceService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterTypePiece(@RequestBody TypePiece piece) {
	    try {
	        TypePiece addedTypePiece = service.ajouter(piece);
	        return ResponseEntity.ok(addedTypePiece);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de type piece: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerTypePiece(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Piece supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Piece.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierTypePiece(@PathVariable Long id, @RequestBody TypePiece typePiece) {
        boolean updated = service.modifier(id, typePiece);
        if (!updated) {
            return ResponseEntity.ok("typePiece mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de typePiece.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<TypePiece>> getAllTypePieces() {
		List<TypePiece> typePieces  = service.findAll();
        return ResponseEntity.ok(typePieces);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<TypePiece> getById(@PathVariable Long id) {
        
		TypePiece typePiece = service.findById(id);
    	
    		return ResponseEntity.ok(typePiece);
    	
    
    }
}
