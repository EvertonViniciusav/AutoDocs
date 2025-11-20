// Simulação — depois você pega do backend
const nomeUsuario = "Everton";

function carregarHeader() {
    fetch("header.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("header").innerHTML = html;
            iniciarHeader();
        })
        .catch(err => console.error("Erro ao carregar header:", err));
}

function iniciarHeader() {
    atualizarNome();
    atualizarDataHora();
    setInterval(atualizarDataHora, 1000);
}

function atualizarNome() {
    const span = document.getElementById("nomeUsuario");
    if (span) span.textContent = nomeUsuario;
}

function atualizarDataHora() {
    const dataEl = document.getElementById("data");
    const horaEl = document.getElementById("hora");

    if (!dataEl || !horaEl) return;

    const agora = new Date();
    dataEl.textContent = agora.toLocaleDateString("pt-BR");
    horaEl.textContent = agora.toLocaleTimeString("pt-BR");
}

window.addEventListener("DOMContentLoaded", carregarHeader);
