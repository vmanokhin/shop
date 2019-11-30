import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { SnackbarProvider } from 'notistack';
import './libs/i18next';
import store from './redux/store';
import App from './App';
import Loader from './components/common/loader';
import { isDevelopment, appName } from './config';

const defaultTheme = createMuiTheme();
const basename = isDevelopment ? '/' : `/${appName}`;

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
						<Router basename={basename}>
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
