/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './modal.css'

class ModalArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            nom: this.props.nom ? this.props.nom : '',
        }

        this.changeNom = this.changeNom.bind(this);
    }

    addArticle() {
        if(this.props.nom) {
            this.props.handleClose();
        } else {
            fetch('http://localhost:8000/article', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: this.state.nom,
                }),
            }).then(() => {
                this.props.handleClose();
            });
        }
    }

    changeNom(event) {
        this.setState({ nom: event.target.value});
    }

    render() {
        return <div className={ `modal ${this.props.show ? "display-block" : "display-none"}` }>
            <section className="modal-main">
                <div className="top-bar">
                    <h1> Article </h1>
                    <span onClick={ this.props.handleClose }> <img alt="close icon" src="icons/x.svg" /> close </span>
                </div>
                
                <label className="input">
                    Nom
                    <input type="text" value={ this.state.nom }  onChange={ this.changeNom }/>
                </label>

                <span className="submit-modal" onClick={ () => { this.addArticle() } }> Valider </span>
            </section>
        </div>
    }
}

ModalArticle.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default ModalArticle;