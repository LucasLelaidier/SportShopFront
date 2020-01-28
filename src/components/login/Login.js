import React, { Component } from 'react'
import './login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
        }

        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changeLogin(event) {
        this.setState({ login: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div id="login-div">
                <div class="left">
                    <img class="logo" src="/images/logo.png" alt="SportShop" />

                    <h1> Connexion </h1>

                    <label className="input">
                        Identifiant
                        <input type="text" value={ this.state.login }  onChange={ this.changeLogin }/>
                    </label>

                    <label className="input">
                        Mot de passe
                        <input type="text" value={ this.state.password }  onChange={ this.changePassword }/>
                    </label>

                    <span class="button"> Connexion </span>
                </div>
                <div class="right">
                    <h1> Gérez vos magasins en toute simplicité </h1>

                    <span> 
                        Gérez vos stocks, vos employés, vos rayons et vos articles simplement
                        avec une interface simple, efficace et intuitive ! 
                    </span>

                    <img class="screen" src="/images/screenshot.png" alt="screenshot of the app" />
                </div>
            </div>
        )
    }
}

export default Login;