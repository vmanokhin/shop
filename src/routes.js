import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

export const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/product/:id',
        component: ProductPage
    },
    {
        path: '/product/',
        component: ProductPage
    },
    {
        path: '/cart/',
        component: CartPage
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: '*',
        component: NotFound
    }
];

export function renderRoutes(route) {
    const { path, routes, component: Component, ...rest } = route;
    return (
        <Route
            key={path}
            path={path}
            {...rest}
            render={props => (
                <Component {...props} routes={routes} />
            )}
        />
    )
}