package org.Project.project.Service;

import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.ClientRepository;
import org.Project.project.interfaces.IClient;
import org.Project.project.models.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService implements IClient {

    @Autowired
    private ClientRepository repository;

    @Override
    public Client ajouter(Client client) {
        return repository.save(client);
    }

    @Override
    public boolean supprimer(Long idClient) {
        repository.deleteById(idClient);
        if (repository.findById(idClient).isEmpty())
            return true;
        return false;
    }

    @Override
    public List<Client> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean modifier(Long idClient, Client client) {
        Optional<Client> clientAncien = repository.findById(idClient);
        if (clientAncien.isPresent()) {
            clientAncien.get().setAdresse(client.getAdresse());
            clientAncien.get().setNom(client.getNom());
            clientAncien.get().setNumTel(client.getNumTel());
            repository.save(clientAncien.get());
            if (client.equals(clientAncien.get())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Client findById(Long idClient) {
        Optional<Client> client = repository.findById(idClient);
        if (client.isPresent()) {
            return client.get();
        }
        return null;
    }

    public Client findByNumTel(String numTel) {
        Optional<Client> client = repository.findByNumTel(numTel);
        if (client.isPresent()) {
            return client.get();
        }
        return null;
    }
}
