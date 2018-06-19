import React from 'react';
import {Button} from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {FieldGroup} from '../../utils/util';
import {defaultActions} from "../../actions/defaultActions";
import {connect} from "react-redux";
import {homeActions} from "../../actions/homeActions";

const SignupComponent = (props) => {
    const onNewTextChange = props.onNewTextChange;
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

                <Button onClick={() =>
                    props.signup(props)
                } bsStyle="primary">Submit</Button>

            </form>
            <FormControl.Feedback/>
            <HelpBlock>{props.message}</HelpBlock>
        </FormGroup>
    );
};

const mapStateToProps = (state) => {
    const {
        username,
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
        message: state.homeReducer.signedupMessage
    }
};

mapDispatchToProps = (dispatch) => {
    return {
        onNewTextChange: (newTextChange) => {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        },
        signup: (props) => {
            dispatch(homeActions.signup(props))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
