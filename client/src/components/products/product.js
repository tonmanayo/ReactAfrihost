import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import '../../table.css';

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

class ProductComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.removeProduct = this.removeProduct.bind(this);
    }

    removeProduct(id) {
        fetch('http://localhost:3001/products/delete/' + id)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                console.log('Successfully Removed Product');
                this.props.onDelete(id);
            }).catch(function (error) {
            console.log('request failed', error)
        })
    }

    render() {
        const { product } = this.props;
        return (
                <tr key={product._id}>
                    <td>{product.uid}</td>
                    <td>{product.friendlyName}</td>
                    <td>{product.status}</td>
                    <td>{product.isPaused === true ? "true" : "false"}</td>
                    <td><Button onClick={() => {
                        this.removeProduct(product._id)
                    }} bsStyle="danger">X</Button></td>
                </tr>
        );
    }
}

export default ProductComponent;
