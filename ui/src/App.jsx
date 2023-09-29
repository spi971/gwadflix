import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Favoris, Gwadflix, Login, Movies, Player, Signup, TvShows } from "./pages";

export default function App() {
  // Define all the routes
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/signup' element={<Signup />}></Route>
        <Route exact path='/player' element={<Player />}></Route>
        <Route exact path='/movies' element={<Movies />}></Route>
        <Route exact path='/tv' element={<TvShows />}></Route>
        <Route exact path='/myList' element={<Favoris />}></Route>
        <Route exact path='/' element={<Gwadflix />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
