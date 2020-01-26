import React, { Component } from 'react'

class Operations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opearations: [],
        }
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        fetch('http://localhost:8000/operation')
            .then(res => res.json())
            .then((data) => {
                this.setState({ operations: data })
            });
    }

    getOperations() {
        if(this.state.operations && this.state.operations.length) {
            return this.state.operations.map((operation) => (
                <div className="operation">
                    <span className="titre green"> { operation.TYP_TYPE } </span>
                    <span className="valeur"> {operation.OPE_VALEUR } { operation.ART_NOM} dans { operation.RAY_NOM} </span>
                </div>
            ))
        } else {
            var placeholders = [];
            for (var i = 0; i < 4; i++) {
                placeholders.push(
                    <div className="operation loading" key={ i }>
                        <div className="span animate"></div>
                        <div className="span animate"></div>
                    </div>
                );
            }
            return placeholders;
        }
    }

    render() {
        return (
            <div>
                { this.getOperations() }
            </div>
        )
    }
}

export default Operations;