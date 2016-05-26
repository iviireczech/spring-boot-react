import React from 'react';
import {FormGroup, Button} from 'react-bootstrap';

export default class SubmitButton extends React.Component {

    render() {
        
        const { ...other } = this.props;
        
        return (
            <FormGroup>
                <Button {...other}>
                    {this.props.children}
                </Button>
            </FormGroup>
        );
    }

}