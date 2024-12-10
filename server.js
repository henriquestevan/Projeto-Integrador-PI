require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env
const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Porta definida no .env ou padrão 3000
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Chave da API definida no .env

// Verificar se a chave da API foi configurada corretamente
if (!OPENAI_API_KEY) {
  console.error('Erro: A chave da API OpenAI não foi configurada no arquivo .env');
  process.exit(1); // Encerrar a aplicação se a chave não for encontrada
}

// Middleware para processar JSON no body das requisições
app.use(bodyParser.json());

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para corrigir problemas com CSP (Content Security Policy)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com 'unsafe-inline';"
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

app.get('/derivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'derivada.html'));
});

app.get('/integral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'integral.html'));
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

app.get('/TeoriaLimites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaLimites.html'));
});

app.get('/TeoriaDerivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaDerivada.html'));
});

app.get('/TeoriaIntegral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaIntegral.html'));
});

// Função genérica para chamada à API OpenAI
async function gerarResposta(promptBase, res) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Você é um assistente de cálculo que responde de forma concisa." },
        { role: "user", content: promptBase }
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
    res.json({ resposta: resultado });
  } catch (error) {
    console.error('Erro na chamada da API:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Erro ao gerar resposta.' });
  }
}

// Rotas da API para geração de questões e resoluções
// Limites
app.post('/api/gerar-limite', (req, res) => {
  const prompt = req.body.prompt || 'Crie uma questão curta de cálculo 1 sobre limites com a resolução detalhada.';
  gerarResposta(prompt, res);
});

// Derivadas
app.post('/api/gerar-derivada', (req, res) => {
  const prompt = req.body.prompt || 'Crie uma questão curta de cálculo 1 sobre derivadas com a resolução detalhada.';
  gerarResposta(prompt, res);
});

// Integrais
app.post('/api/gerar-integral', (req, res) => {
  const prompt = req.body.prompt || 'Crie uma questão curta de cálculo 1 sobre integrais com a resolução detalhada.';
  gerarResposta(prompt, res);
});

// Middleware para lidar com rotas inexistentes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Página de erro personalizada
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
