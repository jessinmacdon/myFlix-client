import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, Col, Form, Row, Modal, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import '../profile-view/profile-view.scss';



export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            validated: false,
            Username: '',
            Password: '',
            email: '',
            Birthdate: '',
            FavoriteMovies: [],
            modalState: false
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUserDetails = this.deleteUserDetails.bind(this);
    }


    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        this.getUserDetails(accessToken);
    }

    getUserDetails(token) {
        axios.get('https://macdon-myflix.herokuapp.com/users/${this.props.user}', {
            headers: { Authorization: 'Bearer ${token}' }
        }).then(response => {
            this.setState({
                // Store the details in the appropriate state variables (separating the FavoriteMovies array for ease of use)
                userDetails: response.data,
                FavoriteMovies: response.data.FavoriteMovies
            });
        }).catch(function (error) {
            console.log(error);
        });
    };

    updateUserDetails(e) {
        const form = e.currentTarget.parentNode;
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        // Make use of Bootstraps built in validation, changing the state validated  to true to indicate that the form has undergone validation (not to indicate if it's passed validation or not)
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            e.preventDefault();
            this.setState({ validated: true });
            // If validation passed, then make a put request to the API, updating all the details on the form (which are now stored in the state variables thanks to the handleFieldChange function)
            axios.put('https://macdon-myflix.herokuapp.com/users/${user}', {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.email,
                Birthday: this.state.Birthdate
            }, {
                headers: { Authorization: 'Bearer ${token}' }
            }).then(response => {
                const data = response.data;
                // Update localStorage with the new username
                localStorage.setItem('user', data.Username);
                // Reload the page to make sure that the user can immediately start using their new details
                window.open('/users/${data.Username}', '_self');
            }).catch(error => {
                console.log('error updating user details')
            });
        }
    };
    handleFieldChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value })
    }

    // Function to show the modal that confirms you want to delete a user profile
    showModal() {
        this.setState({ modalState: true });
    }

    // Fuunction for closing the modal that confirms you want to delete a user profile
    closeModal() {
        this.setState({ modalState: false });
    }

    // Function for deleting user details. A delete request is made ot the API for this user
    deleteUserDetails() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete('https://macdon-myflix.herokuapp.com/users/${user}', {
            headers: { Authorization: 'Bearer ${token}' }
        }).then(response => {
            const data = response.data;
            alert(user + " has been deleted");
            // Remove the user details and auth token from localStorage, and send the user back to the login page (since they are now logged out)
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/', '_self');
        }).catch(error => {
            console.log('error deleting the user');
        })
    }

    // Render function to display items on the DOM
    render() {
        // Get the props that were passed into this view and store them in appropriate variables
        const { movies, onBackClick } = this.props;
        let tempArray = this.state.FavoriteMovies;
        // Get an empty array which will store all of the movie objects which match the Favorites list
        let FavoriteMoviesArray = [];
        // Filter the movies array (obtained from props) and only save those movies which match ID's from the list of the users Favorites
        FavoriteMoviesArray = movies.filter(movie => tempArray.includes(movie._id));

        return (
            <div className="profile_view">
                {/* Modal specifications which will display when attempting to delete a user */}
                <Modal show={this.state.modalState} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete your user profile?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Once a user profile has been deleted, there is no way to restore it. Are you sure you wish to continue?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={this.deleteUserDetails}>
                            Delete Profile
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Card for displaying current user details */}
                <Card bg="secondary" text="light" border="light">
                    <Card.Body>
                        <Card.Title className="text-center">Profile of {this.state.userDetails.Username}</Card.Title>
                        <Card.Text><span className="profile_heading">Email: </span>{this.state.userDetails.email}</Card.Text>
                        {/* Only display birthday section if a user has filled that out (since it's the only optional section) */}
                        {this.state.userDetails.Birthdate && (
                            <Card.Text><span className="profile_heading">Date of Birth: </span>{Intl.DateTimeFormat().format(new Date(this.state.userDetails.Birthdate))}</Card.Text>
                        )}
                    </Card.Body>
                </Card>
                {/* Card for displaying the form which will be used to update user details */}
                <Card bg="secondary" text="light" border="light">
                    <Card.Body>
                        <Card.Title className="text-center">Update Profile Details</Card.Title>
                        {/* noValidate prevents default HTML5 validation. validated is then used as part of Bootstraps validation process */}
                        <Form noValidate validated={this.state.validated}>
                            <Form.Group controlId="updateFormUsername">
                                <Form.Label>Username:</Form.Label>
                                {/* When the input is changed, call handleFieldChange to update the state variables as required */}
                                <Form.Control name="Username" type="text" onChange={this.handleFieldChange} required />
                                {/* Validation message which will only display on failed validation */}
                                <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateFormPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="Password" type="password" onChange={this.handleFieldChange} required />
                                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateFormEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleFieldChange} required />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="updateDateOfBirth">
                                <Form.Label>Date of Birth:</Form.Label>
                                <Form.Control name="Birthdate" type="date" onChange={this.handleFieldChange} />
                            </Form.Group>

                            {/* Button for updating the details which will call updateUserDetails (defined above) */}
                            <Button variant="light" style={{ color: "white" }} type="submit" onClick={this.updateUserDetails}>
                                Update Details
                            </Button>
                            {/* Button to go back to the previous view */}
                            <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "white" }}>Back</Button>
                            {/* Button for deleting the user. This will first open the Modal defined above */}
                            <Button className="float-right" variant="light" style={{ color: "white" }} onClick={this.showModal}>
                                Delete User Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {/* Section for Favorites */}
                <Card bg="secondary" text="light" border="light" align="center" style={{ color: "white" }}>
                    <Card.Title>{this.state.userDetails.Username}'s Favorites:</Card.Title>
                    <Row>
                        {/* Iterate over the FavoriteMoviesArray and create a MovieCard component for each one */}
                        {/* At this stage, I don't have a way to remove a Favorite movie from the ProfileView page. It must be done from the MovieView page, although I will likely change this in the future */}
                        {FavoriteMoviesArray.map(movie => (
                            <Col md={4} key={movie._id} className="my-2">
                                <MovieCard movie={movie} />
                            </Col>))}
                    </Row>
                </Card>
            </div>
        );
    }
}

// Set the PropTypes for the ProfileView
ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            ImagePath: PropTypes.string,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string,
                Description: PropTypes.string
            }),
            Director: PropTypes.shape({
                Name: PropTypes.string,
                Bio: PropTypes.string,
                Birthyear: PropTypes.string,
                Deathyear: PropTypes.string
            }),
        })
    ),
    onBackClick: PropTypes.func.isRequired
};