import React from 'react';

import { MovieView } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

export function DirectorView(props) {

    return (
        <React.Fragment key={movie.id}>
            <Container>
                <Row>
                    <Button variant="outline-light" onClick={() => { props.onBackClick() }}>Back</Button>
                </Row>

                <Row>
                    <h1 className="display-4">{props.director.Name}</h1>
                </Row>
                <Row>
                    <span className="value">Birthday: {props.director.Birthday}</span>
                </Row>
                <Row>
                    <span className="value">{props.director.Bio}</span>
                </Row>
                <br />
                <Row>
                    <h4>Some movies from this director:</h4>
                </Row>
                {/* <Row className="justify-content-md-center">
                {props.movies.filter(m => m.Director.Name === props.director.Name).map(m => (
                    <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
                        <MovieView movie={m} />
                    </Col>
                ))}
            </Row>*/}

                <Link to={"/"}>
                    <Button variant="outline-light">Back</Button>
                </Link>
            </Container>
        </React.Fragment>
    )
}