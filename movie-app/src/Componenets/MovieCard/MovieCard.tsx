import React from "react";
import "./MovieCard.scss";
import { Movie } from "../MoviesContainer/types";

export const MovieCard = ({ movie, show }: { movie: Movie; show: boolean }) => {
  return (
    <img
      className={`movie-card ${!show && "film-gassed"}`}
      src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
    />
  );
};
