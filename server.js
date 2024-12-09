require('dotenv').config();  // Carregar variáveis de ambiente (caso necessário)
const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');  // Para permitir CORS

const app = express();
const PORT = 3000;

// Permitir todas as origens
app.use(cors());  // Pode ser ajustado conforme as necessidades de segurança

// Carregar chave da API do arquivo config.json
let OPENAI_API_KEY = '';
try {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
  OPENAI_API_KEY = config.OPENAI_API_KEY;
} catch (error) {
  console.error('Erro ao carregar o config.json ou chave não encontrada.', error);
}

// Verifique se a chave foi carregada corretamente
if (!OPENAI_API_KEY) {
  console.error('A chave da API não foi encontrada. Certifique-se de que o arquivo config.json contém a chave OPENAI_API_KEY.');
  process.exit(1); // Encerra o servidor se a chave não for encontrada
}

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura o parser para lidar com dados JSON
app.use(express.json());

// Rotas para servir as páginas HTML
app.get('/limite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

// Rota para gerar questão de Limite (modificado para questão aleatória)
app.post('/gerar-questao-limite', async (req, res) => {
    try {
        const prompt = req.body.prompt || 'Crie uma questão aleatória de Cálculo 1 sobre limites, incluindo explicação detalhada e solução passo a passo.';

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [
                { role: "system", content: "Você é um assistente de cálculo." },
                { role: "user", content: prompt }
            ],
            max_tokens: 200,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const questao = response.data.choices[0].message.content.trim();

        // Aqui você pode retornar a questão gerada e a resolução
        res.json({
            questao: questao,
            resolucao: "Aqui está a resolução detalhada da questão gerada."  // Ajuste isso conforme necessário
        });

    } catch (error) {
        console.error('Erro ao gerar questão de limite:', error);
        res.status(500).json({ error: 'Erro ao gerar questão' });
    }
});
// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
