import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import "./genre-view.scss";

import { Button, Card, Container, Row, Col } from 'react-bootstrap';






export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;

        return (
            <>
                <Card className='justify-content-center'>
                    <Card.Body>
                        <Card.Title>Genre Details</Card.Title>
                        <Row style={{ marginTop: 6 }}>
                            <Col med={4} className="genre-view text-black">
                                <div className="genre-name" />
                                <span className="label">Genre: </span>
                                <span className="value">{genre.Name}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 6 }}>
                            <Col med={4} className="genre-view text-black">
                                <div className="genre-description" />
                                <span className="label">Description: </span><br />
                                <span className="value">{genre.Description}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 6 }}>
                            <Col>

                                <Button onClick={() => { onBackClick(null); }} variant="danger">Back</Button>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};