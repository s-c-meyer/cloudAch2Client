import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter).trim().toLowerCase(); //.trim() removes white space from the search
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(filter));

  return (
    <>
      <Row className="m-3">
        <MoviesFilter />
      </Row>
      <Row className="m-3">
        {movies.length === 0 ? (
          <Col>The list of movies is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" lg={3} md={4} sm={6} key={movie.id}> 
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};