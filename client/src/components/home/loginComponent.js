import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import jwt_decode from 'jwt-decode';
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';
import { connect } from 'react-redux';
import { defaultActions } from '../../actions/defaultActions'
import {homeActions} from "../../actions/homeActions";

class LoginComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.loginVerify = this.loginVerify.bind(this);
    }

    loginVerify() {
        fetch('http://localhost:3001/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                password: this.props.password
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
                this.props.onError(error)
        })
    }

    render() {
        const onNewTextChange = this.props.onNewTextChange;
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
                                onChange={onNewTextChange}
                            />
                            <FieldGroup
                                id="formControlsPassword"
                                type="password"
                                label="Password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={onNewTextChange}
                            />

                            <Button onClick={
                                this.loginVerify
                            } bsStyle="primary"  >Submit</Button>

                                </form>
                        <FormControl.Feedback />
                        <HelpBlock > <p style={{color: "red"}}>{this.props.error} </p></HelpBlock>
                    </FormGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.defaultReducer.username,
        password: state.defaultReducer.password,
        error: state.homeReducer.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        },
        onError(newError) {
            dispatch(homeActions.handleNewError(newError))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
