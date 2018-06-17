import React from 'react';
import {Button} from 'react-bootstrap';
import '../../table.css';

const ProductComponent = (props) => {
    const {product} = props;
    return (
        <tr key={product._id}>
            <td>{product.uid}</td>
            <td>{product.friendlyName}</td>
            <td>{product.status}</td>
            <td>{product.isPaused === true ? "true" : "false"}</td>
            <td><Button onClick={() => {
                props.onDelete(product)
            }} bsStyle="danger">X</Button></td>
        </tr>
    );

};

export default ProductComponent;
