const mongoose = require("mongoose");

const favorisSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  movies: Array,
});

module.exports = mongoose.model("favoris", favorisSchema);
