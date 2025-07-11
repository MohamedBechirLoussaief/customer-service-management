package org.Project.project.interfaces;

import java.util.List;
import java.util.Set;

import org.Project.project.models.Client;

public interface IClient {

	public Client ajouter(Client client);
	public boolean supprimer(Long idClient);
	public boolean modifier(Long idClient,Client client);
	public List<Client> findAll();
	public Client findById(Long idClient);
}
