import React, { useContext, useEffect, useState } from "react";

import { MovieContext } from "../../App";
import { FlexBox } from "../FlexBox/FlexBox";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import api from "../../api/movies";

import "./MovieDetails.scss";
import { useParams } from "react-router";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  Card,
  CardActions,
  Chip,
  Icon,
  Typography,
} from "@mui/material";
import { CastsContainer } from "./CastsContainer";
import { useNavigate } from "react-router-dom";
import { Movie } from "../MoviesContainer/types";


export const MovieDetails = () => {
  const [moviesDetails, setMovieDetails] = useState<MovieDetails | undefined>();
  const [movieCast, setMovieCasts] = useState<Casts | undefined>();
  const { id } = useParams();
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const { movie } = useContext(MovieContext) as { movie: Movie };

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const { data } = await api.get(
          `movie/${id}?api_key=${"87f1ce98eae1bc6311a2320e306ba147"}`
        );
        const { data: casts } = await api.get(
          `movie/${id}/casts?api_key=${"87f1ce98eae1bc6311a2320e306ba147"}`
        );

        setMovieDetails(data);
        setMovieCasts(casts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoviesDetails();
  }, [movie]);
  return (
    <>
      <Button onClick={goHome} variant="outlined">
        Devinner les autre film
      </Button>
      {moviesDetails && (
        <div>
          <h1>{moviesDetails.title}</h1>
          <h4>Nom original : {moviesDetails.original_title}</h4>
          <FlexBox>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${moviesDetails?.poster_path}`}
              />
            </div>
            <div style={{ width: "750px" }}>
              <CardContent style={{ textAlign: "left" }}>
                <p>Sortie : {moviesDetails.release_date}</p>
                <p>
                  Durée : {Math.trunc(moviesDetails.runtime / 60)}h{" "}
                  {moviesDetails.runtime % 60} min
                </p>

                <FlexBox>
                  Genres :
                  <FlexBox>
                    {moviesDetails.genres.map((genre) => (
                      <Chip
                        key={genre.id}
                        style={{ marginLeft: "5px" }}
                        label={genre.name}
                        color="primary"
                      />
                    ))}
                  </FlexBox>
                </FlexBox>

                <p>Resumer du film:</p>
                <p style={{ marginLeft: "20px" }}>{moviesDetails.overview}</p>

                <h3>Acteurs</h3>
                {movieCast && <CastsContainer casts={movieCast.cast} />}

                <h3>Crews </h3>
                {movieCast && <CastsContainer casts={movieCast.crew} />}
              </CardContent>
            </div>
          </FlexBox>
        </div>
      )}
    </>
  );
};
