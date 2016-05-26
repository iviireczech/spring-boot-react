import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

import { getInfo } from '../../actions/info/info';

class Info extends Component {

    componentDidMount() {
        this.props.dispatch(getInfo());
    }

    render() {
        return (
            <div>
                <PageHeader>{this.props.data}</PageHeader>
            </div>
        );
    }
    
}

function mapStateToProps(state) {

    return {
        data: state.info.data
    }

}

export default connect(mapStateToProps)(Info)