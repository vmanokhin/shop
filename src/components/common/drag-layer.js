import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import ProuctDragPreview from '../product/product-drag-preview';
import { PRODUCT } from '../../ducks/products';


const THROTTLE_TIMEOUT = 16;
const FORCE_UPDATE_TIMEOUT = 50;

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


class CustomDragLayer extends Component {
	lastUpdate = Date.now();
  timer = null;

  shouldComponentUpdate() {
		clearTimeout(this.timer);

		const now = Date.now();

    if (now - this.lastUpdate > THROTTLE_TIMEOUT) {
      this.lastUpdate = now;
      return true;
    }

		this.timer = setTimeout(() => {
			this.forceUpdate();
		}, FORCE_UPDATE_TIMEOUT);

    return false;
  }

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() {
		const { isDragging, item, offset, clientOffset } = this.props;
		
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
}

export default DragLayer(monitor => ({
	clientOffset: monitor.getClientOffset(),
	offset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
	item: monitor.getItem()
}))(CustomDragLayer);