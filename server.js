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
const promptsLimites = [
    "Crie uma questão simples sobre limites envolvendo funções racionais.",
    "Crie uma questão sobre limites laterais envolvendo um ponto de descontinuidade.",
    "Crie uma questão desafiadora sobre limites envolvendo a regra de L'Hôpital.",
    "Crie uma questão conceitual sobre limites infinitos e suas propriedades.",
    "Crie uma questão prática sobre limites envolvendo funções trigonométricas."
];

app.post('/api/gerar-limite', async (req, res) => {
    try {
        // Escolher um prompt aleatório
        const prompt = promptsLimites[Math.floor(Math.random() * promptsLimites.length)];

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

        const resultado = response.data.choices[0].message.content.trim();
        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar questão de limite.' });
    }
});



const promptsDerivadas = [
    "Crie uma questão simples sobre derivadas de polinômios.",
    "Crie uma questão prática sobre derivadas envolvendo funções trigonométricas.",
    "Crie uma questão desafiadora sobre derivadas envolvendo a regra do produto e do quociente.",
    "Crie uma questão conceitual sobre a derivada como taxa de variação instantânea.",
    "Crie uma questão sobre derivadas envolvendo a regra da cadeia em funções compostas."
];

app.post('/api/gerar-derivada', async (req, res) => {
    try {
        // Escolher um prompt aleatório para derivadas
        const prompt = promptsDerivadas[Math.floor(Math.random() * promptsDerivadas.length)];

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

        const resultado = response.data.choices[0].message.content.trim();
        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar questão de derivada.' });
    }
});



const promptsIntegrais = [
    "Crie uma questão simples sobre integrais definidas envolvendo polinômios.",
    "Crie uma questão prática sobre integrais indefinidas de funções trigonométricas.",
    "Crie uma questão desafiadora sobre integrais envolvendo substituição trigonométrica.",
    "Crie uma questão conceitual sobre o Teorema Fundamental do Cálculo.",
    "Crie uma questão sobre integrais que exija o uso de integração por partes."
];

app.post('/api/gerar-integral', async (req, res) => {
    try {
        // Escolher um prompt aleatório para integrais
        const prompt = promptsIntegrais[Math.floor(Math.random() * promptsIntegrais.length)];

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

        const resultado = response.data.choices[0].message.content.trim();
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
