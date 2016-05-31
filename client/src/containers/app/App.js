import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Grid, Col, Row} from 'react-bootstrap';

import Navbar from '../../components/navbar/Navbar';

import {logoutUser} from './../../actions/logout/logout';

import './App.scss'

class App extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
            // login
            const location = this.props.location;
            const redirect = location.state && location.state.nextPathname;
            this.props.redirect(redirect || '/info');
        } else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
            // logout
            this.props.redirect('/');
        }
    }

    render() {
        
        return (
            <div>
                <Navbar
                    isAuthenticated={this.props.isAuthenticated}
                    logout={this.props.logout}
                />
                <Grid>
                    <Row>
                        <Col md={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node
};

function mapStateToProps(state) {

    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
    
}

function mapDispatchToProps(dispatch) {

    return {
        redirect: (location) => dispatch(push(location)),
        logout: () => dispatch(logoutUser())
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
