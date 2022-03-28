import React, { useState } from 'react';

import PropTypes from "prop-types";

import '../registration-view/registration-view.scss';
import { Form } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Sends request to the server for authentication */

        props.onRegistration(username);
    };

    return (
        <Container id="login-container" fluid>
            <Row>
                <Col>
                    <CardGroup>
                        <Card id="registratioCard" className="mt-4 mb-3">
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Form>
                                    <FormGroup className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={Email}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Email Address" />
                                    </FormGroup>
                                    <FormGroup className="mb-3" controlId="formGroupUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Username" />
                                    </FormGroup>
                                    <FormGroup className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Text>Your password must be atleast 8 characters long.</Form.Text>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Password"
                                            minLength="8"
                                        />
                                    </FormGroup>
                                    <div>
                                        <Button className="ml-3" type="button" variant="outline-secondary">
                                            Create Account
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container >
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
}; 