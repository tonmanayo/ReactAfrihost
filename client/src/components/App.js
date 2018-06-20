import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import {homeActions} from "../actions/homeActions";
import {connect} from "react-redux";


class App extends Component {

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            console.log(jwt_decode(token));
            const user = jwt_decode(token)['user'];
            this.props.findUser(user)
        }
    }
  render() {
      if (this.props.loggedin === true) {
        return <div>
                <Redirect to='/products'/>
              </div>
      }
    return <div>
        <Redirect to='/'/>
    </div>
  }
}

const mapStateToProps = (state) => {
    return {
        loggedin: state.homeReducer.loggedin,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => {
            dispatch(homeActions.login(username, password))
        },
        findUser: (id) => {
            dispatch(homeActions.findUser(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
