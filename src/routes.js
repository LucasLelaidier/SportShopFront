import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
 
import Skeleton from './components/skeleton/Skeleton'
import HomePage from './components/homePage/HomePage'
import GestionMagasins from './components/gestionMagasins/GestionMagasins'

export default function MainRouter () {
    return (
        <Router>
            <Skeleton>
                <div>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route exact path="/magasins">
                        <GestionMagasins/>
                    </Route>
                </div>
            </Skeleton>
        </Router>
    )
}