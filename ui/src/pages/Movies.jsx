import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, NotAvailable, SelectGenre, Slider } from "../components";
import { firebaseAuth } from "../config/firebase";
import { fetchMovies, getGenres } from "../store";
import { MoviesContainer } from "../styles";

export function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.gwadflix.genresLoaded);
  const genres = useSelector((state) => state.gwadflix.genres);
  const movies = useSelector((state) => state.gwadflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <MoviesContainer>
      <div className='navbar'>
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className='data'>
        <SelectGenre genres={genres} type='movie' />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </MoviesContainer>
  );
}
