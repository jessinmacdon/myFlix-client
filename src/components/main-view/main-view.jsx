import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import '../main-view/main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://macdon-myflix.herokuapp.com/movies') //https://macdon-myflix.herokuapp.com/movies //http://localhost:8080/movies
            .then(response => {
                headers: { Authorization: 'Bearer ${token}' }
            })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', autData.user.Username);
        this.getMovies(authData.token);
    }

    //signUp - user resgistration
    onRegistration(registration) {
        this.setState({
            registration,
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Container fluid style={{ padding: 0 }}>
                <Navbar id="navbar" fixed="top" bg="danger" expand="lg" collapseOnSelect>
                    <Container id="navbar-container">
                        <Navbar.Brand id="navbar-brand" href="#">MYFLIX</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav id="nav" className="me-auto">
                                <Nav.Link id="nav-link" href="#home">Movies</Nav.Link>
                                <Nav.Link id="nav-link" href="#pricing">TV Series</Nav.Link>
                                <Nav.Link id="nav-link" href="#features">Favourites</Nav.Link>
                                <Nav.Link id="nav-link" href="#pricing">Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row className="main-view xs={auto}" style={{ marginTop: 60, marginButton: 30 }}>
                    {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                    {selectedMovie
                        ? (
                            <Col md={12} sm={12} xs={12} lg={12}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col md={6} sm={12} lg={3} xs={{ span: 12 }}>
                                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                            </Col>
                        ))
                    }
                </Row>
            </Container >
        );
    }

}
