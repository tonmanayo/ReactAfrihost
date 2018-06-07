import React, { Component } from 'react';
import LoginComponent from './loginComponent'
import SignupComponent from "./signupComponent";
import ProductsComponent from "../products/productsPage";
import {checkStatus, getFromStorage, parseJSON} from '../../utils/util'

function findUser(userId) {
    fetch('http://localhost:3001/auth/findUser/' + userId)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            console.log('request succeeded with JSON response', data);
            return true;
        }).catch(function(error) {
        console.log('request failed', error);
        return false
    })
}

class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isSignedIn: false,
        };
        this.isSignedIn = this.isSignedIn.bind(this)
    }

    componentDidMount() {
        const token = getFromStorage('userId');
        if (token) {
            if (findUser(token)){
                this.isSignedIn()
            }
        } else {
            this.setState({
                isSignedIn: false
            })
        }
    }

    isSignedIn() {
        this.setState({
            isSignedIn: true
        });
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <div style={{width: '100%', marginTop: '10px'}}>
                    <div style={{width: '45%', float: 'left'}}>
                        <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                            <LoginComponent isSignedIn={this.isSignedIn}/>
                        </div>
                    </div>
                    <div style={{width: '45%', float: 'right'}}>
                        <SignupComponent isSignedIn={this.isSignedIn}/>
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
