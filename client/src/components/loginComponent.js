import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

function loginVerify(username, password) {
    fetch('http://localhost:3001/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })})
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            console.log('request succeeded with JSON response', data)
        }).catch(function(error) {
        console.log('request failed', error)
    })
}

class LoginComponent extends Component {
    constructor(props, context) {
        super(props, context);

       this.handleUsername = this.handleUsername.bind(this);
       this.handlePassword = this.handlePassword.bind(this);
       this.loginVerify = this.loginVerify.bind(this);
       this.state = {
            username: '',
            password:''
       };
    }

    loginVerify() {
        console.log(this.state);
        fetch('http://localhost:3001/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })})
            .then(checkStatus)
            .then(parseJSON)
            .then(function(data) {
                console.log('request succeeded with JSON response', data)
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }


    // getValidationState() {
    //     const length = this.state.password.length;
    //     if (length > 10) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }



    handleUsername(e) {
        this.setState({ username: e.target.value });
    }

    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="App">

                    <FormGroup
                        controlId="formBasicText"
                        //validationState={this.getValidationState()}
                    >
                        <ControlLabel>Enter User Name and Password</ControlLabel>
                        <form>
                            <FieldGroup
                                id="formControlsUsername"
                                type="text"
                                label="username"
                                placeholder="Enter Username"
                                value={this.state.username}
                                onChange={this.handleUsername}
                            />
                            <FieldGroup
                                id="formControlsText"
                                type="password"
                                label="Password"
                                value={this.state.password}
                                placeholder="Enter Password"
                                onChange={this.handlePassword}
                            />

                            <Button onClick={
                                this.loginVerify
                            } bsStyle="primary"  >Submit</Button>

                                </form>
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>

            </div>
        );
    }
}

export default LoginComponent;
