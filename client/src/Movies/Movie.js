import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
// { addToSavedList },
function Movie(props) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  // console.log("This is movie in Movie", movie);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const editMovie = () => {
    props.history.push(`/update-movie/${id}`);
  };
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button onClick={editMovie} className="edit-btn">
        Edit
      </button>
      <button onClick={deleteMovie} className="delete-btn">
        Delete
      </button>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
