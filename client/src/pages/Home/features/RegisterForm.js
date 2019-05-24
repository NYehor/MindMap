import React, { Component } from 'react'

export default class RegisterForm extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    };

    onChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.actions.register(this.state);
    }

    render() {
        return (
            <form className="form form--register">

                <div className='form__controll'>
                    <label className='form__controll--label'>Name</label>
                    <input value={this.state.name}
                            onChange={this.onChangeInput}
                            name='name' 
                            type='text' 
                            className='form__controll--input' />
                </div>

                <div className='form__controll'>
                    <label className='form__controll--label'>Email</label>
                    <input value={this.state.email} 
                            onChange={this.onChangeInput}
                            name='email' 
                            type='text' 
                            className='form__controll--input' />
                </div>

                <div className='form__controll'>
                    <label className='form__controll--label'>Password</label>
                    <input value={this.state.password} 
                            onChange={this.onChangeInput}
                            name='password' 
                            type='password' 
                            className='form__controll--input' />
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
