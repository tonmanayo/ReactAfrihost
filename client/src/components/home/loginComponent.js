import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';

class LoginComponent extends Component {
    constructor(props, context) {
        super(props, context);

       this.handleTextChange = this.handleTextChange.bind(this);
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
                const userInfo = jwt_decode(data['token']);
                localStorage.setItem('user', userInfo['user']);
                localStorage.setItem('token', data['userId']);
                localStorage.setItem('userId', data['token']);
                console.log('request succeeded with JSON response', data);
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

    handleTextChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        return (
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
                                name="username"
                                onChange={this.handleTextChange}
                            />
                            <FieldGroup
                                id="formControlsPassword"
                                type="password"
                                label="Password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={this.handleTextChange}
                            />

                            <Button onClick={
                                this.loginVerify
                            } bsStyle="primary"  >Submit</Button>

                                </form>
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
        );
    }
}

export default LoginComponent;
