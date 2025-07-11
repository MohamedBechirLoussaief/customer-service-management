package org.Project.project.Service;


import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.DemandeReparationRepository;
import org.Project.project.Repository.ReparationRepository;
import org.Project.project.interfaces.IReparation;
import org.Project.project.models.DemandeReparation;
import org.Project.project.models.Reparation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ReparationService implements IReparation{

	@Autowired
	private ReparationRepository repository;
	
	@Autowired
	private DemandeReparationRepository demandeReparationRepository;

	@Override
	public Reparation ajouter(Reparation reparation) {

	    


	    Optional<DemandeReparation> demandeReparationOptional = demandeReparationRepository.findById(reparation.getDemandeReparation().getIdDemandeReparation());


	    if (demandeReparationOptional.isPresent()) {
	        DemandeReparation demandeReparation = demandeReparationOptional.get();


	        demandeReparation.setReparation(reparation);
	        demandeReparation.setEtat("En cours");

	        demandeReparationRepository.save(demandeReparation);


	        
	    }
	    return repository.save(reparation);

	   
	}


	@Override
	public boolean supprimer(Long idReparation) {
		repository.deleteById(idReparation);
		if(repository.findById(idReparation)==null)
			return true;
		return false;
	}

	

	@Override
	public List<Reparation> findAll() {
		return repository.findAll();
	
	}

	@Override
	public boolean modifier(Long idReparation, Reparation reparation) {
		Optional<Reparation> reparationAncien =repository.findById(idReparation);
		if(reparationAncien.isPresent()) {
			reparationAncien.get().setDateRep(reparation.getDateRep());
			reparationAncien.get().setDescription(reparation.getDescription());
			reparationAncien.get().setDemandeReparation(reparation.getDemandeReparation());
			reparationAncien.get().setFacture(reparation.getFacture());
			reparationAncien.get().setTempsMO(reparation.getTempsMO());
			repository.save(reparationAncien.get());
			if(reparation.equals(reparationAncien.get())) {
				return true;
			}
			
		}
		return false;
	}


	@Override
	public Reparation findById(Long idReparation) {
		Optional<Reparation> reparation =repository.findById(idReparation);
		if (reparation.isPresent()) {
			return reparation.get();
		}
		return null;
	}
	
	@Override
	public Reparation findByIdDemandeReparation (Long idDemandeReparation) {
		return repository.findByDemandeReparation_idDemandeReparation(idDemandeReparation).get();
	}

	

}
