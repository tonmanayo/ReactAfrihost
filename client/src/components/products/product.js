import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import '../../table.css';

class ProductComponent extends Component {
    constructor(props, context) {
        super(props, context);
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
                        this.props.onDelete(product)
                    }} bsStyle="danger">X</Button></td>
                </tr>
        );
    }
}

export default ProductComponent;
