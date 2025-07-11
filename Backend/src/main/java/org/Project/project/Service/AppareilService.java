package org.Project.project.Service;

import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.AppareilRepository;
import org.Project.project.interfaces.IAppareil;
import org.Project.project.models.Appareil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppareilService implements IAppareil {
    
    @Autowired
    private AppareilRepository repository;

    @Override
    public Appareil ajouter(Appareil appareil) {
        return repository.save(appareil);
    }

    @Override
    public boolean supprimer(Long idAppareil) {
        repository.deleteById(idAppareil);
        if (repository.findById(idAppareil).isEmpty())
            return true;
        return false;
    }

    @Override
    public boolean modifier(Long idAppareil, Appareil appareil) {
        Optional<Appareil> appareilAncien = repository.findById(idAppareil);
        if (appareilAncien.isPresent()) {
            appareilAncien.get().setModele(appareil.getModele());
            appareilAncien.get().setNumSerie(appareil.getNumSerie());
            appareilAncien.get().setMarque(appareil.getMarque());
            repository.save(appareilAncien.get());
            if (appareil.equals(appareilAncien.get())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Appareil> findAll() {
        return repository.findAll();
    }

    @Override
    public Appareil findById(Long idAppareil) {
        Optional<Appareil> appareil = repository.findById(idAppareil);
        if (appareil.isPresent()) {
            return appareil.get();
        }
        return null;
    }

    @Override
    public List<Appareil> findByIdClient(Long idClient) {
        List<Appareil> appareil = repository.findByClient_IdClient(idClient);
        if (appareil.isEmpty()) 
            return null;
        return appareil;
    }
}
