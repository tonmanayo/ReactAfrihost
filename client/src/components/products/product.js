import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import '../../table.css';
import {checkStatus, parseJSON} from '../../utils/util';

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
