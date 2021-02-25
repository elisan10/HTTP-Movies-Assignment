import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialData = {
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

const UpdateMovieForm = (props) => {
  const [editMovie, setEditMovie] = useState(initialData);
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("This is res in update movie form", res);
        setEditMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;

    if (e.target.name === "metascore") {
      value = parseInt(value);
    }
    if (e.target.name === "stars") {
      value = [value];
    }
    console.log(value);
    setEditMovie({
      ...editMovie,
      [e.target.name]: value,
    });
  };

  //   const handleChanges = (e) => {
  //     const newValue =
  //       e.target.name === "metascore"
  //         ? parseInt(e.target.value)
  //         : e.target.name === "stars"
  //         ? [e.target.value]
  //         : e.target.value;

  //     setEditMovie({
  //       ...editMovie,
  //       [e.target.name]: newValue,
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, editMovie)
      .then((res) => {
        console.log({ res });
        // props.setMovieList(res.data);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };
  console.log("NewMovie", editMovie);
  return (
    <div className="form">
      <form className="movie-form" onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={editMovie.title}
            onChange={handleChanges}
          />
        </div>

        <div className="director">
          <label htmlFor="director">Director: </label>
          <input
            type="text"
            name="director"
            value={editMovie.director}
            onChange={handleChanges}
          />
        </div>

        <div className="metascore">
          <label htmlFor="metascore">Metascore: </label>
          <input
            type="number"
            name="metascore"
            value={editMovie.metascore}
            onChange={handleChanges}
          />
        </div>

        <div className="stars">
          <label htmlFor="stars">Stars: </label>
          <input
            type="text"
            name="stars"
            value={editMovie.stars}
            onChange={handleChanges}
          />
        </div>

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
