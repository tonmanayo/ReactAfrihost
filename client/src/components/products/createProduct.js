import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import { FieldGroup } from '../../utils/util';
import { defaultActions } from "../../actions/defaultActions";
import { connect } from "react-redux";

class CreateProductComponent extends Component {
    render() {
        const onNewTextChange = this.props.onNewTextChange;
        return (
            <div className="createProduct">
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Create New Product</ControlLabel>
                    <form onSubmit={
                        this.props.addProduct
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

                        <Button type="submit" bsStyle="primary"  >Submit</Button>
                    </form>
                    <FormControl.Feedback />
                    <HelpBlock>{this.props.message}</HelpBlock>
                </FormGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {uid, friendlyName, isPaused, status} = state.defaultReducer;
    return {
        uid: uid,
        friendlyName: friendlyName,
        isPaused: isPaused,
        status: status,
        message: state.productReducer.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductComponent);
