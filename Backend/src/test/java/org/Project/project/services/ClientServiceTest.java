package org.Project.project.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.Project.project.Repository.ClientRepository;
import org.Project.project.Service.ClientService;
import org.Project.project.models.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class ClientServiceTest {

    @Mock
    private ClientRepository repository;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAjouter() {
        Client client = new Client();

        client.setAdresse("sfax");
        client.setNom("Mohamed bechir loussaief");
        client.setNumTel("28567553");
        
        when(repository.save(client)).thenReturn(client);

        Client savedClient = clientService.ajouter(client);

        assertNotNull(savedClient);
        assertEquals("Mohamed bechir loussaif", savedClient.getNom());
        assertEquals("28567553", savedClient.getNumTel());
        assertEquals("sfax", savedClient.getAdresse());
        verify(repository, times(1)).save(client);
    }
}