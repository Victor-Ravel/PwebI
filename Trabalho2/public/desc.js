const params = new URLSearchParams(window.location.search);
const imdbID = params.get("id");

async function carregarDesc() {

    const resposta = await fetch(`/filme/${imdbID}`);
    const filme = await resposta.json();

    document.getElementById("desc").innerHTML = `
        <div class="desc-card">

            <img src="${filme.Poster}" alt="${filme.Title}">

            <div class="info">

                <h1>${filme.Title}</h1>

                <p><strong>Lançamento:</strong> ${filme.Released}</p>

                <p><strong>Atores:</strong> ${filme.Actors}</p>

                <p><strong>Diretor:</strong> ${filme.Director}</p>

                <p><strong>Gênero:</strong> ${filme.Genre}</p>

                <p><strong>IMDb:</strong> ${filme.imdbRating}</p>

                <h3>Sinopse</h3>

                <p>${filme.Plot}</p>

                <button onclick="history.back()">
                    Voltar
                </button>

            </div>

        </div>
    `;
}

carregarDesc();