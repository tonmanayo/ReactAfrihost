import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

class ProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleTextChanges = this.handleTextChanges.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.state = {
            uid: '',
            friendlyName: '',
            isPaused: '',
            status: ''
        };
    }

    addProduct() {
        console.log(this.state);
        fetch('http://localhost:3001/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                friendlyName: this.state.friendlyName,
                isPaused: this.state.isPaused,
                status: this.state.status,
                uid: this.state.uid

            })})
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                console.log('request succeeded with JSON response', data)
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }


    // getValidationState() {
    //     const length = this.state.password.length;
    //     if (length > 10) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }



    handleTextChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <FormGroup
                controlId="formBasicText"
                //validationState={this.getValidationState()}
            >
                <ControlLabel>Create New Product</ControlLabel>
                <form>
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

                    <Button onClick={
                        this.addProduct
                    } bsStyle="primary"  >Submit</Button>

                </form>
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>

        );
    }
}

export default ProductsComponent;
