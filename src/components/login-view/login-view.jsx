import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// SCSS Import
import "./login-view.scss";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //validation declarations 
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loginErr, setLoginErr] = useState('');


    const notify = (msg) => {
        toast(msg);
    }

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
                    // if (error.response) {
                    // setLoginErr(error.response.data);
                    setLoginErr('Login unsuccessful, please check you login credentials');
                    notify('Login unsuccessful, please check you login credentials and try again');
                    console.log('no such user')
                });
        }
    };

    return (
        <div className="login-view">
            <Container fluid style={{ padding: 'auto' }} className="xs{12} sm{12} md{3} lg{4}">
                <Row>
                    <Col>
                        <ToastContainer />
                        <CardGroup>
                            <Card bg="secondary" text="light" border="light">
                                <Card.Body>
                                    <Card.Title>Welcome to MyFlix!</Card.Title>
                                    <Form>
                                        <Form.Group controlId="formUsername" className="mb-3 mt-2">
                                            <Form.Label>Username:</Form.Label>
                                            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                                            {usernameErr && <p className='errmsg'>{usernameErr}</p>}
                                        </Form.Group>
                                        <Form.Group controlId="formPassword" className="mb-3">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                                            {passwordErr && <p className='errmsg'>{passwordErr}</p>}
                                        </Form.Group>
                                        <Button className="primary mb-3" type="submit" onClick={handleSubmit}>
                                            Login
                                        </Button>
                                        {loginErr && <p className='errmsg'>{loginErr}</p>}
                                    </Form>
                                    <Form.Text style={{ fontSize: 16 }}>You do not have an account yet?
                                        <Link to={`/register`}>
                                            <Button variant="link" className="signup-btn mt-6" type="Link" style={{ fontSize: 16, color: 'lightblue', padding: 0, marginLeft: 5 }}> Click here to Sign Up!</Button>
                                        </Link>
                                    </Form.Text>
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

