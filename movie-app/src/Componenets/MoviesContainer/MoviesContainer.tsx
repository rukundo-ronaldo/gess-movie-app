import React, { useCallback, useContext, useEffect, useState } from "react";

import api from "../../api/movies";
import { Button, TextField } from "@mui/material";
import { FlexBox } from "../FlexBox/FlexBox";
import { MovieCard } from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";
import { Movie } from "./types";
import { GuessedMovies } from "../../App";

export const MoviesContainer = ({
  setMovie,
  setMovieGuessed,
}: {
  setMovie: (value: { movie: Movie | undefined }) => void;
  setMovieGuessed: (value: React.SetStateAction<string[]>) => void;
}) => {
  const [Movies, setMovies] = useState<Movie[]>();
  const [userInput, setUserInput] = useState<string>("");
  const gussedMovies = useContext(GuessedMovies) as string[];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const OnSbumit = useCallback(() => {
    setMovieGuessed((prev) => [...prev, userInput.toLowerCase()]);
    setUserInput("");
  }, [gussedMovies, userInput]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const { data } = await api.get(
          `/movie/popular?api_key=${"87f1ce98eae1bc6311a2320e306ba147"}`
        );

        setMovies(data.results);
      } catch (error) {}
    };
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          marginBottom: "50px",
          borderRadius: "50px",
        }}
      >
        <FlexBox>
          <TextField
            value={userInput}
            onChange={handleChange}
            label="Devinner un film"
            id="fullWidth"
            color="primary"
            style={{ backgroundColor: "white", width: "80%" }}
          />
          <Button
            onClick={OnSbumit}
            style={{ width: "20%", borderRadius: "50px" }}
            variant="contained"
          >
            Devinner
          </Button>
        </FlexBox>
      </div>

      <FlexBox justifyContent="space-between">
        {Movies &&
          Movies.map((movie: Movie) => {
            let showMovie = Boolean(
              gussedMovies.includes(movie.title.toLowerCase())
            );
            return (
              <div key={movie.id} onClick={() => setMovie({ movie: movie })}>
                <Link to={showMovie ? `movie/${movie.id}` : "/"} state={movie}>
                  <MovieCard movie={movie} show={showMovie} />
                </Link>
              </div>
            );
          })}
      </FlexBox>
      <Button onClick={() => setMovieGuessed([])} variant="contained">
        Recommencer
      </Button>
    </div>
  );
};
