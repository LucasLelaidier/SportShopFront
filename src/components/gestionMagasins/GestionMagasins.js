import React, { Component } from 'react'
import './gestionMagasins.css'

import ModalMagasin from '../modal/ModalMagasin'

class GestionMagasins extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            magasins: [],
            showModal: [],
        }
        this.showModal.bind(this);
        this.hideModal.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/magasin')
            .then(res => res.json())
            .then((data) => {
                this.setState({ magasins: data })
                this.initModalState();
            });
    }

    initModalState() {
        let showModal = [];
        showModal[0] = false;
        this.state.magasins.forEach(magasin => {
            showModal[magasin.MAG_ID] = false;
        });
        this.setState({ showModal: showModal });
    }

    displayShops() {
        let user = JSON.parse(localStorage.getItem('user-data'));

        if(this.state.magasins && this.state.magasins.length && this.state.showModal && this.state.showModal.length) {
            return this.state.magasins.map((magasin) => {
                return <div className="magasin" key={ magasin.MAG_ID }>
                    <div className="top">
                        <div className="location">
                            <h2> { magasin.MAG_VILLE } </h2>
                            <span> { magasin.MAG_ADRESSE } </span>
                        </div>
                        <div className="buttons">
                            {
                                (user['magId'] === magasin.MAG_ID)
                                ? <div>
                                    <img onClick={ () => { this.showModal(magasin.MAG_ID) } } className="button-icon" alt="edit" src="/icons/edit.svg" />
                                    <img className="button-icon" alt="delete" src="/icons/trash-2.svg" />
                                </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                    <div className="bot">
                        <div>
                            <span className="title"> Rayons </span>
                            <span className="number"> { magasin.rayons } </span>
                        </div>
                        <div>
                            <span className="title"> Articles </span>
                            <span className="number"> { magasin.articles } </span>
                        </div>
                    </div>
                    <ModalMagasin show={ this.state.showModal[magasin.MAG_ID] } handleClose={ () => { this.hideModal(magasin.MAG_ID) }} ville={ magasin.MAG_VILLE } adresse={ magasin.MAG_ADRESSE } chef={ magasin.CDM_ID }/>
                </div>
            }, this);
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

    showModal = (id) => {
        let showModalCopy = JSON.parse(JSON.stringify(this.state.showModal))

        showModalCopy[id] = true;
        this.setState({
            showModal: showModalCopy 
        });
    };
    
    hideModal = (id) => {
        let showModalCopy = JSON.parse(JSON.stringify(this.state.showModal))

        showModalCopy[id] = false;
        this.setState({
            showModal: showModalCopy 
        });
    };

    render() {
        return <div id="gestion-magasins-div" className="middle-content-main-div">
            <div className="h1-add">
                <h1> Gestion des magasins </h1>
                <span onClick={ () => { this.showModal(0) } } className="add-button"> + nouveau magasin </span>
                <ModalMagasin show={ this.state.showModal[0] } handleClose={ () => { this.hideModal(0) }}/>
            </div>
            <div className="magasins">
                { this.displayShops() }
            </div>
        </div>
    }
}

export default GestionMagasins;