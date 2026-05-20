# 🧪 Swag Labs Playwright E2E Automation

[![Playwright Tests](https://github.com/aleclaudino17-collab/swag-labs-playwright-e2e/actions/workflows/playwright.yml/badge.svg)](https://github.com/aleclaudino17-collab/swag-labs-playwright-e2e/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.44-blue?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node-20-green?logo=nodedotjs)

> Suite profissional de automação E2E para o site [Swag Labs (SauceDemo)](https://www.saucedemo.com/) utilizando **Playwright**, **TypeScript** e **Page Object Model (POM)**.

---

## 📐 Arquitetura

```
┌─────────────────────────────────────────┐
│           Test Layer (specs)            │
│     login.spec.ts | e2e-fluxo-compra    │
├─────────────────────────────────────────┤
│         Page Object Layer (POM)         │
│   LoginPage | ProductsPage | CartPage   │
│            | CheckoutPage               │
├─────────────────────────────────────────┤
│         Data Layer (fixtures)           │
│           user-data.json                │
└─────────────────────────────────────────┘
```

### Padrões Aplicados
- **Page Object Model (POM)**: Separação total entre lógica de teste e interação com UI
- **Data-Driven Testing (DDT)**: Massa de dados externalizada em JSON
- **Cross-Browser Testing**: Execução paralela em Chromium, Firefox e WebKit
- **CI/CD Ready**: Pipeline GitHub Actions com artefatos de falha

---

## 🚀 Pré-requisitos

| Ferramenta | Versão |
|------------|--------|
| Node.js    | 18+    |
| npm        | 9+     |
| VS Code    | Latest |

**Extensões recomendadas no VS Code:**
- [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## ⚡ Comandos para Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Instalar browsers do Playwright
npx playwright install

# 3. Executar todos os testes em headless
npx playwright test

# 4. Executar com interface gráfica (UI Mode)
npx playwright test --ui

# 5. Executar modo headed (browser visível)
npx playwright test --headed

# 6. Abrir relatório HTML
npx playwright show-report
```

---

## 📊 Relatórios

Após a execução, o relatório HTML é gerado automaticamente em `playwright-report/`:

```bash
npx playwright show-report
```

Na pipeline do GitHub Actions, o relatório é salvo como **artifact** em toda execução, e screenshots/vídeos são preservados apenas em caso de falha.

---

## 🗂️ Estrutura do Projeto

```
.
├── .github/workflows/      # CI/CD GitHub Actions
├── data/                   # Massa de teste (JSON)
├── pages/                  # Page Objects
├── tests/                  # Specs de teste
├── playwright.config.ts    # Configuração do Playwright
├── package.json            # Dependências e scripts
└── tsconfig.json           # Configuração TypeScript
```

---

## 🧪 Cenários Cobertos

| Cenário | Arquivo | Descrição |
|---------|---------|-----------|
| Login Válido | `login.spec.ts` | Usuário standard_user loga com sucesso |
| Login Bloqueado | `login.spec.ts` | Usuário locked_out_user exibe erro |
| Login Inválido | `login.spec.ts` | Credenciais erradas exibem mensagem |
| Fluxo de Compra | `e2e-fluxo-compra.spec.ts` | Login → Produto → Carrinho → Checkout → Confirmação |
| Múltiplos Produtos | `e2e-fluxo-compra.spec.ts` | Adiciona 3 itens e finaliza compra |

---

## 🔧 Configurações do Playwright

| Config | Valor | Motivo |
|--------|-------|--------|
| `fullyParallel` | `true` | Execução paralela de specs |
| `screenshot` | `only-on-failure` | Evita poluição em execuções limpas |
| `video` | `retain-on-failure` | Grava vídeo apenas quando necessário |
| `trace` | `on-first-retry` | Trace detalhado no primeiro retry |
| Workers CI | `1` | Estabilidade em pipelines |
| Workers Local | `undefined` | Playwright define automaticamente |

---

## 👤 Autor

**Alexandre Claudino** — QA Engineer & Test Automation Architect  
🔗 [LinkedIn](https://www.linkedin.com/in/alexandreclaudino) | 💻 [GitHub](https://github.com/aleclaudino17-collab)

---

## 📄 Licença

Este projeto está sob a licença MIT.
