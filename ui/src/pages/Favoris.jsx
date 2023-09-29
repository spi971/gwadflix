import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Navbar, NotAvailable } from "../components";
import { firebaseAuth } from "../config/firebase";
import { getFavoris } from "../store";
import { FavorisContainer } from "../styles/pages/favoris";

export function Favoris() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const movies = useSelector((state) => state.gwadflix.movies);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoris({ userId }));
  }, [userId]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUserId(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return <FavorisContainer>
    <Navbar isScrolled={isScrolled}/>
    <div className="content flex column">
        <h1>My list</h1>
        <div className="grid flex">
            { movies ?
                movies.map((movie, index)=>{
                   return <Card movieData={movie} isLiked={true} index={index} key={movie.id}/>
                }): <NotAvailable />
            }
        </div>
    </div>
  </FavorisContainer>;
}
