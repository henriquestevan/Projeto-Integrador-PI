document.getElementById('calculate-btn').addEventListener('click', function() {
    const func = document.getElementById('function-input').value;
    const lower = parseFloat(document.getElementById('lower-bound').value);
    const upper = parseFloat(document.getElementById('upper-bound').value);

    if (func && !isNaN(lower) && !isNaN(upper)) {
        // Usando math.js para calcular a integral
        try {
            const expr = math.parse(func);
            const integral = math.integrate(expr, 'x');
            const result = math.evaluate(integral, { x: upper }) - math.evaluate(integral, { x: lower });

            // Exibindo o resultado
            document.getElementById('result').innerHTML = `Resultado da Integral: ${result}`;
        } catch (error) {
            document.getElementById('result').innerHTML = 'Erro no cálculo da integral. Verifique a função.';
        }
    } else {
        document.getElementById('result').innerHTML = 'Por favor, preencha todos os campos corretamente.';
    }
});
