package org.Project.project.models;

import java.sql.Date;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("EMPLOYEE")
public class Employee extends Utilisateur {

    private String departement;

    private Date dateNaissance;

    private String adresse;
}
