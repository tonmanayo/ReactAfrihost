import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';
import {actions} from "../../actions/home";
import {connect} from "react-redux";

class CreateProductComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(e) {
        e.preventDefault();
        const {friendlyName, isPaused, status, uid} = this.props;
        fetch('http://localhost:3001/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friendlyName: friendlyName,
                isPaused: isPaused,
                status: status,
                uid: uid
            })})
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                console.log('request succeeded with JSON response', data);
                this.props.onAdd(friendlyName, isPaused, status, uid, data["obj"]._id);
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }

    render() {
        return (
            <div className="createProduct">
                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>Create New Product</ControlLabel>
                    <form onSubmit={
                        this.addProduct
                    }>
                        <FieldGroup
                            id="formControlsProductName"
                            type="text"
                            label="Product Name"
                            placeholder="Product Name"
                            name="uid"
                            onChange={this.props.onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsFriendlyName"
                            type="text"
                            label="Friendly Name"
                            placeholder="Friendly Name"
                            name="friendlyName"
                            onChange={this.props.onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsIsPaused"
                            type="text"
                            label="Is Paused?"
                            placeholder="Is Paused?"
                            name="isPaused"
                            onChange={this.props.onNewTextChange}
                        />
                        <FieldGroup
                            id="formControlsStatus"
                            type="text"
                            label="Status"
                            placeholder="Status"
                            name="status"
                            onChange={this.props.onNewTextChange}
                        />

                        <Button type="submit" bsStyle="primary"  >Submit</Button>
                    </form>
                    <FormControl.Feedback />
                    {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
                </FormGroup>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.uid,
        friendlyName: state.friendlyName,
        isPaused: state.isPaused,
        status: state.status,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(actions.handleTextChanged(newTextChange))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductComponent);
