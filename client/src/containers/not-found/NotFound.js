import React from 'react';
import {Grid, Col, Row, PageHeader} from 'react-bootstrap';

export default class NotFound extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <PageHeader>Not Found</PageHeader>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
