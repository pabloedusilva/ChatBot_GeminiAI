# ChatBot_Beta

ChatBot_Beta é um aplicativo web que integra um chatbot automatizado ao WhatsApp utilizando a biblioteca whatsapp-web.js, Node.js e Express. O sistema permite a interação automática com usuários via WhatsApp, fornecendo respostas rápidas, informações sobre planos, benefícios e orientações, além de exibir um QR Code para autenticação do WhatsApp Web.

## Funcionalidades

- **Integração com WhatsApp Web:** Utiliza a biblioteca whatsapp-web.js para conectar e automatizar interações via WhatsApp.
- **Geração de QR Code:** Exibe um QR Code dinâmico para autenticação do WhatsApp Web.
- **Interface Web Moderna:** Frontend responsivo com tema claro/escuro, status de conexão e animações.
- **Atendimento Automatizado:** Responde automaticamente a mensagens com menu interativo e opções de atendimento.
- **Status de Conexão em Tempo Real:** Mostra se o bot está conectado ao WhatsApp.
- **Mensagens Personalizadas:** Saudações e respostas baseadas em opções escolhidas pelo usuário.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **whatsapp-web.js**
- **qrcode**
- **HTML5, CSS3, JavaScript (Frontend)**

## Estrutura do Projeto

```
ChatBot_Beta/
├── chatbot.js              # Backend principal (Node.js/Express/whatsapp-web.js)
├── package.json            # Dependências e scripts do projeto
├── README.md               # Documentação do projeto
└── public/                 # Arquivos estáticos do frontend
    ├── index.html          # Página principal
    ├── css/
    │   └── index.css       # Estilos customizados
    └── js/
        └── index.js        # Scripts do frontend
```

## Instalação

1. **Clone o repositório:**
   ```powershell
   git clone https://github.com/pabloedusilva/ChatBot_Beta.git
   cd ChatBot_Beta
   ```

2. **Instale as dependências:**
   ```powershell
   npm install
   ```

3. **Inicie o servidor:**
   ```powershell
   node chatbot.js
   ```

4. **Acesse a interface web:**
   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)

## Como Funciona

- Ao iniciar o servidor, um QR Code será gerado na interface web.
- Escaneie o QR Code com o WhatsApp (Menu > Aparelhos conectados > Conectar um aparelho).
- Após a conexão, o status mudará para "CONECTADO".
- O bot responderá automaticamente a mensagens recebidas, apresentando um menu de opções e respostas personalizadas.

## Fluxo de Atendimento (Funil)

- O bot reconhece saudações e palavras-chave, respondendo com um menu:
  1. Como funciona
  2. Valores dos planos
  3. Benefícios
  4. Como aderir
  5. Outras perguntas
- Cada opção retorna uma resposta detalhada e links para cadastro.

## Principais Dependências

- [express](https://www.npmjs.com/package/express)
- [whatsapp-web.js](https://www.npmjs.com/package/whatsapp-web.js)
- [qrcode](https://www.npmjs.com/package/qrcode)

Instale todas as dependências com `npm install`.

## Dicas de Desenvolvimento

- O arquivo `chatbot.js` pode ser customizado para adicionar novos fluxos de atendimento.
- O frontend pode ser adaptado para outras finalidades, como dashboards ou monitoramento.
- Para rodar em produção, utilize ferramentas como PM2 e configure variáveis de ambiente.

## Possíveis Problemas

- **Erro ENOENT:** Certifique-se de que o arquivo `package.json` está presente na raiz do projeto.
- **Falha ao gerar QR Code:** Verifique se o WhatsApp Web não está bloqueado na sua rede.
- **Desconexão frequente:** O WhatsApp Web pode desconectar se a sessão for usada em outro local.

## Galeria do Projeto

![image](https://github.com/user-attachments/assets/5fc9827d-ee3b-4f0a-9d96-d53cc86ecdc0)
![image](https://github.com/user-attachments/assets/3868754f-677c-464c-b4bb-35e50bb5e02c)
![image](https://github.com/user-attachments/assets/5fb20a33-4827-4d51-9c6b-92470ef2d7ff)
![image](https://github.com/user-attachments/assets/891aec23-d382-4d86-b91d-36793999d709)





## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a licença ISC.

## Autor

[Pablo](https://github.com/pabloedusilva)

---

> Projeto desenvolvido para automação de atendimento via WhatsApp com interface web moderna e personalizável.
