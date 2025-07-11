package org.Project.project.Controller;

import java.util.List;


import org.Project.project.Service.AppareilService;
import org.Project.project.models.Appareil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Appareil")
public class AppareilController {

    @Autowired
    private AppareilService appareilService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouterAppareil(@RequestBody Appareil appareil) {
        try {
            Appareil addedAppareil = appareilService.ajouter(appareil); 
            return ResponseEntity.ok(addedAppareil);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Problème lors de l'ajout de l'appareil: " + e.getMessage());
        }
    }


    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerAppareil(@PathVariable Long id) {
        boolean deleted = appareilService.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Appareil supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de l'appareil.");
    }

    @PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierAppareil(@PathVariable Long id, @RequestBody Appareil appareil) {
        boolean updated = appareilService.modifier(id, appareil);
        if (!updated) {
            return ResponseEntity.ok("Appareil mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de l'appareil.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<Appareil>> getAllAppareils() {
        List<Appareil> appareils = appareilService.findAll();
        return ResponseEntity.ok(appareils);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Appareil> getById(@PathVariable Long id) {
        
    	Appareil appareil = appareilService.findById(id);
    	
    		return ResponseEntity.ok(appareil);
    	
    
    }
    @GetMapping("/{idClient}/appareils")
    public ResponseEntity<List<Appareil>> getByIdClient(@PathVariable Long idClient) {
        
    	List<Appareil> appareil = appareilService.findByIdClient(idClient);
    	
    		return ResponseEntity.ok(appareil);
    	
    
    }
    
    
}
