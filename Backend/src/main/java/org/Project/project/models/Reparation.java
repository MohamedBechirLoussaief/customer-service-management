package org.Project.project.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reparations")
@Getter
@Setter
@NoArgsConstructor
public class Reparation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReparation;

    private LocalDate dateRep;

    private String description;

    @Getter
    @Setter
    private static double tarifHMO = 10;

    private LocalTime tempsMO;

    @OneToOne
    @JoinColumn(name = "idDemandeReparation", nullable = false)
    private DemandeReparation demandeReparation;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "idFacture", nullable = true)
    private Facture facture;

    @JsonIgnore
    @OneToMany(mappedBy = "reparation")
    private Set<PieceRechangesReparation> piecesRechangesReparation;
}
