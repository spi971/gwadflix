import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import video from "../assets/Sing _Trailer_3.mp4";
import { PlayerContainer } from "../styles";

export function Player() {
  const navigate = useNavigate();

  return (
    <PlayerContainer>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </PlayerContainer>
  );
}
