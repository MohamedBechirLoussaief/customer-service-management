package org.Project.project.models;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class PieceRechangeReparationKey {

    private Long idPieceRechange;

    private Long idReparation;
}
