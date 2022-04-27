import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import "../visibility-filter-input/visibility-filter-input.scss";

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search movies - insert movie title here"
        className='filter'
    />;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);