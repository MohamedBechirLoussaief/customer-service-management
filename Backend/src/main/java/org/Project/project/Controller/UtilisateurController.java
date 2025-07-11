package org.Project.project.Controller;

import java.util.List;

import org.Project.project.Service.UtilisateurService;
import org.Project.project.models.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouterUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur nouveauUtilisateur = utilisateurService.ajouter(utilisateur);
            return ResponseEntity.ok(nouveauUtilisateur);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Problème lors de l'ajout de l'utilisateur: " + e.getMessage());
        }
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerUtilisateur(@PathVariable Long id) {
        boolean isDeleted = utilisateurService.supprimer(id);
        if (isDeleted) {
            return ResponseEntity.ok("Utilisateur supprimé avec succès.");
        }
        return ResponseEntity.badRequest().body("Échec de la suppression de l'utilisateur.");
    }

    @PutMapping("/miseAJour/{id}")
    public ResponseEntity<String> modifierUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur utilisateurModifie = utilisateurService.modifier(id, utilisateur);
            return ResponseEntity.ok("Utilisateur mis à jour avec succès.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Échec de la mise à jour de l'utilisateur: " + e.getMessage());
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurService.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        try {
            Utilisateur utilisateur = utilisateurService.findById(id);
            return ResponseEntity.ok(utilisateur);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<Utilisateur> findByUsername(@PathVariable String username) {
        try {
            Utilisateur utilisateur = utilisateurService.findByUsername(username);
            return ResponseEntity.ok(utilisateur);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/Verifier/{username}/{password}")
    public ResponseEntity<String> verifierUtilisateur(@PathVariable String username,@PathVariable String password) {
        boolean isVerifie = utilisateurService.verifierUtilisateur(username, password);
        if (isVerifie) {
            return ResponseEntity.ok("Utilisateur verifié.");
        }
        return ResponseEntity.badRequest().body("Échec de la verification de l'utilisateur.");
    }
}
