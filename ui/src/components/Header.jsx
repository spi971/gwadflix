import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { HeaderContainer } from "../styles";

export function Header(props) {
  const navigate = useNavigate();
  return (
    <HeaderContainer className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Login" : "Signup"}
      </button>
    </HeaderContainer>
  );
}
