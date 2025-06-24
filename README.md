# Workspace VS Code - Pizzaria Fullstack

Este repositório contém o arquivo de workspace do VS Code para facilitar o desenvolvimento integrado dos projetos backend e frontend da pizzaria.

## Estrutura

- `backend2025-pizzademo/` — Projeto Java Spring Boot (backend)
- `frontend2025/` — Projeto React + Vite + TypeScript (frontend)
- `pizzaria-demo.code-workspace` — Arquivo de configuração do workspace para abrir ambos os projetos juntos no VS Code

## Setup automático dos repositórios

Para facilitar o setup inicial, utilize o script de automação para clonar os repositórios necessários.

### Linux/macOS

No terminal, execute:

```bash
chmod +x setup.sh
./setup.sh
```

### Windows

Execute o arquivo `setup.bat` com um duplo clique ou pelo Prompt de Comando:

```cmd
setup.bat
```

O script irá clonar automaticamente os repositórios caso ainda não existam nas pastas correspondentes.

## Como usar manualmente

1. **Clone os repositórios do backend e frontend:**

```bash
git clone https://github.com/prowenderfirmino/backend2025-pizzademo.git
# ou com SSH
git clone git@github.com:prowenderfirmino/backend2025-pizzademo.git

git clone https://github.com/prowenderfirmino/frontend2025.git
# ou com SSH
git clone git@github.com:prowenderfirmino/frontend2025.git
```

2. **Coloque as pastas `backend2025-pizzademo` e `frontend2025` no mesmo diretório deste arquivo de workspace.**

3. **Abra o arquivo `pizzaria-demo.code-workspace` no VS Code.**

4. O VS Code irá abrir ambos os projetos lado a lado, facilitando o desenvolvimento fullstack.

## Extensões recomendadas
- Prettier
- ESLint
- Docker

## Observações
- O campo `remoteRepositories` serve apenas como referência para as URLs dos repositórios.
- Este repositório não contém código-fonte, apenas o arquivo de configuração do workspace.

---

> Mantenha este repositório atualizado caso os nomes das pastas ou URLs dos projetos mudem.
