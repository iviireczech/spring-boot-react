import React from 'react';
import { Grid, Col, Row, PageHeader, FormGroup, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import InfoService from '../../data/info/InfoService';

class Info extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: null,
            data: null
        };
    }

    componentDidMount() {
        this.props.getInfo()
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
            <Loader loaded={this.props.pendingTasks === 0}>
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
            </Loader>
        );
    }
    
}

function mapDispatchToProps(dispatch) {

    return {
        getInfo: () => {
            return new InfoService(dispatch).getInfo();
        }
    }
    
}

function mapStateToProps(state) {

    return {
        pendingTasks: state.pendingTasks
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Info);