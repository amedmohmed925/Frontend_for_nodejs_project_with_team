import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../api/movie"; 

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    category: "",
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
    try {
      await addMovie(movie);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "حدث خطأ أثناء إضافة الفيلم");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">إضافة فيلم جديد</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">عنوان الفيلم</label>
          <input type="text" className="form-control" name="title" value={movie.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">التصنيف</label>
          <input type="text" className="form-control" name="category" value={movie.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">التقييم</label>
          <input type="number" className="form-control" name="rating" value={movie.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
        </div>
        <div className="mb-3">
          <label className="form-label">رابط الصورة</label>
          <input type="text" className="form-control" name="poster" value={movie.poster} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">إضافة الفيلم</button>
      </form>
    </div>
  );
};

export default AddMovie;
