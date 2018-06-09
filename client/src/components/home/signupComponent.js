import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';
import {defaultActions} from "../../actions/defaultActions";
import {connect} from "react-redux";

class SignupComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.signupVerify = this.signupVerify.bind(this);
    }

    signupVerify() {
        fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                password: this.props.password,
                companyName: this.props.companyName,
                telNumber: this.props.telNumber,
                cellNumber: this.props.cellNumber,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                idNumber: this.props.idNumber,
                faxNumber: this.props.faxNumber,
            })})
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                this.props.isSignedIn();
                console.log('request succeeded with JSON response', data)
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }

    render() {
        const onNewTextChange = this.props.onNewTextChange;
        return (
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Signup an account</ControlLabel>
                    <form>
                        <FieldGroup
                            id="formControlsUsernameS"
                            type="text"
                            label="username"
                            placeholder="Enter Username"
                            name="username"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsPasswordS"
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsRePassword"
                            type="password"
                            label="rePassword"
                            placeholder="Re-Type Password"
                            name="rePassword"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsFirstName"
                            type="text"
                            label="First Name"
                            placeholder="First Name"
                            name="firstName"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsLastName"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsCellNumber"
                            type="text"
                            label="Cell Number"
                            placeholder="Cell Number"
                            name="cellNumber"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsIdNumber"
                            type="number"
                            label="ID Number"
                            placeholder="ID Number"
                            name="idNumber"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsTelNumber"
                            type="text"
                            label="Tel Number"
                            placeholder="Tel Number"
                            name="telNumber"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsCompanyName"
                            type="text"
                            label="Company Name"
                            placeholder="Company Name"
                            name="companyName"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsFaxNumber"
                            type="text"
                            label="Fax Number"
                            placeholder="Fax Number"
                            name="faxNumber"
                            onChange={onNewTextChange}
                        />

                        <Button onClick={
                            this.signupVerify
                        } bsStyle="primary"  >Submit</Button>

                    </form>
                    <FormControl.Feedback />
                    <HelpBlock>this.props.message</HelpBlock>
                </FormGroup>

        );
    }
}

function mapStateToProps(state) {
    const {username,
        password,
        cellNumber,
        faxNumber,
        firstName,
        lastName,
        idNumber,
        telNumber,
        companyName
    } = state.defaultReducer;
    return {
        username: username,
        password: password,
        cellNumber: cellNumber,
        faxNumber: faxNumber,
        firstName: firstName,
        lastName: lastName,
        idNumber: idNumber,
        telNumber: telNumber,
        companyName: companyName,
        message: state.homeReducer.message
}
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
