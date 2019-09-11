import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { SnackbarProvider } from 'notistack';
import './libs/i18next';
import store from './redux/store';
import history from './libs/history';
import App from './App';
import Loader from './components/common/loader';

const defaultTheme = createMuiTheme();

function Root() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Provider store={store} >
				<DndProvider backend={HTML5Backend}>
					<SnackbarProvider 
						maxSnack={5}
						autoHideDuration={3000}
						hideIconVariant
						disableWindowBlurListener
					>
						<Router history={history}>
							<Suspense fallback={<Loader />}>
								<App />
							</Suspense>
						</Router>
					</SnackbarProvider>
				</DndProvider>
			</Provider>
		</ThemeProvider>
	);
}

export default Root;
