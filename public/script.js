const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para as páginas principais
app.get('/limite', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

app.get('/derivada', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'derivada.html'));
});

app.get('/integral', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'integral.html'));
});

// Rota para lidar com erros 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
