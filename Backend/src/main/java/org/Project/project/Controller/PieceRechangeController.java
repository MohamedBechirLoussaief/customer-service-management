package org.Project.project.Controller;

import java.util.List;


import org.Project.project.Service.PieceRechangeService;

import org.Project.project.models.PieceRechange;
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
@RequestMapping("/PieceRechange")
public class PieceRechangeController {

	@Autowired
	private PieceRechangeService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterPieceRechange(@RequestBody PieceRechange pieceRechange) {
	    try {
	        PieceRechange addedPiece = service.ajouter(pieceRechange);
	        return ResponseEntity.ok(addedPiece);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de Piece rechange: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerPieceRechange(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Piece Rechange supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Piece Rechange.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierPieceRechange(@PathVariable Long id, @RequestBody PieceRechange pieceRechange) {
        boolean updated = service.modifier(id, pieceRechange);
        if (updated) {
            return ResponseEntity.ok("PieceRechange mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de PieceRechange.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<PieceRechange>> getAllPieceRechanges() {
		List<PieceRechange> pieceRechanges  = service.findAll();
        return ResponseEntity.ok(pieceRechanges);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<PieceRechange> getById(@PathVariable Long id) {
        
		PieceRechange pieceRechange = service.findById(id);
    	
    		return ResponseEntity.ok(pieceRechange);
    	
    
    }
	
	@GetMapping("/{idType}/piecesRechanges")
    public ResponseEntity<List<PieceRechange>> getByType(@PathVariable Long idType) {
        
	List<PieceRechange>	 pieceRechanges = service.findPieceRechangesByType(idType);
    	
    		return ResponseEntity.ok(pieceRechanges);
    	
    
    }
}
