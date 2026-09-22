# Food Waste Zero

TCC Front-End em Angular sobre combate ao desperdício alimentar em Salvador/BA.

## Requisitos atendidos

- Angular + TypeScript
- Login e cadastro
- Cadastro de consumidor, estabelecimento e ONG
- AuthGuard / proteção de rotas
- LGPD: banner de privacidade + política + consentimento no cadastro
- Carrossel interativo na Home
- Dados simulados via Services + mocks
- Responsividade
- Estrutura preparada para deploy na Vercel

## Como executar

```bash
npm install
npm start
```

Depois acesse `http://localhost:4200`.

## Login de demonstração

E-mail: `teste@email.com`

Senha: `123456`

Também é possível criar uma conta pela tela de cadastro.

## Build

```bash
npm run build
```

O projeto usa standalone components e lazy loading por rota.

> Observação: este é um protótipo acadêmico. A autenticação e os dados são simulados com `localStorage` e não devem ser tratados como autenticação de produção.
