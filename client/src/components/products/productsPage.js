import React, { Component } from 'react';
import CreateProductComponent from "./createProduct";
import ShowProductsComponent from "./showProducts";
import {checkStatus, parseJSON} from '../../utils/util';


class ProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            products: []
        };

        this.onDelete = this.onDelete.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount() {
        this.getProducts()
    }

    getProducts() {
        fetch('http://localhost:3001/products/allPosts')
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => {
                this.setState({
                    products: data["products"]
                })
            }).catch(function(error) {
            console.log('request failed', error)
        })
    }

    onDelete(id) {
        const filter = this.state.products.filter(product => {
            return product._id !== id
        });
        this.setState({products: filter})
    }

    onAdd(friendlyName, isPaused, status, uid, _id){
        let products = this.state.products;
        products.push({
            createdAt: Date.now(),
            updatedAt: Date.now(),
            friendlyName: friendlyName,
            isPaused: isPaused,
            status: status,
            _id: _id,
            uid: uid
        });
        this.setState({products: products})
    }

    render() {
        return (
            <div className="productsPage" style={{width: '100%'}}>
                <div style={{width: '45%', float: 'left'}}>
                    <CreateProductComponent
                        onAdd={this.onAdd}
                    />
                </div>
                <div style={{width: '45%', float: 'right'}}>
                    <ShowProductsComponent
                        onDelete={this.onDelete}
                        products={this.state.products}
                    />
                </div>
            </div>
        );
    }
}

export default ProductsComponent;
