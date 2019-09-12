import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const { sortProperty, changeSortProperty } = props;
	
	const label = `${t('filters.sort_by')} ${t('filters.' + sortProperty)}`;

	const normalizedSortPropeties = sortProperties.map(key => ({
		key,
		label: t(`filters.${key}`)
	}))

	const onChangeHandler = (prop) => {
		changeSortProperty(prop);
	};

	return (
		<div className={classes.container}>
			<SortDropdown 
				onChange={onChangeHandler}
				label={label}
				items={normalizedSortPropeties}
			/>
		</div>
	)
}

export default connect(state => ({
	sortProperty: state[moduleName].sortProperty
}), { changeSortProperty })(SortContainer);