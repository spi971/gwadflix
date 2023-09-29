const Favoris = require("../models/favorisModel");

module.exports.addToFavoris = async (req, res) => {
  try {
    const { userId, data } = req.body;
    const favori = await Favoris.findOne({ userId: userId });

    if (favori) {
      const { movies } = favori;
      const alreadyInList = movies.find(({ id }) => id === data.id);
      if (!alreadyInList) {
        await Favoris.findByIdAndUpdate(
          favori._id,
          {
            movies: [...favori.movies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Already add to favoris list." });
    } else await Favoris.create({ userId: userId, movies: [data] });
    return res.json({ msg: "Movie successfully add to favoris list." });
  } catch (error) {
    return res.json({ msg: "Error, can't add to favoris list." });
  }
};

module.exports.getFavoris = async (req, res) => {
  try {
    const { userId } = req.params;
    const favori = await Favoris.findOne({ userId });
    if (favori) {
      return res.json({
        msg: "Fecth favoris list success.",
        movies: favori.movies,
      });
    } else {
      return res.json({ msg: "Your favoris list is empty." });
    }
  } catch (error) {
    return res.json({ msg: "Error, getting favoris list." });
  }
};

module.exports.removeFromFavoris = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const favori = await Favoris.findOne({ userId: userId });

    if (favori) {
      const movies = favori.movies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) res.status(400).send({ msg: "Movie not found." });

      movies.splice(movieIndex, 1);
      await Favoris.findByIdAndUpdate(
        favori._id,
        {
          movies,
        },
        { new: true }
      );
      return res.json({msg:"Movie is now removed from favoris.", movies});
    }
  } catch (error) {
    console.log(error)
    return res.json({ msg: "Error, removing movie from favoris list." });
  }
};
