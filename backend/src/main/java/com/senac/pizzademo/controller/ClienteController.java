package com.senac.pizzademo.controller;

import com.senac.pizzademo.model.Cliente;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private static final List<Cliente> clientes = new ArrayList<>();
    private static final AtomicLong idGenerator = new AtomicLong(1);

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente) {
        cliente.setId(idGenerator.getAndIncrement());
        clientes.add(cliente);
        return cliente;
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clientes;
    }
}
