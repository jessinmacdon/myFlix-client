import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m =>
            m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
        );
    }

    if (!movies) return <div className="main-view" />;

    return (
        <>
            <Container>
                <Row>
                    <Col md={12} style={{ marginTop: 0, marginBottom: 10 }}>
                        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                    </Col>
                    {filteredMovies.map((m) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={m._id}>
                            <MovieCard movie={m} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default connect(mapStateToProps)(MoviesList);