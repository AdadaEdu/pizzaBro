package com.senac.pizzademo.controller;

import com.senac.pizzademo.model.Pedido;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

// Arquivo desabilitado para ambiente sem banco de dados.
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {
    private static final List<Pedido> pedidos = new ArrayList<>();
    private static final AtomicLong idGenerator = new AtomicLong(1);

    @PostMapping
    public Pedido criarPedido(@RequestBody Pedido pedido) {
        pedido.setId(idGenerator.getAndIncrement());
        pedidos.add(pedido);
        return pedido;
    }

    @GetMapping
    public List<Pedido> listarPedidos() {
        return Collections.unmodifiableList(pedidos);
    }

    @DeleteMapping("/{id}")
    public void deletarPedido(@PathVariable Long id) {
        pedidos.removeIf(p -> p.getId().equals(id));
    }
}

// Arquivo desabilitado para ambiente sem banco de dados.
