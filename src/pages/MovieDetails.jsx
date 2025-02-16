import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Movie Details - {id}</h2>
    </div>
  );
};

export default MovieDetails;
