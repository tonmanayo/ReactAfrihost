import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './../table.css';

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

class ShowProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    removeProduct(id) {
        fetch('http://localhost:3001/products/delete/' + id)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                console.log('Successfully Removed Product');
                this.props.getProducts()
            }).catch(function (error) {
            console.log('request failed', error)
        })
    }

    render() {
        return (
            <div className="productList">
                <table className="customers">
                    <tbody>
                    <tr>
                        <th>Product Name</th>
                        <th>Friendly Name</th>
                        <th>Status</th>
                        <th>Paused?</th>
                        <th>Remove</th>
                    </tr>
                    {
                        this.props.products.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.uid}</td>
                                    <td>{item.friendlyName}</td>
                                    <td>{item.status}</td>
                                    <td>{item.isPaused === true ? "true" : "false"}</td>
                                    <td><Button onClick={() => {
                                        this.removeProduct(item._id)
                                    }} bsStyle="danger">X</Button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ShowProductsComponent;
