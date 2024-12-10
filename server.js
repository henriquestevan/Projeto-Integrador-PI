const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('Erro: A chave OPENAI_API_KEY não foi encontrada no arquivo .env');
    process.exit(1);
}


// Middleware para processar JSON no body das requisições
app.use(express.json());

// Configuração para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rotas das páginas HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/limite', (req, res) => res.sendFile(path.join(__dirname, 'public', 'limite.html')));
app.get('/derivada', (req, res) => res.sendFile(path.join(__dirname, 'public', 'derivada.html')));
app.get('/integral', (req, res) => res.sendFile(path.join(__dirname, 'public', 'integral.html')));
app.get('/PraticaLimite', (req, res) => res.sendFile(path.join(__dirname, 'public', 'PraticaLimite.html')));
app.get('/PraticaDerivada', (req, res) => res.sendFile(path.join(__dirname, 'public', 'PraticaDerivada.html')));
app.get('/PraticaIntegral', (req, res) => res.sendFile(path.join(__dirname, 'public', 'PraticaIntegral.html')));
app.get('/TeoriaLimites', (req, res) => res.sendFile(path.join(__dirname, 'public', 'TeoriaLimites.html')));
app.get('/TeoriaDerivada', (req, res) => res.sendFile(path.join(__dirname, 'public', 'TeoriaDerivada.html')));
app.get('/TeoriaIntegral', (req, res) => res.sendFile(path.join(__dirname, 'public', 'TeoriaIntegral.html')));

// Rotas da API para gerar questões e resoluções
// Função para normalizar expressões LaTeX
function normalizeLatex(text) {
    // Remove espaços desnecessários e ajusta formatação (exemplo)
    return text.replace(/\\\s+/g, '').trim();}
// Endpoint com a correção
app.post('/api/gerar-limite', async (req, res) => {
  try {
      const prompt = `
          Crie uma questão de cálculo 1 sobre limites.
          Varie os tipos de questões e use diferentes exemplos.
          Formate todas as expressões matemáticas com delimitadores LaTeX.
      `;
      console.log('Chave da API:', OPENAI_API_KEY);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [
              { role: "system", content: "Você é um assistente especializado em cálculo." },
              { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7,
      }, {
          headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
          },
      });

      const resultado = normalizeLatex(response.data.choices[0].message.content.trim());
      res.json({ resultado });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar questão de limite.' });
  }
});


app.post('/api/gerar-derivada', async (req, res) => {
  try {
      const prompt = `
          Crie uma questão de cálculo 1 sobre derivadas.
          Varie os tipos de questões e use diferentes exemplos.
          Formate todas as expressões matemáticas com delimitadores LaTeX.
      `;
      console.log('Chave da API:', OPENAI_API_KEY);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [
              { role: "system", content: "Você é um assistente especializado em cálculo." },
              { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7,
      }, {
          headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
          },
      });

      const resultado = normalizeLatex(response.data.choices[0].message.content.trim());
      res.json({ resultado });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar questão de derivada.' });
  }
});


app.post('/api/gerar-integral', async (req, res) => {
  try {
      const prompt = `
          Crie uma questão de cálculo 1 sobre integrais.
          Varie os tipos de questões e use diferentes exemplos.
          Formate todas as expressões matemáticas com delimitadores LaTeX.
      `;

      console.log('Chave da API:', OPENAI_API_KEY);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [
              { role: "system", content: "Você é um assistente especializado em cálculo." },
              { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7,
      }, {
          headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
          },
      });

      const resultado = normalizeLatex(response.data.choices[0].message.content.trim());
      res.json({ resultado });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao gerar questão de integral.' });
  }
});


// Página de erro 404
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

// Inicialização do servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
