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
        this.signupVerify = this.signupVerify.bind(this);
        this.state = {
            companyName: '',
        };
    }

    signupVerify() {
        console.log(this.state);
        fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })})
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                this.props.onSignup(data);
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


        );
    }
}

export default ProductsComponent;
