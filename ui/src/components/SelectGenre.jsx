import React from "react";
import { useDispatch } from "react-redux";
import { fetchMoviesByGenre } from "../store";
import { Select } from "../styles";

export function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();

  return (
    <Select onChange={(evt) => {
        dispatch(fetchMoviesByGenre({ genre: evt.target.value,type: type }));
    }}>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}
