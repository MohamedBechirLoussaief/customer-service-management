package org.Project.project.Controller;

import java.util.List;


import org.Project.project.Service.FactureService;
import org.Project.project.models.Facture;
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
@RequestMapping("/Facture")
public class FactureController {

	@Autowired
	private FactureService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterFacture(@RequestBody Facture facture) {
	    try {
	        Facture addedFacture = service.ajouter(facture); 
	        return ResponseEntity.ok(addedFacture);
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de facture: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerFacture(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Facture supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Facture.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierFacture(@PathVariable Long id, @RequestBody Facture facture) {
        boolean updated = service.modifier(id, facture);
        if (!updated) {
            return ResponseEntity.ok("Facture mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de Facture.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<Facture>> getAllFactures() {
		List<Facture> factures  = service.findAll();
        return ResponseEntity.ok(factures);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Facture> getById(@PathVariable Long id) {
        
		Facture facture = service.findById(id);
    	
    		return ResponseEntity.ok(facture);
    	
    
    }
	
	@GetMapping("/reparation/{idReparation}")
	public ResponseEntity<Facture> findByIdReparation(@PathVariable Long idReparation) {
		 Facture facture=service.findByIdReparation(idReparation);
		 
			 return ResponseEntity.ok(facture);
			
		
	}
	
}
