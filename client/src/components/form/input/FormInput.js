import React from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {HOC} from 'formsy-react';

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    showValidationState() {
        return (this.props.hasFeedback && !this.props.isPristine());
    }

    getValidationState() {
        return (this.props.hasFeedback && this.props.isValid()) ? 'success' : 'error';
    }

    render() {
        
        const { id, label, hasFeedback, ...other } = this.props;
        
        return (
            <FormGroup controlId={id} {...this.showValidationState() ? {validationState: this.getValidationState()} : {}}>
                {
                    label
                    &&
                    <ControlLabel>{label}</ControlLabel>
                }
                <FormControl
                    {...other}
                    onChange={(e) => this.props.setValue(e.target.value)}
                />
                {
                    hasFeedback
                    &&
                    <FormControl.Feedback />
                }
            </FormGroup>
        );
    }

}
export default HOC(Input);

Input.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    setValue: React.PropTypes.func,
    isPristine: React.PropTypes.func,
    isValid: React.PropTypes.func,
    hasFeedback: React.PropTypes.bool
};