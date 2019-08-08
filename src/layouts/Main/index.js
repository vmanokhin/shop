import React from 'react';
import { Switch } from 'react-router-dom';

import { routes, renderRoutes } from '../../routes';


function Main() {
    return (
        <Switch>
            {routes.map(route => renderRoutes(route))}
        </Switch>
    );
}

export default Main;