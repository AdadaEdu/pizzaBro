#!/bin/bash

# Script para clonar os repositórios do workspace automaticamente

# Backend
if [ ! -d "backend2025-pizzademo/.git" ]; then
  echo "Clonando backend2025-pizzademo..."
  git clone https://github.com/prowenderfirmino/backend2025-pizzademo.git
else
  echo "backend2025-pizzademo já existe. Pulando clone."
fi

# Frontend
if [ ! -d "frontend2025/.git" ]; then
  echo "Clonando frontend2025..."
  git clone https://github.com/prowenderfirmino/frontend2025.git
else
  echo "frontend2025 já existe. Pulando clone."
fi

echo "Clone automático finalizado."
