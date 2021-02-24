import React, { useState } from "react";

const intialData = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

const UpdateMovieForm = () => {
  const [movie, setMovie] = useState(intialData);

  const handleChanges = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form">
      <form className="movie-form">
        <div className="title">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChanges}
          />
        </div>

        <div className="director">
          <label htmlFor="director">Director: </label>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChanges}
          />
        </div>

        <div className="metascore">
          <label htmlFor="metascore">Metascore: </label>
          <input
            type="number"
            name="metascore"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </div>

        <div className="stars">
          <label htmlFor="stars">Stars: </label>
          <input
            type="text"
            name="stars"
            value={movie.stars}
            onChange={handleChanges}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
