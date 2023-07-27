import { createContext, useState } from 'react';

import { MovieDetails } from './Componenets/MovieDetails/MovieDetails';
import { MoviesContainer } from './Componenets/MoviesContainer/MoviesContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss'
import { Movie } from './Componenets/MoviesContainer/types';

export const MovieContext = createContext({})

function App() {
  const [movie, setMovie] = useState<{movie:Movie | undefined}>({movie: undefined})

  return (
    <MovieContext.Provider value={movie} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MoviesContainer setMovie={setMovie} />}/>
          <Route path='movie/:id' element={<MovieDetails />}/>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  )
}

export default App
