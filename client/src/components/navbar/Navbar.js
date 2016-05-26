import React, { Component, PropTypes } from 'react';
import { Navbar as NavbarBootstrap, Nav, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class Navbar extends Component {

    render() {
        return (
            <NavbarBootstrap>
                <NavbarBootstrap.Header>
                    <NavbarBootstrap.Brand>
                        <LinkContainer to="/">
                            <a href="/">Spring & React</a>
                        </LinkContainer>
                    </NavbarBootstrap.Brand>
                </NavbarBootstrap.Header>
                <Nav pullRight>
                    {
                        !this.props.isAuthenticated
                        &&
                        <LinkContainer to="login">
                            <NavbarBootstrap.Form>
                                <Button bsStyle="primary" type="submit">Login</Button>
                            </NavbarBootstrap.Form>
                        </LinkContainer>
                    }
                    {
                        this.props.isAuthenticated
                        &&
                        <LinkContainer to="/">
                            <NavbarBootstrap.Form>
                                <Button bsStyle="primary" type="submit" onClick={this.props.logout}>Logout</Button>
                            </NavbarBootstrap.Form>
                        </LinkContainer>
                    }
                </Nav>
            </NavbarBootstrap>
        )
    }

}