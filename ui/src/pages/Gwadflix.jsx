import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import MovieLogo from "../assets/Sing_logo.png";
import BackgroundImage from "../assets/sing.jpg";
import { Navbar, Slider } from "../components";
import { firebaseAuth } from "../config/firebase";
import { fetchMovies, getGenres } from "../store";
import { GwadflixContainer } from "../styles";

export function Gwadflix() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.gwadflix.genresLoaded);
  const movies = useSelector((state) => state.gwadflix.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <GwadflixContainer>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img
          src={BackgroundImage}
          alt='background'
          className='background-image'
        />
        <div className='container'>
          <div className='logo'>
            <img src={MovieLogo} alt='Movie logo' />
          </div>
          <div className='buttons flex'>
            <button
              className='flex j-center a-center'
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </GwadflixContainer>
  );
}
