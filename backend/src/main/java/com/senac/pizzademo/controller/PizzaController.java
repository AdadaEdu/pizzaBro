package com.senac.pizzademo.controller;

import org.springframework.web.bind.annotation.*;
import com.senac.pizzademo.model.Pizza;
import java.util.*;

@RestController
@RequestMapping("/pizza")
public class PizzaController {
    private static final List<Pizza> pizzas = new ArrayList<>();
    private static long nextId = 1;

    @GetMapping
    public List<Pizza> getAllPizzas() {
        return pizzas;
    }

    @PostMapping
    public Pizza createPizza(@RequestBody Pizza pizza) {
        pizza.setId(nextId++);
        pizzas.add(pizza);
        return pizza;
    }

    @DeleteMapping("/{id}")
    public void deletePizza(@PathVariable Long id) {
        pizzas.removeIf(p -> Objects.equals(p.getId(), id));
    }

    @PutMapping("/{id}")
    public Pizza updatePizza(@PathVariable Long id, @RequestBody Pizza pizza) {
        for (int i = 0; i < pizzas.size(); i++) {
            if (Objects.equals(pizzas.get(i).getId(), id)) {
                pizza.setId(id);
                pizzas.set(i, pizza);
                return pizza;
            }
        }
        throw new RuntimeException("Pizza não encontrada");
    }
}
