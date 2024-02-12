import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
 
  return (
    <Link className="movie-card" to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card bg="secondary" style={{ cursor: "pointer" }} className="h-100">
        <Card.Img className="card-img" variant="top" src={movie.image} />
        <Card.Body className="text-center d-flex flex-column justify-content-between">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
            <Button className="button-text" variant="link">Open</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

//Here is where all of the MovieCard prop constraints are defined
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired
  }).isRequired,
};