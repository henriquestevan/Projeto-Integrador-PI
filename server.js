const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configura o diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para servir cada página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/derivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'derivada.html'));
});

app.get('/integral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'integral.html'));
});

app.get('/limite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'limite.html'));
});

app.get('/TeoriaDerivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaDerivada.html'));
});

app.get('/TeoriaIntegral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaIntegral.html'));
});

app.get('/TeoriaLimites', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'TeoriaLimites.html'));
});

app.get('/PraticaDerivada', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaDerivada.html'));
});

app.get('/PraticaIntegral', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaIntegral.html'));
});

app.get('/PraticaLimite', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'PraticaLimite.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
