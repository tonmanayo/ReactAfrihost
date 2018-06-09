import React, { Component } from 'react';
import CreateProductComponent from "./createProduct";
import ShowProductsComponent from "./showProducts";
import {connect} from "react-redux";
import {productActions} from "../../actions/productActions";


class ProductsComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.addProduct = this.addProduct.bind(this);
    }

    componentWillMount() {
        this.props.fetchData();
    }

    addProduct(event) {
        event.preventDefault();
        this.props.onProductAdd(this.props.friendlyName, this.props.isPaused, this.props.status, this.props.uid);
    }
    render() {
        return (
            <div className="productsPage" style={{width: '100%', marginTop: '10px'}}>
                <div style={{width: '45%', float: 'left', marginLeft: '20px'}}>
                    <CreateProductComponent
                       addProduct={this.addProduct}
                    />
                </div>
                <div style={{width: '45%', float: 'right', marginRight: '20px', marginTop: '20px'}}>
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

