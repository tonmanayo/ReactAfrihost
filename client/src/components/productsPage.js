import React, { Component } from 'react';
import CreateProductComponent from "./createProduct";
import ShowProductsComponent from "./showProducts";

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

        this.state = {
            products: ["No Products"]
        };
        this.getProducts = this.getProducts.bind(this);
        this.getProducts();
    }

    getProducts() {
        fetch('http://localhost:3001/products/allPosts')
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                this.setState({products: data["products"]});
                console.log(this.state.products)
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }

    render() {
        return (
            <div className="productsPage" style={{width: '100%'}}>
                <div style={{width: '45%', float: 'left'}}>
                    <CreateProductComponent getProducts={this.getProducts}/>
                </div>
                <div style={{width: '45%', float: 'right'}}>
                    <ShowProductsComponent products={this.state.products}/>
                </div>
            </div>


        );
    }
}

export default ProductsComponent;
