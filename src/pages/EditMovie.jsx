import { useState } from "react";
import { updateMovie } from "../api/movie"; 

const EditMovie = ({ movie, onSave, onCancel }) => {
  const [updatedMovie, setUpdatedMovie] = useState({ ...movie });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateMovie(movie._id, updatedMovie);
      onSave(updatedMovie);
    } catch (error) {
      console.error("Error updating movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div  className="position-absolute  z-3 top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
      <div style={{width:"40%"}} className="bg-secondary p-4 rounded-3">
        <h3 className="text-white mb-4">Edit Movie</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Title</label>
            <input type="text" className="form-control bg-dark text-white" name="title" value={updatedMovie.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <input type="text" className="form-control bg-dark text-white" name="category" value={updatedMovie.category} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">discription</label>
            <input type="text" className="form-control bg-dark text-white" name="discription" value={updatedMovie.discription} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Rating</label>
            <input type="number" className="form-control bg-dark text-white" name="rating" value={updatedMovie.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Poster URL</label>
            <input type="text" className="form-control bg-dark text-white" name="poster" value={updatedMovie.poster} onChange={handleChange} required />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
