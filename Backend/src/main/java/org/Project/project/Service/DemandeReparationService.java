package org.Project.project.Service;

import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.DemandeReparationRepository;
import org.Project.project.interfaces.IDemandeReparation;
import org.Project.project.models.DemandeReparation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DemandeReparationService implements IDemandeReparation {

    @Autowired
    private DemandeReparationRepository repository;

    @Override
    public DemandeReparation ajouter(DemandeReparation demandeReparation) {
        return repository.save(demandeReparation);
    }

    @Override
    public boolean supprimer(Long idDemandeReparation) {
        repository.deleteById(idDemandeReparation);
        if (repository.findById(idDemandeReparation).isEmpty())
            return true;
        return false;
    }

    @Override
    public List<DemandeReparation> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean modifier(Long idDemandeReparation, DemandeReparation demandeReparation) {
        Optional<DemandeReparation> demandeReparationAncien = repository.findById(idDemandeReparation);
        if (demandeReparationAncien.isPresent()) {
            demandeReparationAncien.get().setAppareil(demandeReparation.getAppareil());
            demandeReparationAncien.get().setClient(demandeReparation.getClient());
            demandeReparationAncien.get().setDateDepotAppareil(demandeReparation.getDateDepotAppareil());
            demandeReparationAncien.get().setDatePrevueReparation(demandeReparation.getDatePrevueReparation());
            demandeReparationAncien.get().setEtat(demandeReparation.getEtat());
            demandeReparationAncien.get().setSymptomesPanne(demandeReparation.getSymptomesPanne());
            repository.save(demandeReparationAncien.get());
            if (demandeReparation.equals(demandeReparationAncien.get())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public DemandeReparation findById(Long idDemandeReparation) {
        Optional<DemandeReparation> demandeReparation = repository.findById(idDemandeReparation);
        if (demandeReparation.isPresent()) {
            return demandeReparation.get();
        }
        return null;
    }

    @Override
    public DemandeReparation modifierEtat(String etat, Long idDemandeReparation) {
        Optional<DemandeReparation> demandeReparation = repository.findById(idDemandeReparation);
        if (demandeReparation.isPresent()) {
            demandeReparation.get().setEtat(etat);
            return repository.save(demandeReparation.get());
        }
        return null;
    }
}
