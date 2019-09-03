import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import './assets/sass/app.sass';

import Header from './layouts/Header';
import Main from './layouts/Main';
import Footer from './layouts/Footer';
import DragLayer from './components/common/drag-layer';


class App extends Component {
	render() {
		return (
			<div className='wrapper'>
				<CssBaseline />
				<Header />
				<Main />
				<Footer />
				<DragLayer />
			</div>
		);
	}
}

export default App;