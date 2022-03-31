import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container, Row, Col, Navbar, Nav, Button, NavbarToggle } from 'react-bootstrap';
import '../main-view/main-view.scss';

import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';

import { ProfileView } from '../profile-view/profile-view';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

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

    getMovies(token) {
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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    //signUp - user resgistration
    onRegistration(registration) {
        this.setState({
            registration,
        });
    }


    render() {
        const { movies, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return
        <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
        </Row>

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Navbar bg="danger" expand="lg" className="mb-4" fixed="top">
                    <Container fluid style={{ margin: 0 }}>
                        <Navbar.Brand className="ml-4">
                            <Link style={{ color: "white" }} to={'/'}>
                                myFlix
                            </Link>
                        </Navbar.Brand>
                        <NavbarToggle></NavbarToggle>
                        {user && (
                            <Navbar.Collapse className="justify-content-end">
                                <Link to={'/users/${user}'} className="mr-2">
                                    <Button variant="light" variant="dark"> Your Profile</Button>
                                </Link>
                                <Button onClick={() => this.onLoggedOut()} variant="dark">Logout</Button>
                            </Navbar.Collapse>
                        )}
                    </Container>
                </Navbar>
                <Row className="main-view justify-content-md-center">
                    <Routes>
                        <Route exact path="/" render={() => {
                            if (!user) return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );

                            if (movies.length === 0) return <div className="main-view" />;

                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ))
                        }} />

                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route path="/directors/:name" render={({ match, history }) => {

                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView Director={movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }
                        } />

                        <Route path="/genres/:name" render={({ match, history }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <GenreView Genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        }
                        } />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col lg={8} md={8}>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/users" render={({ history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (

                                <Col>
                                    <ProfileView
                                        user={this.state.user}
                                        movies={movies}
                                        onBackClick={() => history.goBack()} />
                                </Col>
                            )
                        }} />
                    </Routes>
                </Row>
            </Router >
        );
    }
}

