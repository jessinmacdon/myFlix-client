import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import "./registration-view.scss"

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [registerErr, setRegisterErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at least 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at least 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Please enter a email address');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Please enter a valid email address');
        }
        return isReq;
    }

    const notify = (msg) => {
        toast(msg);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();

        if (isReq) {
            axios.post('https://macdon-myflix.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email
            })
                .then(response => {
                    const data = response.data;
                    notify('Registration successful, You will be redirected to the homepage');
                    window.open('/', '_self');
                })
                .catch(response => {
                    setRegisterErr('Your chosen username already. Please insert a new username or logIn');
                });
        }
    };

    return (
        <Container fluid style={{ padding: 'auto', margin: 'auto' }} className="justify-cotent-center xs{12} sm{12} md{12} lg{12}">
            <Row>
                <Col>
                    <ToastContainer />
                    <CardGroup>
                        <Card bg="secondary" text="white" border="light">
                            <Card.Body>
                                <Card.Title>Create an account</Card.Title>
                                <Form noValidate >
                                    <Form.Group className="mb-3">
                                        <Form.Label> Username: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Enter a username" />
                                        {usernameErr && <p className='errmsg'>{usernameErr}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            minLength="8"
                                            placeholder="Your password must be at least 8 characters" />
                                        {passwordErr && <p className='errmsg'>{passwordErr}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your email" />
                                        {emailErr && <p className='errmsg'>{emailErr}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Birthdate:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            required
                                            placeholder="Enter your Birthdate" />
                                    </Form.Group>
                                    <Button className="primary"
                                        type="submit"
                                        onClick={handleSubmit}>
                                        Sign Up
                                    </Button>
                                </Form>
                                {registerErr && <p className='errmsg'>{registerErr}</p>}
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func,
};