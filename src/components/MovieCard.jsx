import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const MovieCard = ({ movie }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
        <p className="text-gray-400">{movie.category}</p>
        <motion.button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg w-full font-semibold tracking-wide transition-all duration-300 hover:bg-blue-600 focus:ring focus:ring-blue-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Watch Later
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MovieCard;
