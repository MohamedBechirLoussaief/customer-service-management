package org.Project.project.models;

import jakarta.persistence.DiscriminatorValue;

import jakarta.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("ADMIN")
public class Admin extends Utilisateur{

	
	
	
}
