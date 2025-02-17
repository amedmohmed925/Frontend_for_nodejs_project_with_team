import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    category: "",
    discription:"",
    rating: "",
    poster: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/movie/addMovie", movie, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Movie added:", response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding the movie");
    }
  };

  return (
    <div className="container h-100 mt-5 bg-dark text-white p-4 rounded-3">
      <h2 className="mb-4">Add a New Movie</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Movie Title</label>
          <input
            type="text"
            className="form-control bg-secondary text-white"
            name="title"
            value={movie.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control bg-secondary text-white"
            name="category"
            value={movie.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discription</label>
          <input
            type="text"
            className="form-control bg-secondary text-white"
            name="discription"
            value={movie.discription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            className="form-control bg-secondary text-white"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Poster URL</label>
          <input
            type="text"
            className="form-control bg-secondary text-white"
            name="poster"
            value={movie.poster}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;