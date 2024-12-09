const express = require('express');
const path = require('path');
const axios = require('axios'); // Importa o Axios
const app = express();
const PORT = 3000;

// Sua chave da API OpenAI
const OPENAI_API_KEY = 'sua-chave-da-api';

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura o parser para lidar com dados JSON
app.use(express.json());

// Rotas para servir as páginas HTML
app.get('/limite', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

app.get('/derivada', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'derivada.html'));
});

app.get('/integral', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'integral.html'));
});

// Rota para gerar questão de Derivada
app.post('/gerar-questao-derivada', async (req, res) => {
    try {
        const prompt = 'Crie uma questão de Cálculo 1 sobre derivadas, incluindo explicação detalhada e solução passo a passo.';
        
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 200,
            n: 1,
            stop: null,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].text.trim();
        res.json({ questao: questao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Rota para gerar questão de Integral
app.post('/gerar-questao-integral', async (req, res) => {
    try {
        const prompt = 'Crie uma questão de Cálculo 1 sobre integrais, incluindo explicação detalhada e solução passo a passo.';
        
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 200,
            n: 1,
            stop: null,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].text.trim();
        res.json({ questao: questao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Rota para gerar questão de Limite
app.post('/gerar-questao-limite', async (req, res) => {
    try {
        const prompt = 'Crie uma questão de Cálculo 1 sobre limites, incluindo explicação detalhada e solução passo a passo.';
        
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 200,
            n: 1,
            stop: null,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].text.trim();
        res.json({ questao: questao });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
