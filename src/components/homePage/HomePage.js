import React, { Component } from 'react'
import './homePage.css'

import ModalStock from '../modal/ModalStock'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            magasins: [],
            rayons: ['vide'],
            selectedRayon: 'Tout',
            articles: ['vide'],
            selectedMagasin: [],
            showModal: [],
        };
        this.changeShop.bind(this);
        this.showModal.bind(this);
        this.hideModal.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:8000/magasin')
            .then(res => res.json())
            .then((magasins) => {
                this.setState({ magasins: magasins })
                this.setState({ selectedMagasin: magasins[0] })

                fetch(`http://localhost:8000/rayon/magasin/${this.state.selectedMagasin.MAG_ID}`)
                    .then(res => res.json())
                    .then((rayons) => {
                        this.setState({ rayons: rayons })
                    });

                fetch(`http://localhost:8000/article/magasin/${this.state.selectedMagasin.MAG_ID}`)
                    .then(res => res.json())
                    .then((articles) => {
                        this.setState({ articles: articles })
                    });
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

        this.changeShop(this.state.selectedMagasin);
    };

    changeShop(newShop) {
        this.setState({ rayons: ['vide'], selectedRayon: 'Tout', articles: ['vide'] });

        fetch(`http://localhost:8000/rayon/magasin/${newShop.MAG_ID}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ rayons: data })
            });

        fetch(`http://localhost:8000/article/magasin/${newShop.MAG_ID}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
                this.setState({ selectedMagasin: newShop })
            });
    }

    changeRayon(newRayon) {
        this.setState({ articles: ['vide'] });

        fetch(`http://localhost:8000/article/rayon/${newRayon.RAY_ID}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
                this.setState({ selectedRayon: newRayon.RAY_NOM })
            });
    }

    displayShops() {
        if(this.state.magasins && this.state.magasins.length) {
            return this.state.magasins.map((magasin) => (
                <div className="magasin" key={ magasin.MAG_ID }>
                    <h2> { magasin.MAG_VILLE } </h2>
                    <span> { magasin.MAG_ADRESSE } </span>
                    <span onClick={ () => this.changeShop(magasin) } className="link"> voir les stocks </span>
                </div>
            ))
        } else {
            var placeholders = [];
            for (var i = 0; i < 4; i++) {
                placeholders.push(
                    <div className="magasin loading" key={ i }>
                        <div className="h2 animate"></div>
                        <div className="span animate"></div>
                        <span className="link loading animate"> voir les stocks </span>
                    </div>
                );
            }
            return placeholders;
        }
    }

    displayRayons() {
        if(this.state.rayons && !this.state.rayons.length) { // Si la liste est vide (pas de résultat)
            return <h2 className="no-result"> Aucun résultat </h2>;
        } else {
            if(this.state.rayons && this.state.rayons[0] !== 'vide') { // Si la requete n'est pas terminée
                return this.state.rayons.map((rayon) => (
                    <div className="rayon" key={ rayon.RAY_ID }>
                        <h2> { rayon.RAY_NOM} </h2>
                        <span onClick={ () => { this.changeRayon(rayon) } }> voir </span>
                    </div>
                ))
            } else {
                var placeholders = [];
                for (var i = 0; i < 4; i++) {
                    placeholders.push(
                        <div key={ i } className="rayon loading">
                            <div className="h2 animate"></div>
                            <span className="link loading animate"> voir </span>
                        </div>
                    );
                }
                return placeholders;
            }
        }
    }

    displayArticles() {
        let user = JSON.parse(localStorage.getItem('user-data'));

        if(this.state.articles && !this.state.articles.length) { // Si la liste est vide (pas de résultat)
            return <h2 className="no-result"> Aucun résultat </h2>;
        } else {
            if(this.state.articles && this.state.articles[0] !== 'vide') { // Si la requete n'est pas terminée
                return this.state.articles.map((article) => (
                    <div className="stock" key={ article.ART_ID }>
                        <div className="left">
                            <h2> { article.ART_NOM } </h2>
                            {
                                (user['magId'] === this.state.selectedMagasin.MAG_ID)
                                ? <span onClick={ () => { this.showModal(article.ART_ID) } } className="link"> Modifier les stocks </span>
                                : <div></div>
                            }
                        </div>
                        <div className="right">
                            <span className="label"> Stock </span>
                            <span className="number"> { article.APP_STOCK } </span>
                        </div>
                        <ModalStock show={ this.state.showModal[article.ART_ID] } handleClose={ () => { this.hideModal(article.ART_ID) }} rayon={ article.RAY_ID } article={ article.ART_ID } stock={ article.APP_STOCK }/>
                    </div>
                ))
            } else {
                var placeholders = [];
                for (var i = 0; i < 4; i++) {
                    placeholders.push(
                        <div className="stock loading" key={ i }>
                            <div className="left">
                                <div className="h2 animate"></div>
                                <span className="link loading animate"> Modifier les stocks </span>
                            </div>
                            <div className="right">
                                <span className="label loading animate"> Stock </span>
                                <span className="number loading animate"> 12 </span>
                            </div>
                        </div>
                    );
                }
                return placeholders;
            }
        }
    }

    render () {
        return <div id="main-home-div" className="middle-content-main-div">
            <h1> Magasins </h1>

            <div className="magasins">
                { this.displayShops() }
            </div>

            <h1> Rayons </h1>

            <div className="rayons">
                { this.displayRayons() }
            </div>

            <div className="h1-add">
                <h1> Stocks : { this.state.selectedMagasin.MAG_VILLE } - { this.state.selectedRayon } </h1>
                <span onClick={ () => { this.showModal(0) } } className="add-button"> + ajouter un article </span>
                <ModalStock show={ this.state.showModal[0] } handleClose={ () => { this.hideModal(0) }} magasin={ 1 } />
            </div>

            <div className="stocks">
                { this.displayArticles() }
            </div>
        </div>
    }
}

export default HomePage;