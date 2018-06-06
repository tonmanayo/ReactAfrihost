import React from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

export function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/>
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

export function parseJSON(response) {
    return response.json()
}

export function getFromStorage(key) {
    if (!key) {
        console.log("Error: no Key");
        return null
    }
    try {
        const valueStr = getFromStorage(key);
        if (valueStr) {
            return JSON.parse(valueStr)
        }
        return null
    } catch (err) {
        console.log(err);
        return null
    }
}
