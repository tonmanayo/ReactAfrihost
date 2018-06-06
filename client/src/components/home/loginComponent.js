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
            password:'',
            error: ''
       };
    }

    loginVerify() {
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
            .then((data) => {
                const userInfo = jwt_decode(data['token']);
                localStorage.setItem('user', JSON.stringify(userInfo['user']));
                localStorage.setItem('token', JSON.stringify(data['token']));
                localStorage.setItem('userId', JSON.stringify(data['userId']));
                this.props.isSignedIn();
            }).catch((error) => {
                this.setState({error: "Login Failed - " + error});
        })
    }

    handleTextChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        return (
                    <FormGroup controlId="formBasicText">
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
                        <HelpBlock > <p style={{color: "red"}}>{this.state.error} </p></HelpBlock>
                    </FormGroup>
        );
    }
}

export default LoginComponent;
