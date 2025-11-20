document.addEventListener("DOMContentLoaded", () => {

    // --- DADOS SIMULADOS POR ENQUANTO ---
    const dados = {
        empresasAtivas: 12,
        frotaAtiva: 57,
        motoristasAtivos: 28,
        vencendoHoje: 4,
        prox7dias: 12,
        alertasSistema: 3,
        notificacoesHoje: 18
    };

    // Atualiza os cards
    document.getElementById("empresasAtivas").textContent = dados.empresasAtivas;
    document.getElementById("frotaAtiva").textContent = dados.frotaAtiva;
    document.getElementById("motoristasAtivos").textContent = dados.motoristasAtivos;
    document.getElementById("vencendoHoje").textContent = dados.vencendoHoje;
    document.getElementById("prox7dias").textContent = dados.prox7dias;
    document.getElementById("alertasSistema").textContent = dados.alertasSistema;
    document.getElementById("notificacoesHoje").textContent = dados.notificacoesHoje;

});
