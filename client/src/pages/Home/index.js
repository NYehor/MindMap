import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../store/actions/auth';

import Solution from './features/Solution';
import Features from './features/Features';
import RegisterForm from './features/RegisterForm';
import LoginForm from './features/LoginForm';
import Title  from './features/Title';

class Home extends Component {
    render() {
        const { logIn } = this.props.auth;

        return (
            <div>
                <Title />

                <div className='form-container' style={{width: '330px'}}>
                    {logIn ? 
                        <LoginForm /> : 
                        <RegisterForm actions={{register: this.props.register}} /> 
                    }
                </div>
                <Solution />
                <Features />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(authActions, dispatch);
}

function mapStateToProps(state) {
	return { 
        auth: state.auth
    };
}

export default connect(mapStateToProps,	mapDispatchToProps)(Home);

