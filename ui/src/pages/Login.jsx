import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { BackgroundImage, Header } from "../components";
import { firebaseAuth } from "../config/firebase";
import { LoginContainer } from "../styles";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <LoginContainer>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formValues.password}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    [event.target.name]: event.target.value,
                  })
                }
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}
