import React from 'react';
import { render } from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

render(
	<Provider store={store}>
		<div>Goodbye world</div>
	</Provider>,
	document.getElementById('app')
);
