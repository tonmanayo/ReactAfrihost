import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup} from '../../utils/util';
import { connect } from 'react-redux';
import { defaultActions } from '../../actions/defaultActions'
import {homeActions} from "../../actions/homeActions";

class LoginComponent extends Component {
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

                            <Button onClick={ () =>
                                this.props.loginVerify(this.props.username, this.props.password)
                            } bsStyle="primary"  >Submit</Button>

                                </form>
                        <FormControl.Feedback />
                        <HelpBlock > <p style={{color: "red"}}>{this.props.message} </p></HelpBlock>
                    </FormGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.defaultReducer.username,
        password: state.defaultReducer.password,
        message: state.homeReducer.loginMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        },
        loginVerify(username, password) {
            dispatch(homeActions.login(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
