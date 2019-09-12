import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { withTranslation } from 'react-i18next';
import { languages } from '../../libs/i18next';


const styles = theme => ({
	menuItem: {
		textTransform: 'uppercase',
		fontSize: theme.typography.fontSize
	},
	button: {
		color: theme.palette.common.white,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize,
		cursor: 'pointer',
		textTransform: 'uppercase'
	}
});

class LanguageChanger extends Component {
	static defaultProps = {
		classes: {}
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

	changeLanguageHandler = (lang) => () => {
		const { i18n } = this.props;

		this.setState({
			isOpen: false
		});

		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
		}
	}

	renderMenuItems(items = []) {
		const { classes } = this.props;

		return items.map(item => (
			<MenuItem
				key={item}
				className={classes.menuItem}
				onClick={this.changeLanguageHandler(item)}
				dense
			>
				{item}
			</MenuItem>
		));
	}

	render() {
		const { i18n, classes } = this.props;
		const { isOpen } = this.state;

		return (
			<div ref={this.refContainer}>
				<IconButton className={classes.button} onClick={this.handleClick}>
					{i18n.language}
				</IconButton>

				{this.refContainer.current && isOpen && <Menu
					keepMounted
					open={isOpen}
					anchorEl={this.refContainer.current}
					onClose={this.handleClose}
				>
					{this.renderMenuItems(languages)}
				</Menu>}
			</div>
		);
	}
}


export default withTranslation()(withStyles(styles)(LanguageChanger));