/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './modal.css'

class ModalMagasin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ville: this.props.ville ? this.props.ville : '',
            adresse: this.props.adresse ? this.props.adresse : '',
            chef: this.props.chef ? this.props.chef : '',
            chefs: [],
        }

        this.changeVille = this.changeVille.bind(this);
        this.changeAdresse = this.changeAdresse.bind(this);
        this.changeChef = this.changeChef.bind(this);
    }

    addMagasin() {
        if(this.props.chef) {
            
        } else {
            fetch('http://localhost:8000/magasin', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ville: this.state.ville,
                    adresse: this.state.adresse,
                    cdmId: this.state.chef
                }),
            })
        }
        this.props.handleClose();
    }

    componentDidMount() {
        fetch('http://localhost:8000/chef-de-magasin')
            .then(res => res.json())
            .then((data) => {
                this.setState({ chefs: data, chef: data[0].CDM_ID });
            });
    }

    getChefs() {
        return this.state.chefs.map((chef) => (
            <option key={chef.CDM_ID} value={chef.CDM_ID}> {chef.CDM_PRENOM}  {chef.CDM_NOM} </option>
        ))
    }

    changeVille(event) {
        this.setState({ ville: event.target.value});
    }

    changeAdresse(event) {
        this.setState({ adresse: event.target.value});
    }

    changeChef(event) {
        this.setState({ chef: event.target.value});
    }

    render() {
        return <div className={ `modal ${this.props.show ? "display-block" : "display-none"}` }>
            <section className="modal-main">
                <div className="top-bar">
                    <h1> Magasin </h1>
                    <span onClick={ this.props.handleClose }> <img alt="close icon" src="icons/x.svg" /> close </span>
                </div>
                
                <label className="input">
                    Ville
                    <input type="text" value={ this.state.ville }  onChange={ this.changeVille }/>
                </label>
                <label className="input">
                    Adresse
                    <input type="text" value={ this.state.adresse }  onChange={ this.changeAdresse }/>
                </label>

                <label className="input">
                    Chef de magasin
                    <select value={this.state.chef} onChange={ this.changeChef }>
                        { this.getChefs() }
                    </select>
                </label>

                <span className="submit-modal" onClick={ () => { this.addMagasin() } }> Valider </span>
            </section>
        </div>
    }
}

ModalMagasin.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default ModalMagasin;