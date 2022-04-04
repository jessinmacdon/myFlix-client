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
            Email: '',
            Birthday: '',
            FavouriteMovies: [],
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
        axios.get(`https://macdon-myflix.herokuapp.com/users/${this.props.user}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            console.log(response.data)
            this.setState({
                userDetails: response.data,
                FavouriteMovies: response.data.FavouriteMovies
            });
        }).catch(function (error) {
            console.log(error);
        });
    };

    updateUserDetails(e) {
        const form = e.currentTarget.parentNode;
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        } else {
            e.preventDefault();
            this.setState({ validated: true });

            axios.put(`https://macdon-myflix.herokuapp.com/users/${user}`, {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            }, {
                headers: { Authorization: `Bearer ${token}` }
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

    // modal for confirming profile delete 
    showModal() {
        this.setState({ modalState: true });
    }

    closeModal() {
        this.setState({ modalState: false });
    }

    // delete account
    deleteUserDetails() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        axios.delete(`https://macdon-myflix.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            const data = response.data;
            alert(user + " has been deleted");
            // Remove the user details and auth token from localStorage, reroute to login page
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
        let tempArray = this.state.FavouriteMovies;
        // Get an empty array which will store all of the movie objects which match the Favorites list
        let FavouriteMoviesArray = [];
        // Filter the movies array (obtained from props) and only save those movies which match ID's from the list of the users Favorites
        FavouriteMoviesArray = movies.filter(movie => tempArray.includes(movie._id));
        console.log("TEMP", FavouriteMoviesArray)

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
                <Card bg="info" text="light" border="light" style={{ marginTop: 10, marginBottom: 10 }}>
                    <Card.Body>
                        <Card.Title className="text-center">Profile details</Card.Title>
                        <Card.Text >Username: {this.state.userDetails.Username}</Card.Text>
                        <Card.Text className="profile_heading">Email: {this.state.userDetails.Email}</Card.Text>
                        <Card.Text className="profile_heading">Date of Birth: {this.state.userDetails.Birthday}</Card.Text>
                    </Card.Body>
                </Card>
                {/* Card for displaying the form which will be used to update user details */}
                <Card bg="secondary" text="light" border="light">
                    <Card.Body>
                        <Card.Title className="text-center">Update Profile Details</Card.Title>
                        {/* validated is then used as part of Bootstraps validation process */}
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
                            <Button bg="success" type="submit" onClick={this.updateUserDetails} style={{ margin: 10, marginLeft: 0 }}>
                                Update details
                            </Button>
                            {/* Button to go back to the previous view */}
                            <Button onClick={() => onBackClick(null)} variant="dark" style={{ margin: 10 }}>Back</Button>
                            {/* Button for deleting the user. This will first open the Modal defined above */}
                            <Button className="float-right" variant="danger" style={{ margin: 10, marginRight: 0 }} onClick={this.showModal}>
                                Delete Account
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {/* Section for Favorites */}
                <Card bg="secondary" text="light" border="light" align="center">
                    <Card.Title className='mt-3'>Your Favourite Movies ({this.state.userDetails.Username}):</Card.Title>
                    <Row style={{ margin: 10 }}>
                        {/* Iterate over the FavoriteMoviesArray and create a MovieCard component for each one */}

                        {FavouriteMoviesArray.map(movie => (
                            <Col md={4} key={movie._id} className="my-2" >
                                <MovieCard movie={movie} />
                            </Col>))}
                    </Row>
                </Card>
            </div>
        );
    }
}

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