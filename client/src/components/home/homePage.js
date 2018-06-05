import React, { Component } from 'react';
import LoginComponent from './loginComponent'
import SignupComponent from "./signupComponent";
import ProductsComponent from "../products/productsPage";


class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            token: '',
            name: '',
        };
        this.handleTextChanges = this.handleTextChanges.bind(this)
    }
    state = {token: ''};

    handleTextChanges(e) {
        this.setState({token: e['token']});
    }

    render() {
        if (this.state.token !== '') {
            return (
                <div style={{width: '100%'}}>
                    <div style={{width: '45%', float: 'left'}}>
                        <LoginComponent onSignin={this.handleTextChanges}/>
                    </div>
                    <div style={{width: '45%', float: 'right'}}>
                        <SignupComponent onSignup={this.handleTextChanges}/>
                    </div>
                </div>

            );
        } else {
            return (
                <ProductsComponent/>
            );
        }
    }
}

export default Home;
