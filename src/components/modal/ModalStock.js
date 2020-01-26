/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './modal.css'

class ModalStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: this.props.stock ? this.props.stock : 0,
            rayons: [],
            rayon: '',
            articles: [],
            article: [],
        }

        this.changeStock = this.changeStock.bind(this);
        this.changeRayon = this.changeRayon.bind(this);
        this.changeArticle = this.changeArticle.bind(this);
    }

    componentDidMount() {
        if((!this.props.rayon || !this.props.article) && this.props.magasin) {
            console.log(this.props.magasin);
            fetch(`http://localhost:8000/rayon/magasin/${this.props.magasin}`)
                .then(res => res.json())
                .then((data) => {
                    this.setState({ rayons: data, rayon: data[0].RAY_ID });
                });

            fetch('http://localhost:8000/article')
                .then(res => res.json())
                .then((data) => {
                    this.setState({ articles: data, article: data[0].ART_ID });
                });
        }
    }

    addStock() {
        if(this.props.nom) {
            this.props.handleClose();
        } else {
            let params;
            if(this.props.rayon && this.props.article) {
                params = {
                    rayon: this.props.rayon,
                    article: this.props.article,
                    stock: this.state.stock,
                }
            } else {
                params = {
                    rayon: this.state.rayon,
                    article: this.state.article,
                    stock: this.state.stock,
                }
            }
            fetch('http://localhost:8000/stock', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }).then(() => {
                let currentdate = new Date();
                let datetime = currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1) + "-" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

                params = {
                    ...params,
                    date: datetime,
                    type: 3,
                }

                fetch('http://localhost:8000/operation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                }).then(() => {
                    this.props.handleClose();
                });
            })
        }
    }

    changeStock(event) {
        this.setState({ stock: event.target.value});
    }

    changeRayon(event) {
        this.setState({ rayon: event.target.value});
    }

    changeArticle(event) {
        this.setState({ article: event.target.value});
    }

    getRayons() {
        return this.state.rayons.map((rayon) => (
            <option key={rayon.RAY_ID} value={rayon.RAY_ID}> {rayon.RAY_NOM} </option>
        ))
    }

    getArticles() {
        return this.state.articles.map((article) => (
            <option key={article.ART_ID} value={article.ART_ID}> {article.ART_NOM} </option>
        ))
    }

    getSelects() {
        if(!this.props.rayon || !this.props.article) {
            return (
                <div>
                    <label className="input">
                        rayon
                        <select value={this.state.chef} onChange={ this.changeRayon }>
                            { this.getRayons() }
                        </select>
                    </label>

                    <label className="input">
                        article
                        <select value={this.state.chef} onChange={ this.changeArticle }>
                            { this.getArticles() }
                        </select>
                    </label>
                </div>
            );
        }
        return '';
    }

    render() {
        return <div className={ `modal ${this.props.show ? "display-block" : "display-none"}` }>
            <section className="modal-main">
                <div className="top-bar">
                    <h1> Stocks </h1>
                    <span onClick={ this.props.handleClose }> <img alt="close icon" src="icons/x.svg" /> close </span>
                </div>
                
                { this.getSelects() }

                <label className="input">
                    Stocks
                    <input type="number" value={ this.state.stock }  onChange={ this.changeStock }/>
                </label>

                <span className="submit-modal" onClick={ () => { this.addStock() } }> Valider </span>
            </section>
        </div>
    }
}

ModalStock.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default ModalStock;