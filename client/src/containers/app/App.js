import React from 'react';
import { connect } from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';

import Navbar from '../../components/navbar/Navbar';

import {logoutUser} from './../../actions/logout/logout';

import './App.scss'

class App extends React.Component {
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
        logout: () => dispatch(logoutUser())
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
