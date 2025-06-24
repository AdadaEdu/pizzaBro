@echo off
REM Script para clonar os repositórios do workspace automaticamente (Windows)

REM Backend
IF NOT EXIST "backend2025-pizzademo\.git" (
    echo Clonando backend2025-pizzademo...
    git clone https://github.com/prowenderfirmino/backend2025-pizzademo.git
) ELSE (
    echo backend2025-pizzademo já existe. Pulando clone.
)

REM Frontend
IF NOT EXIST "frontend2025\.git" (
    echo Clonando frontend2025...
    git clone https://github.com/prowenderfirmino/frontend2025.git
) ELSE (
    echo frontend2025 já existe. Pulando clone.
)

echo Clone automático finalizado.
