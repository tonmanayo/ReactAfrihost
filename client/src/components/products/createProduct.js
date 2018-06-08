import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';
import {defaultActions} from "../../actions/defaultActions";
import {connect} from "react-redux";
import {productActions} from "../../actions/productActions";

class CreateProductComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(event) {
        event.preventDefault();
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
                this.props.onProductAdd(friendlyName, isPaused, status, uid, data["obj"]._id);
            }).catch((error) => {
            console.log('request failed', error)
        })
    }

    render() {
        const onNewTextChange = this.props.onNewTextChange;
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
                    {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
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
        products: state.productReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewTextChange(newTextChange) {
            dispatch(defaultActions.handleTextChanged(newTextChange))
        },
        onProductAdd(friendlyName, isPaused, status, uid, _id) {
            dispatch(productActions.addProduct(friendlyName, isPaused, status, uid, _id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductComponent);
