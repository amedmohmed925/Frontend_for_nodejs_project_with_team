import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import EditMovie from "./EditMovie";
import { updateMovie } from "../api/movie"; 

import "bootstrap/dist/css/bootstrap.min.css";

const MovieCard = ({ movie, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/movie/${movie.title}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(movie.title);
      setShowDeleteModal(false);
      alert(`تم حذف الفيلم "${movie.title}" بنجاح ✅`);
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("حدث خطأ أثناء حذف الفيلم ❌");
    }
  };

  const handleSave = async (updatedData) => {
    try {
      await updateMovie(movie._id, updatedData);
      onEdit(movie._id, updatedData);
      setIsEditing(false);
      alert(`تم تعديل الفيلم "${updatedData.title}" بنجاح ✅`);
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("حدث خطأ أثناء تعديل الفيلم ❌");
    }
  };

  return (
    <>
      <motion.div
        className="card bg-dark text-white h-100 position-relative border border-secondary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="img-fluid rounded-top w-100"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between">
          <h5 className="card-title text-truncate">{movie.title}</h5>
          <p className="card-text">Category: {movie.category}</p>

          </div>
          <div className="d-flex align-items-center">
            <span className="mx-1">{movie.rating}</span>
            <div className="mb-2">
              {[...Array(Math.round(movie.rating || 0))].map((_, i) => (
                <FaStar key={i} className="text-warning" />
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div>
              <FaEdit
                className="text-primary me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditing(true)}
              />
              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDeleteModal(true)}
              />
            </div>
            <button className="btn btn-warning">Watch Later</button>
          </div>
        </div>
      </motion.div>

      {isEditing && (
        <EditMovie
          movie={movie}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

{showDeleteModal && (
  <div
    className="modal fade show d-flex align-items-center justify-content-center"
    tabIndex="-1"
    style={{
      background: "rgba(0, 0, 0, 0.7)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1050,
    }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content bg-dark text-white border border-secondary">
        <div className="modal-header">
          <h5 className="modal-title text-danger">Confirm Delete</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowDeleteModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <p>Are You sure to Delete It "{movie.title}"؟</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default MovieCard;
