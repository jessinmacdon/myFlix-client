import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

//import statement showing we need bundle index.scss
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

//Retrieves root of the app
const container = document.getElementsByClassName('app-container')[0];

//React renders app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);