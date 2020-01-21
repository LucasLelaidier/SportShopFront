/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './modal.css'

class Modal extends Component {
    showHideClassName = this.props.show ? "display-block" : "display-none";

    render() {
        return <div className={ `modal ${this.props.show ? "display-block" : "display-none"}` }>
            <section className="modal-main">
                <div className="top-bar">
                    <h1> { this.props.title } </h1>
                    <span onClick= { this.props.handleClose }> <img alt="close icon" src="icons/x.svg" /> close </span>
                </div>
                
                { this.props.children }
            </section>
        </div>
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default Modal;