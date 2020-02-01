import React, { Component } from 'react'
import './skeleton.css'

import { Link } from "react-router-dom";

import Operations from "../operations/Operations";

class Skeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
            pages : {
                1: 'Accueil',
                2: 'Magasins',
                3: 'Articles',
            },
            user: {},
        }

        this.changeSelected.bind(this);

    }

    changeSelected(number) {
        this.setState({ selected: number });
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        let user = JSON.parse(localStorage.getItem('user-data'));
        if(user) {
            fetch(`http://localhost:8000/chef-de-magasin/${user['id']}`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ user: data[0] });
                });
        }
    }

    render () {
        return <div id="main-div">
            <div id="left-div">
                <div id="logo-div">
                    <img className="logo" alt="SportShop" src="/images/logo.png"/>
                </div>
                <div id="menu-div">
                    <ul id="menu">
                        <Link className="link" onClick={ () => this.changeSelected(1) } to="/"> 
                            <li className={ this.state.selected === 1 ? "selected" : "" }> 
                                <img className="menu-icon" alt="Home" src={ this.state.selected === 1 ? "/icons/home-selected.svg" : "/icons/home.svg" }/> 
                                acceuil 
                            </li> 
                        </Link>

                        <Link className="link" onClick={ () => this.changeSelected(2) } to="/magasins"> 
                            <li className={ this.state.selected === 2 ? "selected" : "" }> 
                                <img className="menu-icon" alt="Shopping bag" src={ this.state.selected === 2 ? "/icons/shopping-bag-selected.svg" : "/icons/shopping-bag.svg" }/> 
                                magasins 
                            </li> 
                        </Link>

                        <Link className="link" onClick={ () => this.changeSelected(3) } to="/articles"> 
                            <li className={ this.state.selected === 3 ? "selected" : "" }> 
                                <img className="menu-icon" alt="Grid" src={ this.state.selected === 3 ? "/icons/grid-selected.svg" : "/icons/grid.svg" }/> 
                                produits 
                            </li> 
                        </Link>

                        <li> <img className="menu-icon" alt="User" src="/icons/user.svg"/> utilisateurs </li>
                    </ul>
                </div>
            </div>
            <div id="mid-div">
                <div id="search-div">
                    <div className="page-title">
                        <h1> { this.state.pages[this.state.selected] } </h1>
                    </div>
                    <input className="search-bar" placeholder="Rechercher un produit..." type="text"/>
                </div>
                <div id="content-div">
                    {this.props.children}
                </div>
            </div>
            <div id="right-div">
                <div id="user-div">
                    <img className="user-picture" alt="Profil" src="/images/default-pp.png"/>
                    <div className="infos">
                        <span className="name"> { this.state.user.CDM_PRENOM } { this.state.user.CDM_NOM } </span>
                        <span className="role"> Chef de magasin </span>
                    </div>
                </div>
                <div id="operations-div">
                    <h1> Dernières opérations </h1>

                    <Operations/>
                </div>

            </div>
        </div>
    }
}

export default Skeleton;
