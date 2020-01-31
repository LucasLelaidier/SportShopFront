import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import './login.css'

const jwtDecode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            redner: "loading",
        }

        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        this.getHtml();
    }

    changeLogin(event) {
        this.setState({ login: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    login() {
        fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: this.state.login,
                    password: this.state.password,
                }),
            })
            .then((res) => {
                if(res.status !== 400) {
                    return res.json();
                }
                return null;
            })
            .then((data) => {
                if(data !== null) {
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('user-data', JSON.stringify(jwtDecode(data['token'])));
                    this.setState({ render: "redirect" }); 
                }
            });
    }

    getHtml() {
        fetch('http://localhost:8000/login/is-logged', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((res) => {
                if(res.status !== 401) {
                    this.setState({ render: "redirect" });
                } else {
                    this.setState({ render: "render" });
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        if(this.state.render === "loading") {
            return <div id="login-div"></div>;
        } else {
            if(this.state.render === "redirect") {
                return <Redirect to='/' />;
            } else {
                return (
                    <div id="login-div">
                        <div className="left">
                            <img className="logo" src="/images/logo.png" alt="SportShop" />
        
                            <h1> Connexion </h1>
        
                            <label className="input">
                                Nom
                                <input type="text" value={ this.state.login }  onChange={ this.changeLogin }/>
                            </label>
        
                            <label className="input">
                                Mot de passe
                                <input type="password" value={ this.state.password }  onChange={ this.changePassword }/>
                            </label>
        
                            <span onClick={() => { this.login() }} className="button"> Connexion </span>
                        </div>
                        <div className="right">
                            <h1> Gérez vos magasins en toute simplicité </h1>
        
                            <span> 
                                Gérez vos stocks, vos employés, vos rayons et vos articles simplement
                                avec une interface simple, efficace et intuitive ! 
                            </span>
        
                            <img className="screen" src="/images/screenshot.png" alt="screenshot of the app" />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Login;