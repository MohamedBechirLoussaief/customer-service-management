package org.Project.project.Controller;

import java.util.List;

import org.Project.project.Service.PieceRechangesReparationsService;
import org.Project.project.models.PieceRechangesReparation;
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
@RequestMapping("/PieceRechangeReparation")
public class PieceRechangeReparationController {

	@Autowired
	private PieceRechangesReparationsService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterPieceRechangesReparation(@RequestBody PieceRechangesReparation pieceRechangesReparation) {
	    try {
	        PieceRechangesReparation addedPieceRechangesReparation = service.ajouter(pieceRechangesReparation); 
	        return ResponseEntity.ok(addedPieceRechangesReparation); 
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de piece rechanges reparation: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{idReparation}/{idPieceRechange}")
    public ResponseEntity<String> supprimerPiece(@PathVariable Long idReparation, @PathVariable Long idPieceRechange) {
        boolean deleted = service.supprimer(idPieceRechange,idReparation);
        if (!deleted) {
            return ResponseEntity.ok("Piece Rechanges Reparation supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Piece Rechanges Reparation.");
    }
	
	@PutMapping("/miseAJour/{idRerparation}/{idPieceRechange}/")
    public ResponseEntity<String> modifierPieceRechangesReparation(@PathVariable Long idReparation,@PathVariable Long idPieceRechange, @RequestBody PieceRechangesReparation pieceRechangesReparation) {
        boolean updated = service.modifier(idPieceRechange,idReparation, pieceRechangesReparation);
        if (!updated) {
            return ResponseEntity.ok("pieceRechangesReparation mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de pieceRechangesReparation.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<PieceRechangesReparation>> getAllPieceRechangesReparations() {
		List<PieceRechangesReparation> pieceRechangesReparations  = service.findAll();
        return ResponseEntity.ok(pieceRechangesReparations);
    }
	
	@GetMapping("/{idRerparation}/{idPieceRechange}")
    public ResponseEntity<PieceRechangesReparation> getById(@PathVariable Long idReparation,@PathVariable Long idPieceRechange) {
        
		PieceRechangesReparation pieceRechangesReparation = service.findById(idPieceRechange,idReparation);
    	
    		return ResponseEntity.ok(pieceRechangesReparation);
    	
    
    }
	
	@GetMapping("/reparation/{idReparation}")
	public ResponseEntity<List<Object[]>> getPieceRechangesByReparationId(@PathVariable Long idReparation) {
	    try {
	        List<Object[]> pieces = service.getPieceRechangesByReparationId(idReparation);

	        if (pieces.isEmpty()) {
	            return ResponseEntity.noContent().build(); 
	        }

	        return ResponseEntity.ok(pieces);
	    } catch (Exception e) {
	       
	        System.err.println("Error retrieving pieces for reparation ID: " + idReparation);
	        e.printStackTrace();

	        return ResponseEntity.status(500).body(null);
	    }
	}

}
