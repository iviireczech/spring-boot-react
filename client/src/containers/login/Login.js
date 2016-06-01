import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Grid, Row, Col, Alert,FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from './../../components/form/input/FormInput';
import SubmitButton from './../../components/form/button/SubmitButton';

import { loginUser } from '../../actions/login/login';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false
        };

        this.enableSubmitButton = this.enableSubmitButton.bind(this);
        this.disableSubmitButton = this.disableSubmitButton.bind(this);

    }

    enableSubmitButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmitButton() {
        this.setState({
            canSubmit: false
        });
    }

    render() {

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Formsy.Form
                            className="form-horizontal"
                            onValidSubmit={this.props.onSubmit}
                            onValid={this.enableSubmitButton}
                            onInvalid={this.disableSubmitButton}
                        >
                            <Row>
                                <Col md={3} mdOffset={4}>
                                    <FormInput
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        required
                                    />
                                    <FormInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <SubmitButton bsStyle="primary" block type="submit" disabled={!this.state.canSubmit}>
                                        Login
                                    </SubmitButton>
                                    {
                                        this.props.errorMessage
                                        &&
                                        <FormGroup>
                                            <Alert bsStyle="danger" className="text-center">
                                                {this.props.errorMessage}
                                            </Alert>
                                        </FormGroup>
                                    }
                                </Col>
                            </Row>
                        </Formsy.Form>
                    </Col>
                </Row>
            </Grid>
        )
    }

}

function mapStateToProps(state) {

    return {
        errorMessage: state.authentication.errorMessage
    }
    
}

function mapDispatchToProps(dispatch) {

    return {
        onSubmit: (data) => {
            const username = data.username.trim();
            const password = data.password.trim();
            const credentials = { username, password };
            dispatch(loginUser(credentials));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);