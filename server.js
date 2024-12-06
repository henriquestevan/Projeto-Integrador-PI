const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas específicas
app.get('/limite', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

app.get('/derivada', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'derivada.html'));
});

app.get('/integral', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'integral.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
