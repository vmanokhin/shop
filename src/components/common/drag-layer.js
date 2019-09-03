import React from 'react';
import { DragLayer } from 'react-dnd';
import ProuctDragPreview from '../product/product-drag-preview';
import { PRODUCT } from '../../ducks/products';
import throttle from 'lodash/throttle';

const THROTTLE_TIMEOUT = 16;

const layerStyles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none'
};

function getCurrentPreview(item) {
	switch(item.type) {
		case PRODUCT: {
			return <ProuctDragPreview {...item} />
		}

		default: return null;
	}
}

function CustomDragLayer(props) {
	const { isDragging, item, offset, clientOffset } = props;
  
	if (!isDragging || !item || !offset) return null;

	const { x, y } = offset;
	const shiftX = clientOffset.x - x;
	const shiftY = clientOffset.y - y;
  const transform = `translate(${x + shiftX}px, ${y + shiftY}px)`;

	const preview = getCurrentPreview(item);

	if (!preview) return null; 
	
  return (
		<div style={layerStyles}>
			<div style={{ willChange: 'transform', transform }}>
				{preview}
			</div>
		</div>
  )
}

export default DragLayer(throttle(monitor => ({
	clientOffset: monitor.getClientOffset(),
	offset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
	item: monitor.getItem()
}), THROTTLE_TIMEOUT))(CustomDragLayer);