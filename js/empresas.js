// Dados simulados (depois será puxado do backend)
let empresas = [
    { id: 1, nome: "TransLog Transportes", cnpj: "12.345.678/0001-99", telefone: "(67) 99999-1111", status: "Ativo" },
    { id: 2, nome: "FrotaMax Brasil", cnpj: "98.765.432/0001-44", telefone: "(67) 98888-2222", status: "Ativo" },
    { id: 3, nome: "Rápido Oeste", cnpj: "28.123.456/0001-09", telefone: "(67) 97777-3333", status: "Inativo" },
    { id: 4, nome: "Carga Sul", cnpj: "55.987.654/0001-77", telefone: "(67) 96666-4444", status: "Ativo" },
];

let pagina = 1;
const itensPorPagina = 5;

function renderTabela() {
    let tbody = document.getElementById("listaEmpresas");
    tbody.innerHTML = "";

    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const lista = empresas.slice(inicio, fim);

    lista.forEach(emp => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.nome}</td>
            <td>${emp.cnpj}</td>
            <td>${emp.telefone}</td>
            <td class="${emp.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}">
                ${emp.status}
            </td>
            <td>
                <button class="btn-acao btn-ver">Ver</button>
                <button class="btn-acao btn-editar">Editar</button>
                <button class="btn-acao btn-excluir">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById("paginaAtual").textContent = pagina;
}

document.addEventListener("DOMContentLoaded", () => {
    renderTabela();

    // Paginação
    document.getElementById("nextPage").onclick = () => {
        if (pagina * itensPorPagina < empresas.length) {
            pagina++;
            renderTabela();
        }
    };

    document.getElementById("prevPage").onclick = () => {
        if (pagina > 1) {
            pagina--;
            renderTabela();
        }
    };

    // Campo de busca
    document.getElementById("campoBusca").addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();
        empresas = empresas.filter(emp => emp.nome.toLowerCase().includes(texto) || emp.cnpj.includes(texto));
        pagina = 1;
        renderTabela();
    });

    // botão adicionar
    document.getElementById("btnAdicionar").addEventListener("click", () => {
        alert("Tela de cadastro ainda será criada!");
    });
});
