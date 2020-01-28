import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/login/Login'
import Skeleton from './components/skeleton/Skeleton'
import HomePage from './components/homePage/HomePage'
import GestionMagasins from './components/gestionMagasins/GestionMagasins'
import GestionArticles from './components/gestionArticles/GestionArticles'

export default function MainRouter () {
    return (
        <Router>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Skeleton>
                <div>
                    <Route exact path="/">
                        <HomePage/>
                    </Route>
                    <Route exact path="/magasins">
                        <GestionMagasins/>
                    </Route>
                    <Route exact path="/articles">
                        <GestionArticles/>
                    </Route>
                </div>
            </Skeleton>
        </Router>
    )
}