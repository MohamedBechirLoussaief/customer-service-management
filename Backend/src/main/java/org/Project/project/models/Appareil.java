package org.Project.project.models;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "appareils")
@Getter
@Setter
@NoArgsConstructor
public class Appareil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAppareil;

    private String numSerie;

    private String marque;

    private String modele;

    @JsonIgnore
    @OneToMany(mappedBy = "appareil")
    private Set<DemandeReparation> lesDemandesReparations;

    @ManyToOne
    private Client client;
}
