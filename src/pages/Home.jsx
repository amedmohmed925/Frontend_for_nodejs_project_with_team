import { useEffect, useState } from "react";
import { getMovies } from "../api/movie"; 
import MovieCard from "../components/MovieCard";
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = (title) => {
    setMovies(movies.filter((movie) => movie.title !== title)); // تحديث القائمة بعد الحذف
  };

  const handleEdit = (id, updatedData) => {
    setMovies(movies.map((movie) => (movie._id === id ? { ...movie, ...updatedData } : movie))); // تحديث القائمة بعد التعديل
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <h1 className="text-center display-4 fw-bold mb-4">
        🎬 Movie App 🎥
      </h1>

      {loading ? (
        <div className="text-center fs-5">
          ⏳ Loading movies...
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={movie._id} className="col">
                <MovieCard
                  movie={movie}
                  index={index}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-12 text-muted">
              🚫 No movies found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;