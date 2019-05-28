import React, { Component } from 'react'
import formValidation from '../../../helpers/formValidation';

export default class RegisterForm extends Component {

    state = {
        user: {
            name: '',
            email: '',
            password: ''    
        },
        alerts: {}
    };

    onChangeInput = (e) => {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [e.target.name]: e.target.value
            }
        });
    }

    onBlurInput = (e) => {
        const currentInput = {
            [e.target.name]: e.target.value
        }
        this.setState({
            alerts: formValidation(currentInput)
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            alerts: formValidation(this.state.user)
        });
        this.props.actions.register(this.state.user);
    }

    renderAlerts(fieldName) {
        const { alerts } = this.state;

        return alerts[fieldName] && 
               alerts[fieldName].length !== 0 &&
               alerts[fieldName].map((alert, key) => 
                    <span key={key} className='form__controll--alert'>{alert}</span>)
    }

    render() {
        const { user } = this.state;

        return (
            <form className="form form--register">

                <div className='form__controll'>
                    <label className='form__controll--label'>Name</label>
                    <input value={user.name}
                            onChange={this.onChangeInput}
                            onBlur={this.onBlurInput}
                            name='name' 
                            type='text' 
                            className='form__controll--input' />

                    {this.renderAlerts('name')}
                </div>

                <div className='form__controll'>
                    <label className='form__controll--label'>Email</label>
                    <input value={user.email} 
                            onChange={this.onChangeInput}
                            onBlur={this.onBlurInput}
                            name='email' 
                            type='text' 
                            className='form__controll--input' />

                    {this.renderAlerts('email')}
                </div>

                <div className='form__controll'>
                    <label className='form__controll--label'>Password</label>
                    <input value={user.password} 
                            onChange={this.onChangeInput}
                            onBlur={this.onBlurInput}
                            name='password' 
                            type='password'
                            className='form__controll--input' />

                    {this.renderAlerts('password')}
                </div>

                <div className='form__controll'>
                    <button onClick={this.onSubmit}
                            className='form__controll--submit'>
                                Register
                    </button>
                </div>

            </form>
        )
    }
}
