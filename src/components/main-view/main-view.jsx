import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import '../main-view/main-view.scss';

//import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { Navbar } from '../navbar-view/navbar-view'

export class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            favouriteMovies: [],
        };
    }

    //https://macdon-myflix.herokuapp.com/movies //http://localhost:8080/movies
    getMovies(token) {
        axios.get('https://macdon-myflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
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

    getUser(username, token) {
        axios.get(`https://macdon-myflix.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    user: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        if (accessToken !== null) {

            this.getMovies(accessToken);
            this.getUser(username, accessToken);
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
        this.setState({
            user: authData.user
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


        return (
            <Router>
                <Container className='nav-container'>
                    <Navbar user={user} />
                </Container>
                <Container className="main-container">
                    <Row className="main-view" >
                        <Route exact path="/" render={() => {
                            if (!user) return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );

                            if (movies.length === 0) return <div className="main-view" />;

                            return movies.map(m => (
                                <Col className="justify-content-center" xs={12} sm={12} md={4} lg={3} key={m._id}>
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
                            return <Col >
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                    user={user}
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        }} />

                        <Route exact path="/director/:Name" render={({ match, history }) => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={12}>
                                <DirectorView
                                    director={movies.find((m) => m.Director.Name === match.params.Name).Director}
                                    onBackClick={() => history.goBack()}
                                    movies={movies.filter(movie => movie.Director.Name === match.params.name)}
                                />
                            </Col>
                        }
                        } />

                        <Route exact path="/genre/:Name" render={({ match, history }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={12}>
                                <GenreView
                                    genre={movies.find((m) => m.Genre.Name === match.params.Name).Genre}
                                    onBackClick={() => history.goBack()}
                                    movies={movies.filter(movie => movie.Genre.Name === match.params.name)}
                                />
                            </Col>
                        }
                        } />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col lg={12} md={12} xs={12} sm={12}>
                                <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/users/:Username" render={({ history }) => {
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
                    </Row>
                </Container>
            </Router >
        );
    }
}

