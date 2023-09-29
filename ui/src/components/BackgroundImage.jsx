import React from "react";

import background from "../assets/login.jpg";
import { BackgroundImageContainer } from "../styles";

export function BackgroundImage() {
  return (
    <BackgroundImageContainer>
      <img src={background} alt="background" />
    </BackgroundImageContainer>
  );
}
