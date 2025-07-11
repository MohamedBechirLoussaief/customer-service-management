package org.Project.project.Controller;

import java.util.List;


import org.Project.project.Service.ReparationService;
import org.Project.project.models.Reparation;
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
@RequestMapping("/Reparation")
public class ReparationController {

	@Autowired
	private ReparationService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterReparation(@RequestBody Reparation reparation) {
	    try {
	        Reparation addedReparation = service.ajouter(reparation);
	        return ResponseEntity.ok(addedReparation);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de reparation: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerReparation(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Reparation supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Reparation.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierReparation(@PathVariable Long id, @RequestBody Reparation reparation) {
        boolean updated = service.modifier(id, reparation);
        if (!updated) {
            return ResponseEntity.ok("reparation mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de reparation.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<Reparation>> getAllReparations() {
		List<Reparation> reparations  = service.findAll();
        return ResponseEntity.ok(reparations);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Reparation> getById(@PathVariable Long id) {
        
		Reparation reparation = service.findById(id);
    	
    		return ResponseEntity.ok(reparation);
    	
    
    }
	
	@GetMapping("/{idDemandeReparation}/reparation")
	public ResponseEntity<Reparation> getReparationByIdDemandeReparation(@PathVariable Long idDemandeReparation) {
	   
	        Reparation reparation = service.findByIdDemandeReparation(idDemandeReparation);
	        return ResponseEntity.ok(reparation);
	   
	}

	
}
