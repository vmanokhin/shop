import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import CategoryList from './category-list';
import PriceSlider from '../common/range-slider';
import Loader from '../common/loader';
import {
	loadFilters,
	categoriesSelector,
	setPrices,
	defaultsGetter,
	pricesSelector,
	moduleName
} from '../../ducks/filters';


const styles = theme => ({
	paper: {
		padding: theme.spacing(2)
	},
	subtitle: {
		fontSize: theme.typography.htmlFontSize
	}
});

class FiltersContainer extends Component {
	static propTypes = {
		min: PropTypes.number,
		max: PropTypes.number,
		loading: PropTypes.bool.isRequired,
		loaded: PropTypes.bool.isRequired,
		setPrices: PropTypes.func.isRequired,
		loadFilters: PropTypes.func.isRequired,
		categories: PropTypes.arrayOf(PropTypes.object)
	};

	priceAfterChangeHandler = (_, values) => {
		this.props.setPrices(values);
	};

	componentDidMount() {
		const { loadFilters, loading, loaded } = this.props;
		if (!loading && !loaded) loadFilters();
	}

	render() {
		const {
			loading,
			loaded,
			categories,
			classes,
			t,
			min,
			max,
			prices
		} = this.props;

		if (loading) return <Loader />;
		if (!loaded) return null;

		return (
			<div>
				{categories.length && <CategoryList categories={categories} />}

				<Paper className={classes.paper}>
					<Typography className={classes.subtitle} gutterBottom variant="subtitle2">
						{t('filters.price')}
					</Typography>

					<PriceSlider
						afterChange={this.priceAfterChangeHandler}
						min={min}
						max={max}
						step={50}
						defaultValues={prices}
					/>
				</Paper>
			</div>
		)
	}
}

export default connect(state => ({
	prices: pricesSelector(state),
	min: defaultsGetter(state).get('priceMin'),
	max: defaultsGetter(state).get('priceMax'),
	loading: state[moduleName].loading,
	loaded: state[moduleName].loaded,
	categories: categoriesSelector(state)
}), { loadFilters, setPrices })(withStyles(styles)(withTranslation()(FiltersContainer)));