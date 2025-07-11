package org.Project.project.models;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "factures")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "numero")
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFacture;

    private String numero;

    private double montantTotal;

    private LocalDate date;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "idReparation")
    private Reparation reparation;
}
