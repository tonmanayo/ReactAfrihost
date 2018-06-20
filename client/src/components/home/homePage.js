import React, { Component } from 'react';
import LoginComponent from './loginComponent'
import SignupComponent from "./signupComponent";

class HomePage extends Component {
    render() {
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
    }
}



export default HomePage
