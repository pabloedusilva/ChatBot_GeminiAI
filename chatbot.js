require('dotenv').config(); // Carrega variáveis do .env no início do arquivo
const qrcode = require('qrcode');
const express = require('express');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const path = require('path');
const axios = require('axios'); // Adiciona axios para requisições HTTP

const app = express();
const client = new Client();
const port = 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Variável para armazenar o QR code
let qrCodeData = '';

// Variável para rastrear o status de conexão
let isConnected = false;

// Evento quando o QR code é gerado
client.on('qr', async (qr) => {
    try {
        // Gerar QR code como URL de dados
        qrCodeData = await qrcode.toDataURL(qr);
    } catch (err) {
        console.error('Erro ao gerar QR code:', err);
    }
});

// Rota para obter o QR code
app.get('/qrcode', (req, res) => {
    if (qrCodeData) {
        res.json({ qrcode: qrCodeData });
    } else {
        res.status(404).json({ error: 'QR Code ainda não disponível' });
    }
});

// Evento quando o cliente está pronto
client.on('ready', () => {
    console.log('Cliente conectado!');
    isConnected = true;
});

// Evento quando o cliente desconecta
client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    isConnected = false;
});

// Inicializar o cliente WhatsApp
client.initialize();

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
// Atualize o endpoint para o modelo correto
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
// Função para obter resposta do Gemini AI
async function getGeminiResponse(userMessage) {
    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: userMessage }] }]
        });
        // Retorna a resposta gerada pelo Gemini
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui gerar uma resposta.';
    } catch (error) {
        console.error('Erro ao consultar Gemini AI:', error?.response?.data || error.message);
        return 'Desculpe, houve um erro ao processar sua pergunta.';
    }
}

// Substitui o funil por respostas inteligentes do Gemini
client.on('message', async msg => {
    try {
        if (msg && msg.body && msg.from && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();
            await delay(1500);
            await chat.sendStateTyping();
            await delay(2000);
            const userQuestion = msg.body;
            const aiResponse = await getGeminiResponse(userQuestion);
            // Verifica se msg.from está definido antes de enviar
            if (msg.from) {
                await client.sendMessage(msg.from, aiResponse);
            } else {
                console.error('msg.from está indefinido, não foi possível enviar a resposta.');
            }
        }
    } catch (err) {
        console.error('Erro ao processar mensagem:', err);
        // Opcional: enviar mensagem de erro para o usuário se possível
        if (msg && msg.from) {
            await client.sendMessage(msg.from, 'Desculpe, ocorreu um erro ao processar sua mensagem.');
        }
    }
});

// Rota para verificar o status da conexão
app.get('/connection-status', (req, res) => {
    res.json({ connected: isConnected });
});
