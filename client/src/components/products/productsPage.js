import React, { Component } from 'react';
import CreateProductComponent from "./createProduct";
import ShowProductsComponent from "./showProducts";
import {checkStatus, parseJSON} from '../../utils/util';
import {connect} from "react-redux";
import {productActions} from "../../actions/productActions";


class ProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);

        //this.onDelete = this.onDelete.bind(this);
        //this.getProducts = this.getProducts.bind(this);
      //  this.onAdd = this.onAdd.bind(this);
        this.addProduct = this.addProduct.bind(this);

    }

    componentWillMount() {
       // this.getProducts();
        this.props.fetchData();
    }

    // getProducts() {
    //     fetch('http://localhost:3001/products/allPosts')
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .then((data) => {
    //             this.setState({
    //                 products: data["products"]
    //             })
    //         }).catch((error) => {
    //         console.log('request failed', error)
    //     })
    // }

    // onDelete(id) {
    //     const filter = this.state.products.filter(product => {
    //         return product._id !== id
    //     });
    //     this.setState({products: filter})
    // }

    // onAdd(friendlyName, isPaused, status, uid, _id){
    //     let products = this.state.products;
    //     products.push({
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //         friendlyName: friendlyName,
    //         isPaused: isPaused,
    //         status: status,
    //         _id: _id,
    //         uid: uid
    //     });
    //     this.setState({products: products})
    //
    // }

    addProduct(event) {
        event.preventDefault();
        this.props.onProductAdd(this.props.friendlyName, this.props.isPaused, this.props.status, this.props.uid);
    }

    render() {
        return (
            <div className="productsPage" style={{width: '100%'}}>
                <div style={{width: '45%', float: 'left'}}>
                    <CreateProductComponent
                       addProduct={this.addProduct}
                    />
                </div>
                <div style={{width: '45%', float: 'right'}}>
                    <ShowProductsComponent
                        onDelete={this.props.onProductDelete}
                        products={this.props.products}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        uid: state.defaultReducer.uid,
        friendlyName: state.defaultReducer.friendlyName,
        isPaused: state.defaultReducer.isPaused,
        status: state.defaultReducer.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData() {
            dispatch(productActions.itemsFetchData())
        },
        onProductAdd(friendlyName, isPaused, status, uid) {
            dispatch(productActions.itemsAddData(friendlyName, isPaused, status, uid))
        },
        onProductDelete(product) {
            dispatch(productActions.itemsRemoveData(product))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);

