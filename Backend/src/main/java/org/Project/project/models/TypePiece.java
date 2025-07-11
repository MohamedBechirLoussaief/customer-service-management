package org.Project.project.models;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "typesPieces")
@Getter
@Setter
@NoArgsConstructor
public class TypePiece {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTypePiece;

    private String type;

    private double tarifH;

    @JsonIgnore
    @OneToMany(mappedBy = "type")
    private Set<PieceRechange> piecesRechanges;
}
