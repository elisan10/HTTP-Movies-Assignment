import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        setMovieList(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  console.log({ movieList });
  return (
    <>
      <SavedList list={savedList} />

      {/* <Route exact path="/">
        <MovieList movies={movieList} />
      </Route> */}
      <Route
        exact
        path="/"
        render={(props) => {
          return <MovieList {...props} movies={movieList} />;
        }}
      />

      <Route
        exact
        path="/movies/:id"
        render={(props) => {
          return (
            <Movie
              {...props}
              setMovieList={setMovieList}
              addToSavedList={addToSavedList}
            />
          );
        }}
      />
      <Route
        path="/update-movie/:id"
        render={(props) => {
          return <UpdateMovieForm {...props} setMovieList={setMovieList} />;
        }}
      />
    </>
  );
};

export default App;
