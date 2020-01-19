import React, { Component } from 'react'
import './gestionMagasins.css'

class GestionMagasins extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            magasins: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/magasin')
            .then(res => res.json())
            .then((data) => {
                this.setState({ magasins: data })
            });
    }

    displayShops() {
        if(this.state.magasins && this.state.magasins.length) {
            return this.state.magasins.map((magasin) => (
                <div class="magasin">
                    <div class="top">
                        <div class="location">
                            <h2> { magasin.MAG_VILLE } </h2>
                            <span> { magasin.MAG_ADRESSE } </span>
                        </div>
                        <div class="buttons">
                            <img class="button-icon" alt="edit" src="/icons/edit.svg" />
                            <img class="button-icon" alt="delete" src="/icons/trash-2.svg" />
                        </div>
                    </div>
                    <div class="bot">
                        <div>
                            <span class="title"> Gestionnaires </span>
                            <span class="number"> 12 </span>
                        </div>
                        <div>
                            <span class="title"> Stocks </span>
                            <span class="number"> 702 </span>
                        </div>
                    </div>
                </div>
            ))
        } else {
            var placeholders = [];
            for (var i = 0; i < 4; i++) {
                placeholders.push(
                    <div class="magasin loading">
                        <div class="top">
                            <div class="location">
                                <div class="h2 animate"></div>
                                <span class="loading animate"> 7 avenue des champs élysées </span>
                            </div>
                            <div class="buttons">
                                <div class="button-icon icon animate"> </div>
                                <div class="button-icon icon animate"></div>
                            </div>
                        </div>
                        <div class="bot">
                            <div>
                                <span class="title loading animate"> Gestionnaires </span>
                                <span class="number loading animate"> 12 </span>
                            </div>
                            <div>
                                <span class="title loading animate"> Stocks </span>
                                <span class="number loading animate"> 702 </span>
                            </div>
                        </div>
                    </div>
                );
            }
            return placeholders;
        }
    }

    render() {
        return <div id="gestion-magasins-div" class="middle-content-main-div">
            <h1> Gestion des magasins </h1>

            <div class="magasins">
                { this.displayShops() }
            </div>
        </div>
    }
}

export default GestionMagasins;