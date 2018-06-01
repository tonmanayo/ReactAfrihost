import React, { Component } from 'react';
import LoginComponent from './loginComponent'


class Home extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <LoginComponent />
        );
    }
}

export default Home;
