const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
const bodyParser = require('body-parser');

// Configuração do Gemini
const genAI = new GoogleGenerativeAI('AIzaSyD39UiLlUCAOA05I9ZK4gnfwlb9B4YHsak'); // Sua API Key

// Configuração do servidor web para monitoramento
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Inicializa o cliente do WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Gera QR Code para autenticação
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

// Confirmação de autenticação
client.on('authenticated', () => {
  console.log('Autenticado no WhatsApp!');
});

// Pronto para uso
client.on('ready', () => {
  console.log('Cliente está pronto!');
});

// Manipulação de mensagens
client.on('message', async message => {
  try {
    // Ignora mensagens de grupos ou próprias mensagens
    if (message.fromMe || message.isGroupMsg) return;

    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);

    // Obtém o modelo Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Gera conteúdo com base na mensagem recebida
    const result = await model.generateContent(message.body);
    const response = await result.response;
    const text = response.text();

    // Envia a resposta de volta para o WhatsApp
    await client.sendMessage(message.from, text);
    console.log(`Resposta enviada para ${message.from}: ${text}`);
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    await client.sendMessage(message.from, 'Desculpe, ocorreu um erro ao processar sua mensagem.');
  }
});

// Inicia o cliente WhatsApp
client.initialize();

// Rota de saúde para monitoramento
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'online' });
});

// Inicia o servidor web
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Desligando...');
  client.destroy();
  process.exit();
});