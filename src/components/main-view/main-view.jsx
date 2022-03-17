import React from 'react';

import axios from 'axios';

//import ReactDOM from 'react-dom';

import { LoginView } from '../login-view/login-view';

import { MovieCard } from '../movie-card/movie-card';

import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://macdon-myflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //updates selected movie state/property to show that particular movie
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    //signUp - user resgistration
    /*onRegistration(registration) {
        this.setState({
            registration,
        });
    }*/

    //if loggin is succesful, this function updates the user property in state to that of the particular user.
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0)
            return <div className="main-view" //>The list is empty!</div
            />;

        return (
            <div className="main-view">
                {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))}
            </div>
        );
    }
}