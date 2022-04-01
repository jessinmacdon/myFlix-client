import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup, FormGroup } from 'react-bootstrap';
import '../login-view/login-view.scss';
import axios from 'axios';


// Create LoginView as function component using Hooks
export function LoginView(props) {
    // Call useState method from React to initialize login variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Sending request to server for authentication
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page
        console.log(username, password);

        /* Send a request to the server for authentication */
        /* then call this.props.onLoggedIn(username) */
        axios.post('https://macdon-myflix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    // Return a login form where users can submit their username and password
    // Listening to changes on input and then updating the respective states

    return (
        <Container id="login-container" fluid>
            <Row>
                <Col>
                    <CardGroup>
                        <Card id="loginCard" style={{ marginTop: 100, marginBottom: 50, width: 50 }}>
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Form>
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
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="Password" />
                                    </FormGroup>
                                    <Button className="ml-3" id="login-btn" type="submit" onClick={handleSubmit} variant="outline-success">
                                        Login
                                    </Button>
                                    <Button className="ml-3" type="button" variant="outline-secondary">
                                        Create Account
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container >
    );

}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

