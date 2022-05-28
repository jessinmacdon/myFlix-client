import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER, ADD_FAVOURITEMOVIES, REMOVE_FAVOURITEMOVIES, SET_USER, SET_DIRECTOR, SET_GENRE } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        case SET_DIRECTOR:
            return action.value;
        case SET_GENRE:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = null, action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        case ADD_FAVOURITEMOVIES:
            return action.value;
        case REMOVE_FAVOURITEMOVIES:
            return action.value;
        default:
            return state;
    }
}


const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
});


export default moviesApp;