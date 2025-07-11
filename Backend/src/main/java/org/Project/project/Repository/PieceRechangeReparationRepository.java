package org.Project.project.Repository;

import java.util.List;

import org.Project.project.models.PieceRechangeReparationKey;
import org.Project.project.models.PieceRechangesReparation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PieceRechangeReparationRepository extends JpaRepository<PieceRechangesReparation, PieceRechangeReparationKey> {

    List<PieceRechangesReparation> findByIdPieceRechangeReparation_IdReparation(Long idReparation);

    @Query("SELECT p.idPieceRechange, p.code, p.nom, pr.qte, p.prixHT " +
           "FROM PieceRechange p " +
           "JOIN PieceRechangesReparation pr ON p.idPieceRechange = pr.pieceRechange.idPieceRechange " +
           "WHERE pr.idPieceRechangeReparation.idReparation = :idReparation")
    List<Object[]> findPieceRechangesByReparationId(@Param("idReparation") Long idReparation);
}
