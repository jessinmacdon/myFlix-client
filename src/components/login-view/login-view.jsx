import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// SCSS Import
import "./login-view.scss";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //validation declarations 
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 6) {
            setUsernameErr('Username must be 6 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 8) {
            setPassword('Password must be 8 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
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
                    alert('Login failed!! This might be due to a worng username or password. Please check for imput and try again.');
                });
        }
    };

    return (
        <div className="login-view">
            <Container fluid style={{ padding: 'auto' }}>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card bg="secondary" text="light" border="light">
                                <Card.Body>
                                    <Card.Title>Welcome to MyFlix!</Card.Title>
                                    <Form>
                                        <Form.Group controlId="formUsername" className="mb-3 mt-2">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                            {usernameErr && <p>{usernameErr}</p>}
                                        </Form.Group>
                                        <Form.Group controlId="formPassword" className="mb-3">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                            {passwordErr && <p>{passwordErr}</p>}
                                        </Form.Group>
                                        <Button className="primary" type="submit" onClick={handleSubmit}>
                                            Login
                                        </Button>
                                        <Link to={`/register`}>
                                            <Button className="success ml-3" type="button">Sign Up</Button>
                                        </Link>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

