import { createContext, useState } from "react";

import { MovieDetails } from "./Componenets/MovieDetails/MovieDetails";
import { MoviesContainer } from "./Componenets/MoviesContainer/MoviesContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import { Movie } from "./Componenets/MoviesContainer/types";

export const MovieContext = createContext({});
export const GuessedMovies = createContext({});

function App() {
  const [movie, setMovie] = useState<{ movie: Movie | undefined }>({
    movie: undefined,
  });
  const [movieGuessed, setMovieGuessed] = useState<string[]>([]);

  return (
    <MovieContext.Provider value={movie}>
      <GuessedMovies.Provider value={movieGuessed}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesContainer setMovie={setMovie} setMovieGuessed={setMovieGuessed} />} />
            <Route path="movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </GuessedMovies.Provider>
    </MovieContext.Provider>
  );
}

export default App;
