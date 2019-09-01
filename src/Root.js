import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import store from './redux/store';
import history from './libs/history';
import App from './App';

const defaultTheme = createMuiTheme();

function Root() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Provider store={store} >
				<DndProvider backend={HTML5Backend}>
					<Router history={history}>
						<App />
					</Router>
				</DndProvider>
			</Provider>
		</ThemeProvider>
	);
}

export default Root;
