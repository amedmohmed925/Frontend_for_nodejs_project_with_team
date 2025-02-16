import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎬 Movie App 🎥
      </motion.h1>

      {loading ? (
        <motion.div
          className="text-center text-lg animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          ⏳ Loading movies...
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              🚫 No movies found.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
