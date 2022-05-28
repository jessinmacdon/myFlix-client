export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVOURITEMOVIES = 'ADD_FAVOURITEMOVIES';
export const REMOVE_FAVOURITEMOVIES = 'REMOVE_FAVOURITEMOVIES';
export const SET_DIRECTOR = 'SET_DIRECTOR';
export const SET_GENRE = 'SET_GENRE';

export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USER,
        value
    };
}

export function addFavouriteMovies(value) {
    return {
        types: ADD_FAVOURITEMOVIES,
        value
    }
}

export function removeFavouriteMovies(value) {
    return {
        types: REMOVE_FAVOURITEMOVIES,
        value
    }
}

export function setDirector(value) {
    return {
        types: SET_DIRECTOR,
        value
    }
}

export function setGenre(value) {
    return {
        types: SET_GENRE,
        value
    }
}