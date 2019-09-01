import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
	count: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		maxWidth: '100%'
	}
}));

function Counter(props) {
	const classes = useStyles();
	const { increment, decrement, count } = props;

	return (
		<div className={classes.root}>
			<IconButton onClick={decrement}>
				<RemoveIcon />
			</IconButton>
			<Typography className={classes.count} variant="h6">{count}</Typography>
			<IconButton onClick={increment}>
				<AddIcon />
			</IconButton>
		</div>
	)
}

export default Counter;