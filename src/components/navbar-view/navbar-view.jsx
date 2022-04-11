import React from 'react';


import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function Navbar(user) {
    console.log("USER", user)

    let Username = 'User';
    if (user.user !== null) {
        console.log(user)
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
        <Navbar bg="dark" variant="dark" className="navBar mb-4">
            <Container>
                <Navbar.Brand as={Link} to={"/"} style={{ margin: 10 }}>MyFlix</Navbar.Brand>
                {isAuth() && (
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/users/${Username}`} style={{ margin: 10 }}>{Username}</Nav.Link>
                        <Button variant="outline-primary" style={{ margin: 10 }} onClick={() => { onLoggedOut() }}>Logout</Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    )


}





