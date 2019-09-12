import React from 'react';
import CartDropTarget from '../components/cart/cart-drop-target';
import FiltersContainer from '../components/filters/filters-container';

function Sidebar() {
	return (
		<div>
			<CartDropTarget />
			<FiltersContainer />
		</div>
	)
}

export default Sidebar;