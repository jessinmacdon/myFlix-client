import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../movie-view/movie-view.scss';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container fluid className="movieViewContainer">
                <Row >
                    <Col>
                        <Card className="movie-view">
                            <Card.Body className="">
                                <Card.Img src={movie.ImagePath} crossOrigin="anonymous" className="movie-image mb-3 align-center ml-10 mr-10" />
                                <Card.Title className="movie-title">
                                    <span className="label">Title: </span>
                                    <span className="value">{movie.Title}</span>
                                </Card.Title>
                                <Card.Text className="movie-description">
                                    <span className="label">Description: </span><br />
                                    <span className="value">{movie.Description}</span>
                                </Card.Text>
                                <Card.Text className="movie-genre">
                                    <span className="label">Genre: </span>
                                    <span className="value">{movie.Genre.Name}</span>
                                </Card.Text>
                                <Card.Text className="movie-director">
                                    <span className="label">Director: </span>
                                    <span className="value">{movie.Director.Name}</span>
                                </Card.Text>
                                <Button variant="outline-success" onClick={() => { onBackClick(null); }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
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
            Birth: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};