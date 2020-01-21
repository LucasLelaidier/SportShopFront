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

                        <li> <img className="menu-icon" alt="Grid" src="/icons/grid.svg"/> produits </li>
                        <li> <img className="menu-icon" alt="User" src="/icons/user.svg"/> utilisateurs </li>
                    </ul>
                </div>
            </div>
            <div id="mid-div">
                <div id="search-div">
                    <div className="page-title">
                        <h1> Acceuil </h1>
                    </div>
                    <input className="search-bar" placeholder="Rechercher un produit..." type="text"/>
                </div>
                <div id="content-div">
                    {this.props.children}
                </div>
            </div>
            <div id="right-div">
                <div id="user-div">
                    <img className="user-picture" alt="Profil" src="/images/profil.jpg"/>
                    <div className="infos">
                        <span className="name"> Lucas Lelaidier </span>
                        <span className="role"> Admin </span>
                    </div>
                </div>
                <div id="operations-div">
                    <h1> Dernières opérations </h1>

                    <div className="operation">
                        <span className="titre green"> Restockage </span>
                        <span className="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                    <div className="operation">
                        <span className="titre green"> Restockage </span>
                        <span className="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                    <div className="operation">
                        <span className="titre green"> Restockage </span>
                        <span className="valeur"> +15 ballons de foot à Tours </span>
                    </div>
                </div>

            </div>
        </div>
    }
}

export default Skeleton;
