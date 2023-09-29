import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../config/firebase";

import { BackgroundImage, Header } from "../components";
import { SignupContainer } from "../styles";

export function Signup() {
  const [showPassword, setPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });
  return (
    <SignupContainer showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart your
              submisson.
            </h6>
          </div>
          <div className="form">
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
            {showPassword && (
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
            )}
            {!showPassword && (
              <button onClick={() => setPassword(true)}>Get started</button>
            )}
          </div>
          <button onClick={handleSignUp}>Signup</button>
        </div>
      </div>
    </SignupContainer>
  );
}
