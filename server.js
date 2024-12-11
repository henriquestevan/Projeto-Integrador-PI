const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

require('dotenv').config(); // Caso use um .env para outras coisas
const apiKey = process.env.OPENAI_API_KEY;


const app = express();
const PORT = 3000;
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
const htmlRoutes = [
    { route: '/', file: 'index.html' },
    { route: '/limite', file: 'limite.html' },
    { route: '/derivada', file: 'derivada.html' },
    { route: '/integral', file: 'integral.html' },
    { route: '/PraticaLimite', file: 'PraticaLimite.html' },
    { route: '/PraticaDerivada', file: 'PraticaDerivada.html' },
    { route: '/PraticaIntegral', file: 'PraticaIntegral.html' },
    { route: '/TeoriaLimites', file: 'TeoriaLimites.html' },
    { route: '/TeoriaDerivada', file: 'TeoriaDerivada.html' },
    { route: '/TeoriaIntegral', file: 'TeoriaIntegral.html' },
];

htmlRoutes.forEach(({ route, file }) => {
    app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'public', file)));
});

// Variáveis globais para armazenar as últimas questões geradas
let ultimaQuestaoLimite = '';
let ultimaQuestaoDerivada = '';
let ultimaQuestaoIntegral = '';

// Função para normalizar expressões LaTeX
function normalizeLatex(text) {
    return text.replace(/\s+/g, ' ').trim();
}

// Lista de prompts
const prompts = {
    limites: [
        "Crie uma questão simples sobre limites envolvendo funções racionais.",
        "Crie uma questão sobre limites laterais envolvendo um ponto de descontinuidade.",
        "Crie uma questão desafiadora sobre limites envolvendo a regra de L'Hôpital.",
        "Crie uma questão conceitual sobre limites infinitos e suas propriedades.",
        "Crie uma questão prática sobre limites envolvendo funções trigonométricas."
    ],
    derivadas: [
        "Crie uma questão simples sobre derivadas de polinômios.",
        "Crie uma questão prática sobre derivadas envolvendo funções trigonométricas.",
        "Crie uma questão desafiadora sobre derivadas envolvendo a regra do produto e do quociente.",
        "Crie uma questão conceitual sobre a derivada como taxa de variação instantânea.",
        "Crie uma questão sobre derivadas envolvendo a regra da cadeia em funções compostas."
    ],
    integrais: [
        "Crie uma questão simples sobre integrais definidas envolvendo polinômios.",
        "Crie uma questão prática sobre integrais indefinidas de funções trigonométricas.",
        "Crie uma questão desafiadora sobre integrais envolvendo substituição trigonométrica.",
        "Crie uma questão conceitual sobre o Teorema Fundamental do Cálculo.",
        "Crie uma questão sobre integrais que exija o uso de integração por partes."
    ]
};

// Função para gerar questão ou resolução
async function generateFromAPI(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Você é um assistente especializado em cálculo." },
                { role: "user", content: prompt }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Erro ao comunicar com a API OpenAI:', error.message || error);
        throw new Error('Erro ao gerar conteúdo.');
    }
}

// Endpoints para limites
app.post('/api/gerar-limite', async (req, res) => {
    try {
        const prompt = prompts.limites[Math.floor(Math.random() * prompts.limites.length)];
        ultimaQuestaoLimite = await generateFromAPI(prompt);
        res.json({ resultado: ultimaQuestaoLimite });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão de limite.' });
    }
});

app.post('/api/gerar-resolucao-limite', async (req, res) => {
    try {
        if (!ultimaQuestaoLimite) {
            return res.status(400).json({ error: 'Nenhuma questão foi gerada ainda para limites.' });
        }

        const prompt = `Resolva a seguinte questão de cálculo 1 sobre limites: ${ultimaQuestaoLimite}`;
        const resolucao = await generateFromAPI(prompt);
        res.json({ resolucao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar resolução de limite.' });
    }
});

// Endpoints para derivadas
app.post('/api/gerar-derivada', async (req, res) => {
    try {
        const prompt = prompts.derivadas[Math.floor(Math.random() * prompts.derivadas.length)];
        ultimaQuestaoDerivada = await generateFromAPI(prompt);
        res.json({ resultado: ultimaQuestaoDerivada });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão de derivada.' });
    }
});

app.post('/api/gerar-resolucao-derivada', async (req, res) => {
    try {
        if (!ultimaQuestaoDerivada) {
            return res.status(400).json({ error: 'Nenhuma questão foi gerada ainda para derivadas.' });
        }

        const prompt = `Resolva a seguinte questão de derivadas: ${ultimaQuestaoDerivada}`;
        const resolucao = await generateFromAPI(prompt);
        res.json({ resolucao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar resolução de derivada.' });
    }
});

// Endpoints para integrais
app.post('/api/gerar-integral', async (req, res) => {
    try {
        const prompt = prompts.integrais[Math.floor(Math.random() * prompts.integrais.length)];
        ultimaQuestaoIntegral = await generateFromAPI(prompt);
        res.json({ resultado: ultimaQuestaoIntegral });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão de integral.' });
    }
});

app.post('/api/gerar-resolucao-integral', async (req, res) => {
    try {
        if (!ultimaQuestaoIntegral) {
            return res.status(400).json({ error: 'Nenhuma questão foi gerada ainda para integrais.' });
        }

        const prompt = `Resolva a seguinte questão de cálculo 1 sobre integrais: ${ultimaQuestaoIntegral}`;
        const resolucao = await generateFromAPI(prompt);
        res.json({ resolucao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar resolução de integral.' });
    }
});

// Página de erro 404
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

// Inicialização do servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
