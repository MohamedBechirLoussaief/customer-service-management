package org.Project.project.Controller;

import java.util.List;



import org.Project.project.Service.DemandeReparationService;

import org.Project.project.models.DemandeReparation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/DemandeReparation")
public class DemandeReparationController {

	@Autowired
	private DemandeReparationService service;
	
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterDemandeReparation(@RequestBody DemandeReparation demandeReparation) {
	    try {
	        DemandeReparation addedDemande = service.ajouter(demandeReparation);
	        return ResponseEntity.ok(addedDemande); 
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de demande reparation: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerDemandeReparation(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Demande Reparation supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Demande Reparation.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierDemandeReparation(@PathVariable Long id, @RequestBody DemandeReparation demandeReparation) {
        boolean updated = service.modifier(id, demandeReparation);
        if (!updated) {
            return ResponseEntity.ok("demandeReparation mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de demandeReparation.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<DemandeReparation>> getAllDemandeReparation() {
        List<DemandeReparation> demandeReparations  = service.findAll();
        return ResponseEntity.ok(demandeReparations);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<DemandeReparation> getById(@PathVariable Long id) {
        
		DemandeReparation demandeReparation = service.findById(id);
    	
    		return ResponseEntity.ok(demandeReparation);
    	
    
    }
	
	
	
	@PutMapping("/miseAJourEtat/{id}/{etat}")
	public ResponseEntity<DemandeReparation> modifierDemandeReparation(@PathVariable Long id, @PathVariable String etat) {
	    try {
	        DemandeReparation updated = service.modifierEtat(etat, id);
	        if (updated != null) {
	            return ResponseEntity.ok(updated);
	        }
	        return ResponseEntity.badRequest().body(null); 
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
	    }
	}

	
}
