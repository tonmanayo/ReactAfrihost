import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './../table.css';


class ShowProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    removeProduct() {

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
                            if (!item.isPaused && this.props.products.length > 1) {
                                item.isPaused = "true"
                            } else if (this.props.products.length > 1) {
                                item.isPaused = "false"
                            }

                        return (
                            <tr key={i}>
                                <td>{item.uid}</td>
                                <td>{item.friendlyName}</td>
                                <td>{item.status}</td>
                                <td>{item.isPaused}</td>
                                <td><Button onClick={
                                    this.removeProduct
                                } bsStyle="danger"  >X</Button></td>
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
