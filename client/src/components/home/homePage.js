import React, { Component } from 'react';
import LoginComponent from './loginComponent'
import SignupComponent from "./signupComponent";
import ProductsComponent from "../products/productsPage";
import {checkStatus, parseJSON} from '../../utils/util'
import {homeActions} from "../../actions/homeActions";
import {connect} from "react-redux";


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
    }

    componentDidMount() {
        // const token = getFromStorage('userId');
        // if (token) {
        //     if (findUser(token)){
        //         this.isSignedIn()
        //     }
        // } else {
        //     this.setState({
        //         isSignedIn: false
        //     })
        // }
    }

    render() {
        if (!this.props.loggedin) {
            return (
                <div style={{width: '100%', marginTop: '10px'}}>
                    <div style={{width: '45%', float: 'left'}}>
                        <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                            <LoginComponent/>
                        </div>
                    </div>
                    <div style={{width: '45%', float: 'right'}}>
                        <SignupComponent />
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

function mapStateToProps(state) {
    return {
        loggedin: state.homeReducer.loggedin,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login(username, password) {
            dispatch(homeActions.login(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
