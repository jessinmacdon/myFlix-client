import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Form, Button, Card, CardGroup, Containter, Col, Row, Container, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        // Create state variables that will be used to add/remove a movie from a users Favorites list
        this.state = {
            FavouriteMovies: [],
            userDetails: []
        }

        // to be called by onClick events to 'this'
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    // get the user's details (for displaying whether this movie is in their favourite movis list)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    // get user details from the server
    getUserDetails(token) {
        axios.get(`https://macdon-myflix.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Use the response to set the user details in the state variables
            this.setState({
                userDetails: response.data,
                FavouriteMovies: response.data.FavouriteMovies
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    // post movies to favourites array - add movies to favourites list 
    addFavorite() {
        let token = localStorage.getItem('token');
        axios.post(`https://macdon-myflix.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            this.setState({ isFavourite: true });
            window.open(`/movies/${this.props.movie._id}`, '_self');
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    // remove movies from favourites list
    removeFavorite() {
        let token = localStorage.getItem('token');
        axios.delete(`https://macdon-myflix.herokuapp.com/${this.props.user}/movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ isFavourite: false });
                window.open(`/movies/${this.props.movie._id}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { movie, onBackClick } = this.props;

        // This section of code sets a flag which will show a add/remove Favorites button depending on if the movie can be found in the users Favorites
        let tempArray = this.state.FavouriteMovies;
        let isFavoriteNew = false
        if (tempArray.includes(this.props.movie._id)) {
            isFavoriteNew = true;
        } else {
            isFavoriteNew = false;
        };

        return (
            <Card bg="secondary" text="light" border="light">
                <Card.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <Card.Img
                                varient="top"
                                src={movie.ImagePath}
                                className="big_image"
                            />
                        </Col>
                        <Col xs={12} md={6}>
                            <Card.Title className="text-center">{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>

                            {/* check for genre, if stated(exists) parse, else skipped it */}
                            {movie.Genre.Name && (
                                <Card.Text className="genre_heading">
                                    <span className="genre_title">Genre:</span>
                                    <Link style={{ color: "white" }} to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                                </Card.Text>
                            )}
                            {movie.Director.Name && (
                                <Card.Text className="director_heading">
                                    <span className="director_title">Director:</span>
                                    <Link style={{ color: "white" }} to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                                </Card.Text>
                            )}
                            <Button onClick={() => onBackClick(null)} variant="dark">Back</Button>

                            {/* check favourite movies array, if movie is included show remove from favourites list if not show add to favourites list */}
                            {isFavoriteNew ? (
                                <Button className="float-right" variant="dark" onClick={this.removeFavorite}>
                                    Remove from Favorites
                                </Button>
                            ) : (
                                <Button className="float-right" variant="dark" onClick={this.addFavorite}>
                                    Add to Favorites
                                </Button>
                            )}

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birthyear: PropTypes.string,
            Deathyear: PropTypes.string
        }),
        Featured: PropTypes.bool,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};