import React, { Component } from 'react'
import './homePage.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            magasins: [],
            articles: ['vide'],
            selectedMagasin: []
        };
        this.changeShop.bind(this);
    }
    
    componentDidMount() {
        fetch('http://localhost:8000/magasin')
            .then(res => res.json())
            .then((data) => {
                this.setState({ magasins: data })
                this.setState({ selectedMagasin: data[0] })

                fetch(`http://localhost:8000/article/magasin/${this.state.selectedMagasin.MAG_ID}`)
                    .then(res => res.json())
                    .then((data) => {
                        this.setState({ articles: data })
                    });
            });
    }

    changeShop(newShop) {
        this.setState({ articles: ['vide'] })
        fetch(`http://localhost:8000/article/magasin/${newShop.MAG_ID}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ articles: data })
                this.setState({ selectedMagasin: newShop })
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

    displayArticles() {
        if(this.state.articles && !this.state.articles.length) { // Si la liste est vide (pas de résultat)
            return <h2 className="no-result"> Aucun résultat </h2>;
        } else {
            if(this.state.articles && this.state.articles[0] !== 'vide') { // Si la requete n'est pas terminée
                return this.state.articles.map((article) => (
                    <div className="stock" key={ article.ART_ID }>
                        <div className="left">
                            <h2> { article.ART_NOM } </h2>
                            <span className="link"> Modifier les stocks </span>
                        </div>
                        <div className="right">
                            <span className="label"> Stock </span>
                            <span className="number"> { article.APP_STOCK } </span>
                        </div>
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

            <h1> Stocks : { this.state.selectedMagasin === undefined ? "Chargement..." : this.state.selectedMagasin.MAG_VILLE } </h1>

            <div className="stocks">
                { this.displayArticles() }
            </div>
        </div>
    }
}

export default HomePage;