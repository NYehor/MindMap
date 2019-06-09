import React, { Component } from 'react'
import { formValidation, isEmptyAlerts } from '../../../helpers/formValidation';

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
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    onBlurInput = (e) => {
        const { name, value } = e.target;
        const { alerts } = this.state;

        const currentInput = {
            [name]: value
        };
        this.setState({
            alerts: {
                ...alerts,
                ...formValidation(currentInput)
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { user } = this.state;
        const alerts = formValidation(user);
        const { history, register } = this.props.actions;

        this.setState({
            alerts 
        });

        isEmptyAlerts(alerts) && 
        register({
            user,
            redirectTo: (page) => history.push(page)
        });
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
