import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
// { addToSavedList },
function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  console.log("This is props in Movie", props);

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
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const editMovie = () => {
    props.history.push(`api/update-movie/${params.id}`);
  };
  return (
    <div className="save-wrapper">
      <button onClick={editMovie}>Edit</button>
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
