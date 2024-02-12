import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";



export const ProfileView = ({ user, movies, token, setUser }) => {
  const [username, setUsername] = useState(user.Username); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };
    if(password) {
      data['Password'] = password
    }

    fetch(`${process.env.SERVER_CONNECTION_URL}/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Profile Update Successful");
        window.location.reload();
        return response.json(); 
      } else { 
        alert("Profile Update Failed");
      }
    }).then((data) => { 
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    })
  };

  const deleteProfile = () => {
    fetch(`${process.env.SERVER_CONNECTION_URL}/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your profile has been successfully deleted");
      } else {
        alert("Something went wrong, profile has not been deleted")
      }
    })
  };

  let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <>  
      <Form className="m-1" onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            plaintext
          />
        </Form.Group>
  
        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday.slice(0,10)}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        {favoriteMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={4}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      
      <Button className="mt-5 mb-5" variant="danger" onClick={deleteProfile}>
        Delete Your Account
      </Button>
    </>
  );
};
