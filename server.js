const express = require('express');
const path = require('path');
const axios = require('axios'); // Importa o Axios
const fs = require('fs'); // Importa o módulo fs
const app = express();
const PORT = 3000;

// Sua chave da API OpenAI
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const OPENAI_API_KEY = config.OPENAI_API_KEY;

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
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "system", content: "Você é um assistente de cálculo." }, { role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].message.content.trim();
        res.json({ questao: questao });
    } catch (error) {
        console.error('Erro ao gerar questão de derivada:', error);
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Rota para gerar questão de Integral
app.post('/gerar-questao-integral', async (req, res) => {
    try {
        const prompt = 'Crie uma questão de Cálculo 1 sobre integrais, incluindo explicação detalhada e solução passo a passo.';
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "system", content: "Você é um assistente de cálculo." }, { role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].message.content.trim();
        res.json({ questao: questao });
    } catch (error) {
        console.error('Erro ao gerar questão de integral:', error);
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Rota para gerar questão de Limite
app.post('/gerar-questao-limite', async (req, res) => {
    try {
        const prompt = 'Crie uma questão de Cálculo 1 sobre limites, incluindo explicação detalhada e solução passo a passo.';
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "system", content: "Você é um assistente de cálculo." }, { role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const questao = response.data.choices[0].message.content.trim();
        res.json({ questao: questao });
    } catch (error) {
        console.error('Erro ao gerar questão de limite:', error);
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});

// Rota para verificar a resposta do usuário
app.post('/verificar-resposta', async (req, res) => {
    try {
        const { question, userAnswer } = req.body;

        // Verifique se os dados estão sendo recebidos corretamente
        console.log('Question recebida:', question);
        console.log('Resposta do usuário recebida:', userAnswer);

        const prompt = `Você gerou a questão: ${question}. A resposta do usuário foi: "${userAnswer}". Verifique se a resposta está correta.`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{ role: "system", content: "Você é um assistente de cálculo." }, { role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });

        const resposta = response.data.choices[0].message.content.trim();

        // Envia a resposta de validação para o cliente
        res.json({ validacao: resposta });

    } catch (error) {
        console.error('Erro ao verificar resposta:', error);
        res.status(500).json({ error: 'Erro ao verificar resposta' });
    }
});
// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
