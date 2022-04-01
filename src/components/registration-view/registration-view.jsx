import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link, Router } from "react-router-dom";

export function RegistrationView(props) {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Birthdate, setBirthdate] = useState('');
    const [UsernameErr, setUsernameErr] = useState('');
    const [PasswordErr, setPasswordErr] = useState('');
    const [emailErr, setemailErr] = useState('');
    const [BirthdateErr, setBirthdateErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!Username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (Username.length < 6) {
            setUsernameErr('Username must be 6 characters long');
            isReq = false;
        }
        if (!Password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (Password.length < 8) {
            setPasswordErr('Password must be 8 characters long');
            isReq = false;
        }
        if (!email) {
            setemailErr('Please user valid email')
        } else if (email.indexOf('@') === -1) {
            setemailErr('Please user valid email')
            isReq = false;
        }
        if (!Birthdate) {
            setBirthdateErr('Please enter birthdate')
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            console.log(Username, Password);
            axios.post('https://macdon-myflix.herokuapp.com/users', {
                Username: Username,
                Password: Password,
                email: email,
                Birthdate: Birthdate
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self');// the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch(e => {
                    console.log('error registering this user')
                });
            //props.onLoggedIn(Username);
        }
    };

    return (
        <div className="registration-view">
            <Container fluid style={{ paddingTop: '0.75rem' }}>
                <Row>
                    <Col>
                        <CardGroup>
                            <Card bg="secondary" text="white" border="light">
                                <Card.Body>
                                    <Card.Title>Please register</Card.Title>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label> Username: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={Username}
                                                onChange={e => setUsername(e.target.value)}
                                                required
                                                placeholder="Enter a username" />
                                            {UsernameErr && <p>{UsernameErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={Password}
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                                minLength="8"
                                                placeholder="Your password must be at least 8 characters" />
                                            {PasswordErr && <p>{PasswordErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                placeholder="Enter your email" />
                                            {emailErr && <p>{emailErr}</p>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Birthdate:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={Birthdate}
                                                onChange={e => setBirthdate(e.target.value)}
                                                required
                                                placeholder="Enter your Birthdate" />
                                            {BirthdateErr && <p>{BirthdateErr}</p>}
                                        </Form.Group>
                                        <Button variant="light" style={{ color: "white" }} type="submit"
                                            onClick={handleSubmit}>
                                            Submit
                                        </Button>

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