import React from 'react';

//import ReactDOM from 'react-dom';

import MovieCard from '../movie-card/movie-card';

import { MovieView } from '../movie-view/movie-view';

class MainVeiw extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: 'Inception',
                    Description: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved.',
                    Genre: 'Action/Adventure/Sci-Fi',
                    Director: 'Christopher Nolan',
                    ImagePath: '.....'
                },

                {
                    _id: 2,
                    Title: 'Transformers',
                    Description: 'High-school student Sam Witwicky buys his first car, who is actually the Autobot Bumblebee. Bumblebee defends Sam and his girlfriend Mikaela Banes from the Decepticon Barricade, before the other Autobots arrive on Earth',
                    Genre: 'Action/adventure/Sci-Fi',
                    Director: 'Michael Bay',
                    ImagePath: '......'
                },

                {
                    _id: 3,
                    Title: 'Gladiator',
                    Description: 'Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death.',
                    Genre: 'Action/Adventure/Drama',
                    Director: 'Ridley Scott',
                    ImagePath: '.....'
                }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0)
            return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))}
            </div>
        );
    }
}


export default MainVeiw;