import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { PageHeader, FormGroup, Alert } from 'react-bootstrap';

import { getInfo } from '../../actions/info/info';

class Info extends Component {

    componentDidMount() {
        this.props.dispatch(getInfo());
    }

    render() {
        return (
            <div>
                {
                    !this.props.errorMessage
                    &&
                    <PageHeader>{this.props.data}</PageHeader>
                }
                {
                    this.props.errorMessage
                    &&
                    <FormGroup>
                        <Alert bsStyle="danger" className="text-center">
                            {this.props.errorMessage}
                        </Alert>
                    </FormGroup>
                }
            </div>
        );
    }
    
}

function mapStateToProps(state) {

    return {
        data: state.info.data,
        errorMessage: state.info.errorMessage
    }

}

export default connect(mapStateToProps)(Info)