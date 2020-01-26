import React, { Component } from 'react'
import './gestionArticles.css'

import ModalArticle from '../modal/ModalArticle'

class GestionMagasins extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            articles: [],
            showModal: [],
        }
        this.showModal.bind(this);
        this.hideModal.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/article')
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
                this.initModalState();
            });
    }

    initModalState() {
        let showModal = [];
        showModal[0] = false;
        this.state.articles.forEach(article => {
            showModal[article.ART_ID] = false;
        });

        this.setState({ showModal: showModal });
    }

    displayShops() {
        if(this.state.articles && this.state.articles.length && this.state.showModal && this.state.showModal.length) {
            return this.state.articles.map((article) => {
                return <div className="magasin" key={ article.ART_ID }>
                    <div className="top">
                        <div className="location">
                            <h2 className="smaller"> { article.ART_NOM } </h2>
                        </div>
                        <div className="buttons">
                            <img onClick={ () => { this.showModal(article.ART_ID) } } className="button-icon" alt="edit" src="/icons/edit.svg" />
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
                    <ModalArticle show={ this.state.showModal[article.ART_ID] } handleClose={ () => { this.hideModal(article.ART_ID) }} id={ article.ART_ID } nom={ article.ART_NOM }/>
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

        fetch('http://localhost:8000/article')
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
                this.initModalState();
            });
    };

    render() {
        return <div id="gestion-magasins-div" className="middle-content-main-div">
            <div className="h1-add">
                <h1> Gestion des articles </h1>
                <span onClick={ () => { this.showModal(0) } } className="add-button"> + nouvel article </span>
                <ModalArticle show={ this.state.showModal[0] } handleClose={ () => { this.hideModal(0) }}/>
            </div>

            <div className="magasins">
                { this.displayShops() }
            </div>
        </div>
    }
}

export default GestionMagasins;