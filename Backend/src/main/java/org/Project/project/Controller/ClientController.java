package org.Project.project.Controller;

import java.util.List;


import org.Project.project.Service.ClientService;
import org.Project.project.models.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/Client")
public class ClientController {
	
	@Autowired
	private ClientService service;
	
	@PostMapping("/ajouter")
	public ResponseEntity<?> ajouterClient(@RequestBody Client client) {
	    try {
	        Client addedClient = service.ajouter(client); 
	        return ResponseEntity.ok(addedClient); 
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Problème lors de l'ajout de client: " + e.getMessage());
	    }
	}

	
	@DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerClient(@PathVariable Long id) {
        boolean deleted = service.supprimer(id);
        if (!deleted) {
            return ResponseEntity.ok("Client supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de Client.");
    }
	
	@PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierClient(@PathVariable Long id, @RequestBody Client client) {
        boolean updated = service.modifier(id, client);
        if (!updated) {
            return ResponseEntity.ok("Client mis à jour avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la mise à jour de Client.");
    }
	
	@GetMapping("/list")
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients  = service.findAll();
        return ResponseEntity.ok(clients);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Client> getById(@PathVariable Long id) {
        
    	Client client = service.findById(id);
    	
    		return ResponseEntity.ok(client);
    	
    
    }
	
	@GetMapping("/telephone/{numTel}")
    public ResponseEntity<Client> getByNumTel(@PathVariable String numTel) {
        
    	Client client = service.findByNumTel(numTel);
    	
    		return ResponseEntity.ok(client);
    	
    
    }
	

}
