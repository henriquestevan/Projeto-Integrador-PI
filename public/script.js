// Script para alternar entre as seções
document.getElementById('integrais-link').addEventListener('click', function() {
    changeSection('integrais-section');
});

document.getElementById('derivadas-link').addEventListener('click', function() {
    changeSection('derivadas-section');
});

document.getElementById('limites-link').addEventListener('click', function() {
    changeSection('limites-section');
});

document.getElementById('questoes-link').addEventListener('click', function() {
    changeSection('questoes-section');
});

function changeSection(sectionId) {
    document.querySelectorAll('section').forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('nav ul li a').forEach(function(link) {
        link.classList.remove('active');
    });
    document.querySelector(`nav ul li a[href='#${sectionId.split('-')[0]}-link']`).classList.add('active');
}
