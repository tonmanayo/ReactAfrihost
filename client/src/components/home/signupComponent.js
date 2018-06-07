import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';

class SignupComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleTextChanges = this.handleTextChanges.bind(this);
        this.signupVerify = this.signupVerify.bind(this);
        this.state = {
            username: '',
            password:'',
            cellNumber: '',
            faxNumber: '',
            firstName: '',
            lastName: '',
            idNumber: 0,
            telNumber: '',
            companyName: ''
        };
    }

    signupVerify() {
        fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                companyName: this.state.companyName,
                telNumber: this.state.telNumber,
                cellNumber: this.state.cellNumber,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                idNumber: this.state.idNumber,
                faxNumber: this.state.faxNumber,
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

    handleTextChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
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
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsPasswordS"
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            name="password"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsRePassword"
                            type="password"
                            label="rePassword"
                            placeholder="Re-Type Password"
                            name="rePassword"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsFirstName"
                            type="text"
                            label="First Name"
                            placeholder="First Name"
                            name="firstName"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsLastName"
                            type="text"
                            label="Last Name"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsCellNumber"
                            type="text"
                            label="Cell Number"
                            placeholder="Cell Number"
                            name="cellNumber"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsIdNumber"
                            type="number"
                            label="ID Number"
                            placeholder="ID Number"
                            name="idNumber"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsTelNumber"
                            type="text"
                            label="Tel Number"
                            placeholder="Tel Number"
                            name="telNumber"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsCompanyName"
                            type="text"
                            label="Company Name"
                            placeholder="Company Name"
                            name="companyName"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsFaxNumber"
                            type="text"
                            label="Fax Number"
                            placeholder="Fax Number"
                            name="faxNumber"
                            onChange={this.handleTextChanges}
                        />

                        <Button onClick={
                            this.signupVerify
                        } bsStyle="primary"  >Submit</Button>

                    </form>
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>

        );
    }
}

export default SignupComponent;
