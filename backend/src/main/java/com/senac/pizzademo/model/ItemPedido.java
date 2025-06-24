package com.senac.pizzademo.model;

public class ItemPedido {
    private Long id;
    private String nomePizza;
    private Integer quantidade;
    private Double precoUnitario;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNomePizza() { return nomePizza; }
    public void setNomePizza(String nomePizza) { this.nomePizza = nomePizza; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
    public Double getPrecoUnitario() { return precoUnitario; }
    public void setPrecoUnitario(Double precoUnitario) { this.precoUnitario = precoUnitario; }
}
