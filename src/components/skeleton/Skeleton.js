import React, { Component } from 'react'
import './skeleton.css'

import { Link } from "react-router-dom";

class Skeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
        }
        this.changeSelected.bind(this);
    }

    changeSelected(number) {
        this.setState({ selected: number });
    }

    render () {
        return <div id="main-div">
            <div id="left-div">
                <div id="logo-div">
                    <img class="logo" alt="SportShop" src="/images/logo.png"/>
                </div>
                <div id="menu-div">
                    <ul id="menu">
                        <Link class="link" onClick={ () => this.changeSelected(1) } to="/"> 
                            <li class={ this.state.selected === 1 ? "selected" : "" }> 
                                <img class="menu-icon" alt="Home" src={ this.state.selected === 1 ? "/icons/home-selected.svg" : "/icons/home.svg" }/> 
                                acceuil 
                            </li> 
                        </Link>

                        <Link class="link" onClick={ () => this.changeSelected(2) } to="/magasins"> 
                            <li class={ this.state.selected === 2 ? "selected" : "" }> 
                                <img class="menu-icon" alt="Shopping bag" src={ this.state.selected === 2 ? "/icons/shopping-bag-selected.svg" : "/icons/shopping-bag.svg" }/> 
                                magasins 
                            </li> 
                        </Link>

                        <li> <img class="menu-icon" alt="Grid" src="/icons/grid.svg"/> produits </li>
                        <li> <img class="menu-icon" alt="User" src="/icons/user.svg"/> utilisateurs </li>
                    </ul>
                </div>
            </div>
            <div id="mid-div">
                <div id="search-div">
                    <div class="page-title">
                        <h1> Acceuil </h1>
                    </div>
                    <input class="search-bar" placeholder="Rechercher un produit..." type="text"/>
                </div>
                <div id="content-div">
                    {this.props.children}
                </div>
            </div>
            <div id="right-div">
                <div id="user-div">
                    <img class="user-picture" alt="Profil" src="/images/profil.jpg"/>
                    <div class="infos">
                        <span class="name"> Lucas Lelaidier </span>
                        <span class="role"> Admin </span>
                    </div>
                </div>
                <div id="operations-div">
                    <h1> Dernières opérations </h1>

                    <div class="operation">
                        <span class="titre green"> Restockage </span>
                        <span class="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                    <div class="operation">
                        <span class="titre green"> Restockage </span>
                        <span class="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                    <div class="operation">
                        <span class="titre green"> Restockage </span>
                        <span class="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                </div>

            </div>
        </div>
    }
}

export default Skeleton;
