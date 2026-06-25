require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Filme = require("./models/Filme");

const app = express();

app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado");

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });


// ======================
// BUSCAR FILMES NA OMDb
// ======================
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


// ======================
// LISTAR FILMES SALVOS
// ======================
app.get("/filmes", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.json(filmes);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


// ======================
// SALVAR FILME
// ======================
app.post("/filmes", async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


// ======================
// FAVORITAR FILME
// ======================
app.put("/filmes/:id/favorito", async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);

    const atualizado = await Filme.findByIdAndUpdate(
      req.params.id,
      { favorito: !filme.favorito },
      { new: true }
    );

    res.json(atualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});
// ======================
// MARCAR PARA VER MAIS TARDE
// ======================
app.put("/filmes/:id/vermaistarde", async (req, res) => {
  try {
    const filme = await Filme.findById(req.params.id);

    const atualizado = await Filme.findByIdAndUpdate(
      req.params.id,
      { verMaisTarde: !filme.verMaisTarde },
      { new: true }
    );

    res.json(atualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// ======================
// DAR NOTA AO FILME
// ======================
app.put("/filmes/:id/nota", async (req, res) => {
  try {
    const filme = await Filme.findByIdAndUpdate(
      req.params.id,
      { nota: req.body.nota },
      { new: true }
    );

    res.json(filme);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});


// ======================
// REMOVER FILME
// ======================
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