import React from 'react';

import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function Navbar(user) {

    let Username = 'User';
    if (user.user !== null) {
        Username = user.user.Username;
    }

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" className="fixed-top">
                <Container>
                    <Navbar.Brand as={Link} to={"/"} style={{ textDecoration: "none" }}>MYFLIX APP</Navbar.Brand>
                    {isAuth() && (
                        <Nav className="me-auto">
                            <Button variant="success" as={Link} to={`/users/${Username}`} style={{ marginRight: 10, textDecoration: "none" }}>{Username}</Button>
                            <Button className='logout-btn' variant="secondary" size='sm' onClick={() => { onLoggedOut() }}>Logout</Button>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    )
}





