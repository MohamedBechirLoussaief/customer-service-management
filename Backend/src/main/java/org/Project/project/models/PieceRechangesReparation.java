package org.Project.project.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "piecesRechangesReparations")
@Getter
@Setter
@NoArgsConstructor
public class PieceRechangesReparation {

    @EmbeddedId
    private PieceRechangeReparationKey idPieceRechangeReparation;

    @ManyToOne
    @MapsId("idPieceRechange")
    @JoinColumn(name = "idPieceRechange", referencedColumnName = "idPieceRechange")
    private PieceRechange pieceRechange;

    @ManyToOne
    @MapsId("idReparation")
    @JoinColumn(name = "idReparation", referencedColumnName = "idReparation")
    private Reparation reparation;

    private int qte;
}
