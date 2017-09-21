import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import Header from '../header';

// routing
import routes from '../../routes';
// global application styles
import './styles.css';



function App() {
    return (
        <div>
            <Helmet
                titleTemplate="%s - CNN.com"
                defaultTitle="CNN Tag Manager Prototype"
            >
                <meta name="description" content="A simple functional prototype for the CNN Tag Manager UI." />
            </Helmet>
            <Header />
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}

export default App;
