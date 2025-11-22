// ====== DADOS FAKE ======
// LISTA TEMPORÁRIA (mock) – substitua depois pelos dados do backend
let empresas = [
    { id: 1, nome: "TransLog Brasil", cnpj: "12.345.678/0001-99", telefone: "(11) 99999-0000", email: "contato@translog.com.br", status: "Ativa" },
    { id: 2, nome: "RotaExpress", cnpj: "22.444.555/0001-88", telefone: "(67) 98888-1212", email: "empresa@rotaexpress.com", status: "Ativa" },
    { id: 3, nome: "CargaSul", cnpj: "55.111.222/0001-33", telefone: "(21) 97777-3322", email: "suporte@cargasul.com", status: "Inativa" }
];

// LISTA ATUAL QUE A TABELA USA
let empresasFiltradas = [...empresas];

// DESENHA A LISTA NA TABELA
function atualizarTabela() {
    const tabela = document.getElementById("listaEmpresas");
    tabela.innerHTML = "";

    empresasFiltradas.forEach(emp => {
        tabela.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.nome}</td>
                <td>${emp.cnpj}</td>
                <td>${emp.telefone}</td>
                <td>${emp.email}</td>
                <td>${emp.status}</td>
                <td>
                    <button class="btn-acao ver" onclick="verEmpresa(${emp.id})">Ver</button>
                    <button class="btn-acao editar" onclick="editarEmpresa(${emp.id})">Editar</button>
                    <button class="btn-acao excluir" onclick="abrirExcluir(${emp.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// FUNÇÃO DE PESQUISA
function pesquisarEmpresa() {
    const texto = document.getElementById("campoBusca").value.toLowerCase();

    empresasFiltradas = empresas.filter(emp =>
        emp.nome.toLowerCase().includes(texto) ||
        emp.cnpj.includes(texto) ||
        emp.email.toLowerCase().includes(texto)
    );

    atualizarTabela();
}

// EVENTO: DIGITAR NO CAMPO DE BUSCA
document.getElementById("campoBusca").addEventListener("input", pesquisarEmpresa);

// CARREGAR AO ABRIR A PÁGINA
document.addEventListener("DOMContentLoaded", atualizarTabela);


let idExcluir = null;

// ====== LISTAGEM ======
function carregarTabela() {
    const tbody = document.getElementById("listaEmpresas");
    tbody.innerHTML = "";

    empresas.forEach(emp => {
        tbody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.nome}</td>
                <td>${emp.cnpj}</td>
                <td>${emp.telefone}</td>
                <td>${emp.email}</td>
                <td>${emp.status}</td>
                <td>
                    <button class="btn-acao ver" onclick="verEmpresa(${emp.id})">Ver</button>
                    <button class="btn-acao editar" onclick="editarEmpresa(${emp.id})">Editar</button>
                    <button class="btn-acao excluir" onclick="abrirExcluir(${emp.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function abrirModal(id) {
    document.getElementById(id).style.display = "flex";
}

function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

// ====== VISUALIZAR ======
function verEmpresa(id) {
    const emp = empresas.find(e => e.id === id);

    document.getElementById("vId").innerText = emp.id;
    document.getElementById("vNome").innerText = emp.nome;
    document.getElementById("vCnpj").innerText = emp.cnpj;
    document.getElementById("vTelefone").innerText = emp.telefone;
    document.getElementById("vEmail").innerText = emp.email;
    document.getElementById("vStatus").innerText = emp.status;

    abrirModal("modalVisualizar");
}

// ====== EXCLUIR ======
function abrirExcluir(id) {
    idExcluir = id;
    abrirModal("modalExcluir");
}

document.getElementById("btnConfirmarExcluir").addEventListener("click", () => {
    empresas = empresas.filter(e => e.id !== idExcluir);
    carregarTabela();
    fecharModal("modalExcluir");
});

// ====== CADASTRAR ======
document.getElementById("btnAdicionar").addEventListener("click", () => {
    document.getElementById("formCadastrar").reset();
    limparValidacao("formCadastrar");
    document.getElementById("btnSalvarCad").disabled = true;
    abrirModal("modalCadastrar");
});

// ====== EDITAR ======
function editarEmpresa(id) {
    const emp = empresas.find(e => e.id === id);

    document.getElementById("editId").value = emp.id;
    document.getElementById("editNome").value = emp.nome;
    document.getElementById("editCnpj").value = emp.cnpj;
    document.getElementById("editTelefone").value = emp.telefone;
    document.getElementById("editEmail").value = emp.email;
    document.getElementById("editStatus").value = emp.status;

    limparValidacao("formEditar");
    document.getElementById("btnSalvarEdit").disabled = true;

    abrirModal("modalEditar");
}

// ====== VALIDAÇÃO ======

function validarFormulario(formId, botaoId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input, select");
    let valido = true;

    inputs.forEach(campo => {
        const msg = campo.parentElement.querySelector("small");

        if (campo.value.trim() === "") {
            campo.classList.add("error");
            campo.classList.remove("success");
            msg.style.display = "block";
            msg.innerText = "Campo obrigatório";
            valido = false;
        } else {
            campo.classList.remove("error");
            campo.classList.add("success");
            msg.style.display = "none";
        }

        if (campo.type === "email" && campo.value.trim() !== "") {
            const emailValido = /\S+@\S+\.\S+/.test(campo.value);
            if (!emailValido) {
                campo.classList.add("error");
                campo.classList.remove("success");
                msg.style.display = "block";
                msg.innerText = "Digite um email válido";
                valido = false;
            }
        }
    });

    document.getElementById(botaoId).disabled = !valido;
}

function limparValidacao(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input, select");
    const msgs = form.querySelectorAll("small");

    inputs.forEach(i => i.classList.remove("error", "success"));
    msgs.forEach(m => m.style.display = "none");
}

// Eventos de validação
document.getElementById("formCadastrar").addEventListener("input", () => {
    validarFormulario("formCadastrar", "btnSalvarCad");
});

document.getElementById("formEditar").addEventListener("input", () => {
    validarFormulario("formEditar", "btnSalvarEdit");
});

// ====== SALVAR CADASTRO ======
document.getElementById("formCadastrar").addEventListener("submit", e => {
    e.preventDefault();

    const novo = {
        id: empresas.length ? empresas[empresas.length - 1].id + 1 : 1,
        nome: document.getElementById("cadNome").value,
        cnpj: document.getElementById("cadCnpj").value,
        telefone: document.getElementById("cadTelefone").value,
        email: document.getElementById("cadEmail").value,
        status: document.getElementById("cadStatus").value
    };

    empresas.push(novo);
    carregarTabela();
    fecharModal("modalCadastrar");
});

// ====== SALVAR EDIÇÃO ======
document.getElementById("formEditar").addEventListener("submit", e => {
    e.preventDefault();

    const id = parseInt(document.getElementById("editId").value);

    empresas = empresas.map(e =>
        e.id === id
            ? {
                id,
                nome: document.getElementById("editNome").value,
                cnpj: document.getElementById("editCnpj").value,
                telefone: document.getElementById("editTelefone").value,
                email: document.getElementById("editEmail").value,
                status: document.getElementById("editStatus").value
            }
            : e
    );

    carregarTabela();
    fecharModal("modalEditar");
});

// Inicial
carregarTabela();
