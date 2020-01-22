import React, { Component } from 'react'
import './gestionMagasins.css'

import ModalMagasin from '../modal/ModalMagasin'

class GestionMagasins extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            magasins: [],
            showModal: false,
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
                <div className="magasin" key={ magasin.MAG_ID }>
                    <div className="top">
                        <div className="location">
                            <h2> { magasin.MAG_VILLE } </h2>
                            <span> { magasin.MAG_ADRESSE } </span>
                        </div>
                        <div className="buttons">
                            <img onClick={ this.showModal } className="button-icon" alt="edit" src="/icons/edit.svg" />
                            <img className="button-icon" alt="delete" src="/icons/trash-2.svg" />
                        </div>
                    </div>
                    <div className="bot">
                        <div>
                            <span className="title"> Gestionnaires </span>
                            <span className="number"> 12 </span>
                        </div>
                        <div>
                            <span className="title"> Stocks </span>
                            <span className="number"> 702 </span>
                        </div>
                    </div>
                </div>
            ))
        } else {
            var placeholders = [];
            for (var i = 0; i < 4; i++) {
                placeholders.push(
                    <div className="magasin loading" key={ i }>
                        <div className="top">
                            <div className="location">
                                <div className="h2 animate"></div>
                                <span className="loading animate"> 7 avenue des champs élysées </span>
                            </div>
                            <div className="buttons">
                                <div className="button-icon icon animate"> </div>
                                <div className="button-icon icon animate"></div>
                            </div>
                        </div>
                        <div className="bot">
                            <div>
                                <span className="title loading animate"> Gestionnaires </span>
                                <span className="number loading animate"> 12 </span>
                            </div>
                            <div>
                                <span className="title loading animate"> Stocks </span>
                                <span className="number loading animate"> 702 </span>
                            </div>
                        </div>
                    </div>
                );
            }
            return placeholders;
        }
    }

    showModal = () => {
        this.setState({ showModal: true });
    };
    
    hideModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        return <div id="gestion-magasins-div" className="middle-content-main-div">
            <h1> Gestion des magasins </h1>

            <div className="magasins">
                { this.displayShops() }
            </div>

            <ModalMagasin show={ this.state.showModal } handleClose={ this.hideModal }/>
        </div>
    }
}

export default GestionMagasins;