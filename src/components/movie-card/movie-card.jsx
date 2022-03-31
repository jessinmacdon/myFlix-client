import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card id="movieCard">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text className="text-truncate">{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} className="movieCard-btn" variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
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
    onBackClick: PropTypes.func
};