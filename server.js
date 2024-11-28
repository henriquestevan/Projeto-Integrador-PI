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

// Rotas específicas
app.get('/limite', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Limite', 'limite.html'));
});

app.get('/derivada', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Derivada', 'derivada.html'));
});

app.get('/integral', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'integral', 'integral.html'));
});



// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
