import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import "./movie-view.scss"
import { useSelector } from "react-redux";

export const MovieView = ({ user, token, setUser }) => {
  const movies = useSelector((state) => state.movies.list); 
  const { movieId } = useParams(); 

  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    window.scrollTo(0,0); 
  }, []);

  function favoriteMovie() {
    fetch(`${process.env.SERVER_CONNECTION_URL}/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfuly added to favs")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
        console.log('This movie is favorited: ' + isFavorite);
      }
    });
  };

  const unfavoriteMovie = () => {
    fetch(`${process.env.SERVER_CONNECTION_URL}/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else { 
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfully removed from favs!")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
        console.log(isFavorite);
      }
    });
  };

  return (
    <>
      <div className="col-lg-7 col-sm-12">
        <img className="rounded-5" src={movie.image} />
      </div>
      <div className="col-lg-5 col-sm-12 d-flex flex-column align-items-center">
      <div className="mb-4">
        <span style={{ fontWeight: 'bold', fontSize: 56 }}>{movie.title}</span>
      </div>
      <div className="mb-4">
        <span style={{ fontSize: 18}}>{movie.description}</span>
      </div>
      <div className="mb-3">
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div className="mb-3">
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div className="mb-3">
        <span style={{ fontWeight: 'bold' }}>Runtime: </span>
        <span>{movie.runtime}</span>
      </div>
      <Link className="mb-4" to={`/`}>
        <Button className="back-button">Back to Home</Button>
      </Link>
      {isFavorite ? (
        <Button className="fav-button" onClick={unfavoriteMovie}>
          Unfavorite
        </Button>
      ) : (
        <Button className="fav-button" onClick={favoriteMovie}>
          Favorite
        </Button>
      )}
      </div>
    </>
  );
};