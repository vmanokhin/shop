import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = theme => ({
	menuItem: {
		fontSize: theme.typography.fontSize
	},
	button: {
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize,
		cursor: 'pointer',
		textTransform: 'unset'
	}
});

class SortDropdown extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		label: PropTypes.string.isRequired,
		items: PropTypes.array.isRequired
	};
	
	state = {
		isOpen: false
	};

	refContainer = React.createRef();

	handleClick = () => {
		this.setState({
			isOpen: true
		});
	};

	handleClose = () => {
		this.setState({
			isOpen: false
		})
	};

	changeSortPropHandler = (prop) => () => {
		this.props.onChange(prop);

		this.setState({
			isOpen: false
		});
	};

	renderMenuItems(items = []) {
		const { classes } = this.props;

		return items.map(({ key, label }) => (
			<MenuItem
				key={key}
				className={classes.menuItem}
				onClick={this.changeSortPropHandler(key)}
				dense
			>
				{label}
			</MenuItem>
		));
	}

	render() {
		const { classes, items, label } = this.props;
		const { isOpen } = this.state;

		return (
			<div ref={this.refContainer}>
				<Button className={classes.button} onClick={this.handleClick}>
					{label}
					<ArrowDropDownIcon />
				</Button>

				{this.refContainer.current && isOpen && <Menu
					keepMounted
					open={isOpen}
					anchorEl={this.refContainer.current}
					onClose={this.handleClose}
				>
					{this.renderMenuItems(items)}
				</Menu>}
			</div>
		);
	}
}


export default withStyles(styles)(SortDropdown);