const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Carregar chave da API do arquivo config.json
let OPENAI_API_KEY = '';
try {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
  OPENAI_API_KEY = config.OPENAI_API_KEY;
} catch (error) {
  console.error('Erro ao carregar o arquivo config.json ou chave não encontrada.', error);
  process.exit(1);
}

// Middleware para processar JSON no body das requisições
app.use(bodyParser.json());

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para corrigir problemas com fontes externas e CSP (Content Security Policy)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;"
  );
  next();
});

// Rotas para servir páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/limite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

app.get('/PraticaLimite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaLimite.html'));
});

app.get('/PraticaDerivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaDerivada.html'));
});

app.get('/PraticaIntegral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaIntegral.html'));
});

// Rotas da API para gerar questões e resoluções

// Questões e resoluções de Limites
app.post('/api/gerar-limite', async (req, res) => {
  try {
    const prompt = 'Crie uma questão curta de cálculo 1 sobre limites com a resolução detalhada, mas com explicações objetivas e claras.';
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo", // Use gpt-3.5-turbo para custos mais baixos
      messages: [
        { role: "system", content: "Você é um assistente de cálculo que responde de forma concisa." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300, // Limite de tokens para economizar
      temperature: 0.5
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const resultado = response.data.choices[0].message.content.trim();
    res.json({ resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar questão e resolução de limite.' });
  }
});

// Questões e resoluções de Derivadas
app.post('/api/gerar-derivada', async (req, res) => {
  try {
    const prompt = 'Crie uma questão curta de cálculo 1 sobre derivadas com a resolução detalhada, mas com explicações objetivas e claras.';
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente de cálculo que responde de forma concisa." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.5
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const resultado = response.data.choices[0].message.content.trim();
    res.json({ resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar questão e resolução de derivada.' });
  }
});

// Questões e resoluções de Integrais
app.post('/api/gerar-integral', async (req, res) => {
  try {
    const prompt = 'Crie uma questão curta de cálculo 1 sobre integrais com a resolução detalhada, mas com explicações objetivas e claras.';
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente de cálculo que responde de forma concisa." },
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.5
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const resultado = response.data.choices[0].message.content.trim();
    res.json({ resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar questão e resolução de integral.' });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
