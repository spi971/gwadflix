import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import video from "../assets/Sing _Trailer_3.mp4";
import { firebaseAuth } from "../config/firebase";
import { CardContainer } from "../styles";

export const Card = React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/favoris/add";

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToFavoris = async () => {
    try {
      await axios.post(API_URL, { email, data: movieData });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt='movie'
      />
      {isHovered && (
        <div className='hover'>
          <div className='image-video-container'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt='movie'
              onClick={() => navigate("/player")}
            />
            <video
              onClick={() => navigate("/player")}
              src={video}
              autoPlay
              loop
              controls
              muted
            />
          </div>
          <div className='info-container flex column'>
            <h3 className='name' onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className='icons flex j-between'>
              <div className='controls flex'>
                <IoPlayCircleSharp
                  title='play'
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title='Like' />
                <RiThumbDownFill title='Dislike' />
                {isLiked ? (
                  <BsCheck title='Remove from list' />
                ) : (
                  <AiOutlinePlus
                    title='Add to my list'
                    onClick={addToFavoris}
                  />
                )}
              </div>
              <div className='info'>
                <BiChevronDown title='More info' />
              </div>
            </div>
            <div className='genres flex'>
              <ul className='flex'>
                {movieData.genre.map((genre) => {
                  return <li key={genre}>{genre}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
});
