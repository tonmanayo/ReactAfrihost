import React from 'react';
import { Button } from 'react-bootstrap'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import { FieldGroup } from '../../utils/util';
import { defaultActions } from "../../actions/defaultActions";
import { connect } from "react-redux";
import { authApiCall } from "../../actions/homeActions";

const CreateProductComponent = (props) => {
    const logout = () => {
        localStorage.removeItem('token');
        props.logout()
    };
        const onNewTextChange = props.onNewTextChange;
        return (
            <div className="createProduct">
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Create New Product</ControlLabel>
                    <form onSubmit={
                        props.addProduct
                    }>
                        <FieldGroup
                            id="formControlsProductName"
                            type="text"
                            label="Product Name"
                            placeholder="Product Name"
                            name="uid"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsFriendlyName"
                            type="text"
                            label="Friendly Name"
                            placeholder="Friendly Name"
                            name="friendlyName"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsIsPaused"
                            type="text"
                            label="Is Paused?"
                            placeholder="Is Paused?"
                            name="isPaused"
                            onChange={onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsStatus"
                            type="text"
                            label="Status"
                            placeholder="Status"
                            name="status"
                            onChange={onNewTextChange}
                        />

                        <Button type="submit" bsStyle="success"  >Submit</Button>
                        <Button bsStyle="primary" style={{float: 'right'}} onClick={() => {logout()}} >Logout</Button>
                    </form>
                    <FormControl.Feedback />
                    <HelpBlock>{props.message}</HelpBlock>
                </FormGroup>
            </div>
        );
};

const mapStateToProps = (state) => {
    const {uid, friendlyName, isPaused, status} = state.defaultReducer;
    return {
        uid: uid,
        friendlyName: friendlyName,
        isPaused: isPaused,
        status: status,
        message: state.productReducer.errorMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewTextChange: (newTextChange) => {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        },
        logout: () => {
            dispatch(authApiCall.noUser())
        }
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(CreateProductComponent));
