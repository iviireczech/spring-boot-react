import React, { Component, PropTypes } from 'react';
import { Navbar as NavbarBootstrap, Nav, NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class Navbar extends Component {

    render() {
        return (
            <NavbarBootstrap inverse staticTop>
                <NavbarBootstrap.Header>
                    <NavbarBootstrap.Brand>
                        <LinkContainer to="/">
                            <a href="/">Spring Boot & React</a>
                        </LinkContainer>
                    </NavbarBootstrap.Brand>
                    <NavbarBootstrap.Toggle />
                </NavbarBootstrap.Header>
                <NavbarBootstrap.Collapse>
                    <Nav pullRight>
                        {
                            !this.props.isAuthenticated
                            &&
                            <LinkContainer to="login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                        }
                        {
                            this.props.isAuthenticated
                            &&
                            <LinkContainer to="/">
                                <NavItem onClick={this.props.logout}>Logout</NavItem>
                            </LinkContainer>
                        }
                    </Nav>
                </NavbarBootstrap.Collapse>
            </NavbarBootstrap>
        )
    }

}