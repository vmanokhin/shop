import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import store from './redux/store';
import history from './libs/history';
import App from './App';

const defaultTheme = createMuiTheme();

function Root() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Provider store={store} >
				<Router history={history}>
					<App />
				</Router>
			</Provider>
		</ThemeProvider>
	);
}

export default Root;
