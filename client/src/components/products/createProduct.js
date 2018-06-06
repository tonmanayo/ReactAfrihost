import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'
import {FieldGroup, checkStatus, parseJSON} from '../../utils/util';

class CreateProductComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleTextChanges = this.handleTextChanges.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.state = {
            uid: '',
            friendlyName: '',
            isPaused: '',
            status: '',
        };
    }

    addProduct(e) {
        console.log(this.state);
        e.preventDefault();
        const {friendlyName, isPaused, status, uid} = this.state;
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

    handleTextChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsFriendlyName"
                            type="text"
                            label="Friendly Name"
                            placeholder="Friendly Name"
                            name="friendlyName"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsIsPaused"
                            type="text"
                            label="Is Paused?"
                            placeholder="Is Paused?"
                            name="isPaused"
                            onChange={this.handleTextChanges}
                        />
                        <FieldGroup
                            id="formControlsStatus"
                            type="text"
                            label="Status"
                            placeholder="Status"
                            name="status"
                            onChange={this.handleTextChanges}
                        />

                        <Button type="submit" bsStyle="primary"  >Submit</Button>
                    </form>
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
            </div>

        );
    }
}

export default CreateProductComponent;
