package com.senac.pizzademo.model;

public class Ingrediente {
    private Long id;
    private String ingrediente;
    private String quantidade;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIngrediente() { return ingrediente; }
    public void setIngrediente(String ingrediente) { this.ingrediente = ingrediente; }
    public String getQuantidade() { return quantidade; }
    public void setQuantidade(String quantidade) { this.quantidade = quantidade; }
}
