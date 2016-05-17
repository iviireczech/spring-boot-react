import React from 'react';
import {Grid, Col, Row, PageHeader} from 'react-bootstrap';

export default class Home extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <PageHeader>It works!</PageHeader>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
