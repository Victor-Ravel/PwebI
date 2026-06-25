const API = "";

async function buscarFilmes() {
    const nome = document.getElementById("nomeFilme").value;

    const resposta = await fetch(`/buscar/${nome}`);
    const dados = await resposta.json();

    const div = document.getElementById("resultados");
    div.innerHTML = "";

    if (!dados.Search) {
        div.innerHTML = "<p>Nenhum filme encontrado.</p>";
        return;
    }

    dados.Search.forEach(filme => {
        div.innerHTML += `
            <div class="card">
                <img src="${filme.Poster}" alt="">
                <h3>${filme.Title}</h3>
                <p>${filme.Year}</p>

                <button onclick='salvarFilme(
                    "${filme.imdbID}",
                    "${filme.Title}",
                    "${filme.Year}",
                    "${filme.Poster}"
                )'>
                    Salvar
                </button>
            </div>
        `;
    });
}

async function salvarFilme(imdbID, titulo, ano, poster) {

    await fetch("/filmes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imdbID,
            titulo,
            ano,
            poster
        })
    });

    carregarFilmes();
}

async function carregarFilmes() {
    const resposta = await fetch("/filmes");
    const filmes = await resposta.json();

    renderizarBiblioteca(filmes);
}

async function favoritar(id) {
    await fetch(`/filmes/${id}/favorito`, {
        method: "PUT"
    });

    carregarFilmes();
}

async function verMaisTarde(id) {
    await fetch(`/filmes/${id}/vermaistarde`, {
        method: "PUT"
    });

    carregarFilmes();
}

async function darNota(id) {

    const nota = prompt("Digite uma nota de 0 a 10:");

    await fetch(`/filmes/${id}/nota`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nota
        })
    });

    carregarFilmes();
}

async function remover(id) {

    await fetch(`/filmes/${id}`, {
        method: "DELETE"
    });

    carregarFilmes();
}

carregarFilmes();

async function mostrarInicio() {
    const resposta = await fetch("/buscar/marvel");
    const dados = await resposta.json();

    exibirResultados(dados.Search || []);
}
function exibirResultados(lista) {

    const div = document.getElementById("resultados");
    div.innerHTML = "";

    lista.forEach(filme => {

        const titulo = filme.Title || filme.titulo;
        const ano = filme.Year || filme.ano;
        const poster = filme.Poster || filme.poster;
        const imdbID = filme.imdbID;

        div.innerHTML += `
            <div class="card">
                <img src="${poster}" alt="${titulo}">

                <h3>${titulo}</h3>

                <p>${ano}</p>

                ${
                    imdbID
                    ? `
                    <button onclick='salvarFilme(
                        "${imdbID}",
                        "${titulo.replace(/'/g, "\\'")}",
                        "${ano}",
                        "${poster}"
                    )'>
                        Salvar
                    </button>
                    `
                    : ""
                }
            </div>
        `;
    });
}
async function mostrarFavoritos() {

    const resposta = await fetch("/filmes");
    const filmes = await resposta.json();

    document.getElementById("resultados").innerHTML = "";

    renderizarBiblioteca(
        filmes.filter(f => f.favorito)
    );
}
async function mostrarVerMaisTarde() {

    const resposta = await fetch("/filmes");
    const filmes = await resposta.json();

    document.getElementById("resultados").innerHTML = "";

    renderizarBiblioteca(
        filmes.filter(f => f.verMaisTarde)
    );
}
async function mostrarInicio() {

    const resposta = await fetch("/buscar/batman");
    const dados = await resposta.json();

    exibirResultados(dados.Search || []);

    carregarFilmes();
}
function renderizarBiblioteca(filmes) {
    const div = document.getElementById("filmesSalvos");
    div.innerHTML = "";

    filmes.forEach(filme => {
        div.innerHTML += `
            <div class="card">
                <img src="${filme.poster}" alt="">

                <h3>${filme.titulo}</h3>
                <p>${filme.ano}</p>

                <p class="${filme.favorito ? 'favorito' : ''}">
                    ${filme.favorito ? '⭐ Favorito' : ''}
                </p>

                <p class="${filme.verMaisTarde ? 'verde' : ''}">
                    ${filme.verMaisTarde ? '🎬 Ver Mais Tarde' : ''}
                </p>

                <p>Nota: ${filme.nota}</p>

                <button onclick="favoritar('${filme._id}')">Favoritar</button>
                <button onclick="verMaisTarde('${filme._id}')">Ver Mais Tarde</button>
                <button onclick="darNota('${filme._id}')">Dar nota</button>
                <button onclick="remover('${filme._id}')">Excluir</button>
            </div>
        `;
    });
}