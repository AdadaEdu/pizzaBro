package com.senac.pizzademo.model;

import java.util.List;

public class Pizza {
    private Long id;
    private String sabor;
    private List<Ingrediente> ingredientes;
    private List<Cardapio> cardapio;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSabor() { return sabor; }
    public void setSabor(String sabor) { this.sabor = sabor; }
    public List<Ingrediente> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<Ingrediente> ingredientes) { this.ingredientes = ingredientes; }
    public List<Cardapio> getCardapio() { return cardapio; }
    public void setCardapio(List<Cardapio> cardapio) { this.cardapio = cardapio; }
}

