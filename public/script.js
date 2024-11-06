const express = require('express');
const app = express();
const PORT = 3000;

// Redireciona para /limite ao clicar em "Limites"
document.getElementById('limites').onclick = function() {
    window.location.href = 'http://localhost:3000/limite';
};

// Redireciona para /derivada ao clicar em "Derivadas"
document.getElementById('derivadas').onclick = function() {
    window.location.href = 'http://localhost:3000/derivada';
};

// Redireciona para /integral ao clicar em "Integrais"
document.getElementById('integrais').onclick = function() {
    window.location.href = 'http://localhost:3000/integral';
};


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
