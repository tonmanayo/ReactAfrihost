import React, { Component } from 'react';
import LoginComponent from './loginComponent'
import SignupComponent from "./signupComponent";
import ProductsComponent from "../products/productsPage";
import { homeActions } from "../../actions/homeActions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode"


class Home extends Component {

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            console.log(jwt_decode(token));
            const user = jwt_decode(token)['user'];
            this.props.findUser(user)
        }
    }

    render() {
        if (this.props.loggedin === false) {
            return (
                <div style={{width: '100%', marginTop: '10px'}}>
                    <div style={{width: '45%', float: 'left'}}>
                        <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                            <LoginComponent />
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
        },
        findUser(id) {
            dispatch(homeActions.findUser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
