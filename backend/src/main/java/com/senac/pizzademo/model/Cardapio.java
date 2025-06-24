package com.senac.pizzademo.model;

public class Cardapio {
    private Long id;
    private float valor;
    private String tamanho;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public float getValor() { return valor; }
    public void setValor(float valor) { this.valor = valor; }
    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }
}
