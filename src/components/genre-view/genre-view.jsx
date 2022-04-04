import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

import "./genre-view.scss";



export class GenreView extends React.Component {
    render() {
        const { Genre, onBackClick, movies } = this.props;
        return (
            <>
                <Container>

                    <Card bg="secondary" text="light" border="light" align="center">
                        <Card.Body>
                            <Card.Title>Genre</Card.Title>
                            <div className="genre-name">
                                <span className="label">Name: </span>
                                <span className="value">{Genre.Name}</span>
                            </div>
                            <div className="genre-description">
                                <span className="label">Description: </span>
                                <span className="value">{Genre.Description}</span>
                            </div>
                            <Link to={'/'}>
                                <Button onClick={() => onBackClick(null)} variant="dark">Back</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <h1>Order movies in this Genre include: </h1>
                    <Row className="justify-content-md-center">
                        {props.movies.filter(m => m.Genre.Name === props.genre.Name).map(m => (
                            <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))}
                    </Row>

                </Container>
            </>
        )

    }


}
GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};