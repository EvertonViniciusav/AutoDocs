document.addEventListener("DOMContentLoaded", () => {
    fetch("../header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
            function atualizarDataHora() {
                document.getElementById("data").textContent = new Date().toLocaleDateString("pt-BR");
                document.getElementById("hora").textContent = new Date().toLocaleTimeString("pt-BR");
            }
            atualizarDataHora();
            setInterval(atualizarDataHora, 1000);
        })
        .catch(error => console.error("Erro ao carregar o header", error));
});
