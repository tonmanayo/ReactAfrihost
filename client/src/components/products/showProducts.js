import React, { Component } from 'react';
import '../../table.css';
import ProductComponent from "./product";

class ShowProductsComponent extends Component {
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
                        this.props.products.map((product, i) => {
                            return (
                                <ProductComponent
                                    key={i}
                                    product={product}
                                    onDelete={this.props.onDelete}
                                />
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
