const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para /derivada
app.get('/derivada', (req, res) => {
    res.send('Você acessou a rota /derivada');
});

// Rota para /integral
app.get('/integral', (req, res) => {
    res.send('Você acessou a rota /integral');
});

// Rota para /limite
app.get('/limite', (req, res) => {
    res.send('Você acessou a rota /limite');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
