import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles'
import SortDropdown from '../common/sort-dropdown';
import { sortProperties } from '../../ducks/filters';
import { changeSortProperty, moduleName } from '../../ducks/filters';


const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginBottom: '20px'
	}
}));


function SortContainer(props) {
	const classes = useStyles();
	const { sortProperty, changeSortProperty } = props;
	const label = `Sort by ${sortProperty}`;

	const onChangeHandler = (prop) => {
		if (sortProperties.includes(prop)) {
			changeSortProperty(prop);
		}
	};

	return (
		<div className={classes.container}>
			<SortDropdown 
				onChange={onChangeHandler}
				label={label}
				items={sortProperties}
			/>
		</div>
	)
}

export default connect(state => ({
	sortProperty: state[moduleName].sortProperty
}), { changeSortProperty })(SortContainer);