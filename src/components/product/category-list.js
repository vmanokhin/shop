import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withTranslation } from 'react-i18next';
import { 
	CategoryModel,
	setCurrentCategory, 
	moduleName as productsModuleName 
} from '../../ducks/products';


class CategoryList extends Component {
	static propTypes = {
		activeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		setCurrentCategory: PropTypes.func.isRequired,
		categories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryModel)).isRequired,
		t: PropTypes.func.isRequired
	};

	get elements() {
		const { categories, activeId, t } = this.props;

		if (!categories.length) return null;

		return (
			<Fragment>
				<ListItem
					selected={!activeId}
					button
					divider
					onClick={this.clickHandler('')}
				>
					<ListItemText primary={t('common.all')} />
				</ListItem>

				{categories.map(({ name, id }, index) => (
					<ListItem
						key={id}
						selected={activeId === id}
						button
						divider={index + 1 !== categories.length}
						onClick={this.clickHandler(id)}
					>
						<ListItemText primary={name} />
					</ListItem>
				))}
			</Fragment>
		)
	}

	clickHandler = (id) => () => {
		const { activeId, setCurrentCategory } = this.props;

		if (activeId !== id) {
			setCurrentCategory(id);
		}
	};

	render() {
		const categoryElements = this.elements;

		return (
			<Paper>
				<List component="nav">
					{categoryElements}
				</List>
			</Paper>
		);
	}
}

export default withTranslation()(connect(state => ({
	activeId: state[productsModuleName].activeCategoryId
}), { setCurrentCategory })(CategoryList));