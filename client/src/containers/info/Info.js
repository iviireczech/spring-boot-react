import React from 'react';
import { Grid, Col, Row, PageHeader, FormGroup, Alert } from 'react-bootstrap';

import { request } from '../../rest/api';

export default class Info extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: null,
            data: null
        };
    }

    componentDidMount() {
        request
            .get('/info')
            .then(data => {
                this.setState({
                    data: data
                })
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.errorMessage
                })
            });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        {
                            !this.state.errorMessage
                            &&
                            <PageHeader>{this.state.data}</PageHeader>
                        }
                        {
                            this.state.errorMessage
                            &&
                            <FormGroup>
                                <Alert bsStyle="danger" className="text-center">
                                    {this.state.errorMessage}
                                </Alert>
                            </FormGroup>
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
    
}