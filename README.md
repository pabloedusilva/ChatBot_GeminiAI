# ChatBot_Beta

ChatBot_Beta é um sistema completo de automação de atendimento via WhatsApp, integrando inteligência artificial (Gemini AI), interface web moderna e backend Node.js. O projeto permite interações automáticas com usuários, exibe QR Code para autenticação, responde perguntas com IA e pode ser customizado para diferentes fluxos de atendimento.

---

## Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura e Estrutura de Pastas](#arquitetura-e-estrutura-de-pastas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Variáveis de Ambiente e Configuração](#variáveis-de-ambiente-e-configuração)
- [Como Usar](#como-usar)
- [Personalização](#personalização)
- [Dicas para Produção](#dicas-para-produção)
- [Testes e Monitoramento](#testes-e-monitoramento)
- [FAQ](#faq)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Autor](#autor)

---

## Visão Geral

O ChatBot_Beta conecta-se ao WhatsApp Web usando a biblioteca `whatsapp-web.js`, exibe um QR Code para autenticação, responde automaticamente a mensagens e utiliza IA (Gemini) para respostas inteligentes. Possui frontend responsivo com tema claro/escuro, status de conexão em tempo real e animações modernas.

## Funcionalidades
- **Integração WhatsApp Web**: Automatização de interações via WhatsApp.
- **QR Code Dinâmico**: Autenticação fácil e visual.
- **Frontend Moderno**: Interface responsiva, tema escuro/claro, status de conexão.
- **Atendimento Automatizado**: Menu interativo, respostas personalizadas e integração com IA.
- **Respostas com Gemini AI**: IA generativa para respostas naturais.
- **Status em Tempo Real**: Indicador visual de conexão.
- **Customização Fácil**: Estrutura modular para handlers, comandos e fluxos.

## Arquitetura e Estrutura de Pastas

```
ChatBot_Beta/
├── chatbot.js              # Backend principal (Node.js/Express/whatsapp-web.js)
├── package.json            # Dependências e scripts
├── README.md               # Documentação
├── config/
│   ├── config.json         # Configurações do bot (API Key, admins, limites)
│   └── env.example         # Exemplo de variáveis de ambiente
├── public/                 # Frontend (estático)
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── index.css       # Estilos customizados
│   └── js/
│       └── index.js        # Scripts do frontend
└── src/
    ├── index.js            # Backend alternativo (exemplo Gemini)
    ├── handlers/
    │   ├── commands.js     # (Personalize comandos)
    │   └── message.js      # (Personalize handlers)
    └── services/
        ├── cache.js        # (Implementação de cache, se necessário)
        └── gemini.js       # (Integração Gemini AI)
```

## Instalação e Configuração

1. **Clone o repositório:**
   ```powershell
   git clone https://github.com/pabloedusilva/ChatBot_Beta.git
   cd ChatBot_Beta
   ```
2. **Instale as dependências:**
   ```powershell
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Renomeie `config/env.example` para `.env` e preencha conforme necessário.
   - Edite `config/config.json` para definir sua API Key do Gemini e números de admin.
4. **Inicie o servidor:**
   ```powershell
   node chatbot.js
   ```
5. **Acesse a interface web:**
   Abra o navegador em [http://localhost:3000](http://localhost:3000)

## Variáveis de Ambiente e Configuração

- `GOOGLE_API_KEY`: Chave da API Gemini (Google Generative AI)
- `PORT`: Porta do servidor (padrão: 3000)
- Outras opções podem ser configuradas em `config/config.json`:
  - `geminiApiKey`: Chave Gemini
  - `adminNumbers`: Lista de admins
  - `maxResponseLength`: Limite de caracteres por resposta

## Como Usar

- Ao iniciar, um QR Code será exibido na interface web.
- Escaneie com o WhatsApp (Menu > Aparelhos conectados > Conectar um aparelho).
- O status mudará para "CONECTADO".
- O bot responderá automaticamente a mensagens, usando IA para perguntas abertas.
- O frontend mostra status, QR code, tema e animações.

## Personalização

- **Fluxos de Atendimento**: Edite `chatbot.js` ou crie handlers em `src/handlers/` para menus, comandos e respostas customizadas.
- **Respostas da IA**: Ajuste a integração Gemini em `src/services/gemini.js`.
- **Frontend**: Modifique `public/index.html`, `public/css/index.css` e `public/js/index.js` para personalizar aparência e comportamento.
- **Cache e Serviços**: Implemente lógica em `src/services/cache.js` para otimizar performance.

## Dicas para Produção
- Use [PM2](https://pm2.keymetrics.io/) para manter o bot rodando:
  ```powershell
  npm install -g pm2
  pm2 start chatbot.js --name chatbot_beta
  ```
- Configure variáveis de ambiente e proteja sua API Key.
- Considere usar HTTPS e proxy reverso (Nginx) para produção.
- Monitore logs e utilize a rota `/health` para checagem de status.

## Testes e Monitoramento
- Teste o fluxo de QR code e conexão em diferentes navegadores.
- Use a rota `/health` para monitoramento automatizado.
- Adapte e crie testes para handlers e integração Gemini.

## FAQ

**1. O QR Code não aparece ou não conecta.**
- Verifique se o WhatsApp Web não está bloqueado na rede.
- Certifique-se de que o navegador está acessando `localhost:3000`.

**2. O bot para de responder após um tempo.**
- Sessões do WhatsApp Web podem expirar se usadas em outro local.
- Use PM2 para reiniciar automaticamente em caso de falha.

**3. Como personalizar comandos e respostas?**
- Edite `chatbot.js` ou crie handlers em `src/handlers/`.

**4. Como trocar a chave da API Gemini?**
- Edite `config/config.json` ou defina a variável de ambiente `GOOGLE_API_KEY`.

## Contribuição
Contribuições são bem-vindas! Abra issues ou pull requests.

## Licença
Projeto sob licença ISC.

## Autor
[Pablo](https://github.com/pabloedusilva)

---
> Projeto desenvolvido para automação de atendimento via WhatsApp com interface web moderna, personalizável e integração com IA generativa (Gemini).
