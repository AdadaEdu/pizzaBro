# React CRUD Cardápio

Este projeto é um front-end em React (Vite + TypeScript) com Material-UI para consumir uma API REST de cardápio de pizzas.

## Funcionalidades
- Listar itens do menu (GET /menu)
- Visualizar detalhes do item (GET /menu/{id})
- Adicionar novo item (POST /menu)
- Editar item (PUT/PATCH /menu/{id})
- Remover item (DELETE /menu/{id})

## Tecnologias
- React + Vite
- TypeScript
- Material-UI
- axios

## Como rodar
```bash
npm install
npm run dev
```

## Observações
- Certifique-se de que a API backend esteja rodando e acessível.
- O endpoint padrão esperado é `/menu`.

## Prompts sugeridos para Copilot
- "Crie um componente React para listar itens do menu consumindo a API /menu usando axios e Material-UI."
- "Implemente um formulário de cadastro de item do menu com feedback visual de sucesso e erro."
- "Adicione um modal de confirmação para remoção de item usando Material-UI."

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
