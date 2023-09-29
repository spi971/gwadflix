const mongoose = require("mongoose");

const favorisSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  movies: Array,
});

module.exports = mongoose.model("favoris", favorisSchema);
