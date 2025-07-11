package org.Project.project.Service;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.DemandeReparationRepository;
import org.Project.project.Repository.FactureRepository;
import org.Project.project.Repository.PieceRechangeReparationRepository;
import org.Project.project.Repository.PieceRechangeRepository;
import org.Project.project.Repository.ReparationRepository;
import org.Project.project.interfaces.IFacture;
import org.Project.project.models.DemandeReparation;
import org.Project.project.models.Facture;
import org.Project.project.models.PieceRechange;
import org.Project.project.models.PieceRechangesReparation;
import org.Project.project.models.Reparation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class FactureService implements IFacture {

	@Autowired
	private FactureRepository repository;
	@Autowired
	private ReparationRepository reparationRepository;
	@Autowired
	private DemandeReparationRepository demandeReparationRepository;
	
	@Autowired
	private PieceRechangeReparationRepository pieceRechangeReparationRepository;
	
	@Autowired 
	private PieceRechangeRepository pieceRechangeRepository;

	@Override
	public Facture ajouter(Facture facture) {
		 
		
		
		Optional<Reparation> reparation=reparationRepository.findById(facture.getReparation().getIdReparation());
		
		List<PieceRechangesReparation> pieceRechangesReparations = pieceRechangeReparationRepository.findByIdPieceRechangeReparation_IdReparation(facture.getReparation().getIdReparation());
		
		reparation.get();
		double montant =Reparation.getTarifHMO()*reparation.get().getTempsMO().getHour();
		
		for (PieceRechangesReparation pieceRechangesReparation : pieceRechangesReparations) {
			
			Optional<PieceRechange> pieceRechangeOptional=pieceRechangeRepository.findById(pieceRechangesReparation.getPieceRechange().getIdPieceRechange());
			double prixHT=pieceRechangeOptional.get().getPrixHT();
			montant+=pieceRechangesReparation.getQte()*prixHT;
		}
		facture.setMontantTotal(montant);
		
		
		reparation.get().setFacture(facture);
		int year = LocalDate.now().getYear();
		int month=LocalDate.now().getMonthValue();
		int day=LocalDate.now().getDayOfMonth();
        Long count = repository.countFactureAujourdhui() + 1;
        String numeroFacture = day+""+month+""+year+""+count;
        facture.setNumero(numeroFacture);
        facture.setDate(LocalDate.now());
        Facture fac =repository.save(facture);
		reparationRepository.save(reparation.get());
		DemandeReparation demandeReparation =reparation.get().getDemandeReparation();
		demandeReparation.setEtat("Termineé");
		demandeReparationRepository.save(demandeReparation);
		return fac;
		
		
	}

	@Override
	public boolean supprimer(Long idFacture) {
		repository.deleteById(idFacture);
		if(repository.findById(idFacture)==null)
			return true;
		return false;
	}

	

	@Override
	public List<Facture> findAll() {
		return repository.findAll();
		
	}

	@Override
	public boolean modifier(Long idFacture, Facture facture) {
		Optional<Facture> factureAncien =repository.findById(idFacture);
		if(factureAncien.isPresent()) {
			factureAncien.get().setDate(facture.getDate());
			factureAncien.get().setReparation(facture.getReparation());
			factureAncien.get().setNumero(facture.getNumero());
			
			repository.save(factureAncien.get());
			if(facture.equals(factureAncien.get())) {
				return true;
			}
			
		}
		return false;
		
		
	}

	@Override
	public Facture findById(Long idFacture) {
		Optional<Facture> facture =repository.findById(idFacture);
		if (facture.isPresent()) {
			return facture.get();
		}
		return null;
	}
	
	@Override
	public Facture findByIdReparation(Long idReparation) {
		return repository.findByReparation_IdReparation(idReparation);
	}

	
	

	
}
