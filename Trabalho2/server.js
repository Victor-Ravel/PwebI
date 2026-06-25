console.log("carregada v5");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Filme = require("./models/Filme");

const app = express();

app.use(express.json());

//mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("conectado");

    app.listen(3000, () => {
      console.log("rodando 3000");
    });
  })
  .catch((err) => {
    console.error("Erro", err);
  });


//buscar
app.get("/buscar/:nome", async (req, res) => {
  try {
    const resposta = await axios.get(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${req.params.nome}`
    );

    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


//listar filmes
app.get("/filmes", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


//salvar
app.post("/filmes", async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


//favoritar
app.put("/filmes/:id/favorito", async (req, res) => {
  try {
    console.log("Favoritar:", req.params.id);

    const filme = await Filme.findById(req.params.id);
    console.log("Filme encontrado:", filme);

    const atualizado = await Filme.findByIdAndUpdate(
      req.params.id,
      { favorito: !filme.favorito },
      { returnDocument: "after" }
    );

    console.log("Atualizado:", atualizado);

    res.json(atualizado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
});
//vermt
app.put("/filmes/:id/vermaistarde", async (req, res) => {
  try {
    console.log("Ver mais tarde:", req.params.id);

    const filme = await Filme.findById(req.params.id);
    console.log("Filme encontrado:", filme);

    const atualizado = await Filme.findByIdAndUpdate(
      req.params.id,
      { verMaisTarde: !filme.verMaisTarde },
      { returnDocument: "after" }
    );

    console.log("Atualizado:", atualizado);

    res.json(atualizado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
});

//nota
app.put("/filmes/:id/nota", async (req, res) => {
  try {

    const nota = Number(req.body.nota);

    const filmeAtualizado = await Filme.findByIdAndUpdate(
      req.params.id,
      { nota: nota },
      { returnDocument: "after" }
    );

    res.json(filmeAtualizado);

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
  }
});


//remover
app.delete("/filmes/:id", async (req, res) => {
  try {
    await Filme.findByIdAndDelete(req.params.id);

    res.json({
      mensagem: "Filme removido com sucesso"
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});
app.use(express.static("public"));
app.use(express.json());

app.get("/filme/:id", async (req, res) => {
  try {
    const resposta = await axios.get(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${req.params.id}&plot=full`
    );

    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});