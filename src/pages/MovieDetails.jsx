import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../api/movie";
import "../styles/MovieDetails.css"; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="movie-details" style={{ backgroundImage: `url(${movie.poster})` }}>
      <div className="overlay">
        <div className="movie-card">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-category">Category: {movie.category}</p>
          <p className="movie-rating">⭐ {movie.rating}/10</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
