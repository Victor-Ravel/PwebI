const mongoose = require("mongoose");

const FilmeSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    unique: true
  },
  titulo: String,
  ano: String,
  poster: String,

  favorito: {
    type: Boolean,
    default: false
  },

  verMaisTarde: {
    type: Boolean,
    default: false
  },

  nota: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Filme", FilmeSchema);