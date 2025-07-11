package org.Project.project.models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DemandesReparations")
@Getter
@Setter
@NoArgsConstructor
public class DemandeReparation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDemandeReparation;

    private LocalDate dateDepotAppareil;

    private LocalDate datePrevueReparation;

    private String etat;

    private String symptomesPanne;

    @ManyToOne
    @JoinColumn(name = "idClient")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "idAppareil")
    private Appareil appareil;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "idReparation", nullable = true)
    private Reparation reparation;
}
