import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class LoginComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);

        this.state = {
            username: '',
            password:''
        };
    }

    getValidationState() {
        const length = this.state.password.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    loginVerify() {
        //if (this.state.password)
    }

    handleUsername(e) {
        this.setState({ username: e.target.value });
    }

    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="App">
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Enter User Name and Password</ControlLabel>
                        <form>
                            <FieldGroup
                                id="formControlsUsername"
                                type="text"
                                label="username"
                                placeholder="Enter Username"
                                value={this.state.value}
                                onChange={this.handleUsername}
                            />
                            <FieldGroup
                                id="formControlsText"
                                type="password"
                                label="Password"
                                placeholder="Enter Password"
                                onChange={this.handlePassword}
                            />

                            <Button bsStyle="primary" type="submit" >Submit</Button>
                        </form>
                        <FormControl.Feedback />
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default LoginComponent;
