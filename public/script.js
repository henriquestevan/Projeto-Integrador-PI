const express = require('express');
const app = express();
const PORT = 3000;

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

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
