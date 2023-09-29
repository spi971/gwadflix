const Favoris = require("../models/favorisModel");

module.exports.addToFavoris = async (req, res) => {
  try {
    const { email, data } = req.body;
    const favori = await Favoris.findOne({ email });

    if (favori) {
      const { movies } = favori;
      console.log(movies);
      const alreadyInList = movies.find(({ id }) => id === data.id);
      console.log(alreadyInList);
      if (!alreadyInList) {
        await Favoris.findByIdAndUpdate(
          favori._id,
          {
            movies: [...favori.movies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Already add to favoris list." });
    } else await Favoris.create({ email, movies: [data] });
    return res.json({ msg: "Movie successfully add to favoris list." });
  } catch (error) {
    return res.json({ msg: "Error, can't add to favoris list." });
  }
};

module.exports.getFavoris = async (req, res) => {
  try {
    const { email } = req.body;
    const favori = await Favoris.findOne({ email });
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
