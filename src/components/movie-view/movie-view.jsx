import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor(props) {
        super(props);
        // Create state variables that will be used to add/remove a movie from a users Favorites list
        this.state = {
            FavouriteMovies: [],
            userDetails: [],
        }

        // to be called by onClick events to 'this'
        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
    }

    // get the user's details (for displaying whether this movie is in their favourite movis list)
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
    }

    // post movies to favourites array - add movies to favourites list 
    addFavourite() {
        let token = localStorage.getItem('token');
        axios.post(`https://macdon-myflix.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ isFavouriteNew: true });
                window.open(`/movies/${this.props.movie._id}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // remove movies from favourites list
    removeFavourite() {
        let token = localStorage.getItem('token');
        axios.delete(`https://macdon-myflix.herokuapp.com/users/${this.props.user.Username}/movies/${this.props.movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                this.setState({ isFavouriteNew: false });
                window.open(`/movies/${this.props.movie._id}`, '_self');
            })

            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        const { movie, user, onBackClick } = this.props;

        // This section of code sets a flag which will show a add/remove Favourites button depending on if the movie can be found in the users Favourites Array
        let tempArray = user.FavouriteMovies;
        let isFavouriteNew = false
        if (tempArray.includes(this.props.movie._id)) {
            isFavouriteNew = true;
        } else {
            isFavouriteNew = false;
        };

        return (
            <Card bg="secondary" text="light" border="light" >
                <Card.Body>
                    <Row>
                        <Col className='img-container' xs={12} sm={12} md={6} style={{ marginBottom: 20 }}>
                            <Card.Img
                                varient="top"
                                src={movie.ImagePath}
                                className="big_image"
                            />
                        </Col>
                        <Col className='details-container'>
                            <Card.Title>
                                {movie.Title}
                            </Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>

                            {/* check for genre, if stated(exists) parse, else skipped it */}
                            {movie.Genre.Name && (
                                <Card.Text className="genre_heading">
                                    <span className="genre_title">Genre: </span>
                                    <Link style={{ color: 'white' }} to={`/genre/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                                </Card.Text>
                            )}
                            {movie.Director.Name && (
                                <Card.Text className="director_heading">
                                    <span className="director_title">Director: </span>
                                    <Link style={{ color: 'white' }} to={`/director/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                                </Card.Text>
                            )}

                            <Button onClick={() => onBackClick(null)} variant="light">Back</Button>

                            {/* check favourite movies array, if movie is included show remove from favourites list if not show add to favourites list */}
                            {isFavouriteNew ? (
                                <Button className="ml-3" variant="dark" onClick={this.removeFavourite}>
                                    Remove from Favourites
                                </Button>
                            ) : (
                                <Button className="ml-3" variant="dark" onClick={this.addFavourite}>
                                    Add to Favourites
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card >
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
