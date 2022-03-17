import React, { useState } from 'react';
import propTypes from 'prop-types';

// Create LoginView as function component using Hooks
export function LoginView(props) {
    // Call useState method from React to initialize login variables with an empty value
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Sending request to server for authentication
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page
        console.log(username, password);

        /* Send a request to the server for authentication */
        /* then call this.props.onLoggedIn(username) */
        props.onLoggedIn(username);
    }

    // Return a login form where users can submit their username and password
    // Listening to changes on input and then updating the respective states

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="button">New? Register</button>
        </form>
    );

}

LoginView.propTypes = {
    onLoggedIn: propTypes.func.isRequired
};
