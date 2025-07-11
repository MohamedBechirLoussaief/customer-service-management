package org.Project.project.models;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "piecesRechanges")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "code")
public class PieceRechange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPieceRechange;

    private int code;

    private String nom;

    private double prixAchat;

    private double prixHT;

    private double prixTTC;

    @ManyToOne
    @JoinColumn(name = "idTypePiece")
    private TypePiece type;

    @JsonIgnore
    @OneToMany(mappedBy = "pieceRechange")
    private Set<PieceRechangesReparation> piecesRechangesReparation;
}
