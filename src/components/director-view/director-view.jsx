import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Director Details</Card.Title>
                        <Row style={{ maginBottom: 5, marginTop: 5 }}>
                            <Col med={4} className="director-view text-black">
                                <div className="director-name" />
                                <span className="label">Director: </span>
                                <span className="value">{director.Name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col med={4} className="director-view text-black">
                                <div className="director-name" />
                                <span className="label">Bio: </span><br />
                                <span className="value">{director.Bio}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 6 }}>
                            <Col med={4} className="director-view text-black">
                                <div className="director-name" />
                                <span className="label">Birth: </span>
                                <span className="value">{director.Birth}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 5 }}>
                            <Col med={4} className="director-view text-black">
                                <div className="director-name" />
                                <span className="label">Death: </span>
                                <span className="value">{director.Death || "Alive"}</span>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col>

                                <Button onClick={() => { onBackClick(null); }} variant="danger" >Back</Button>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};