import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';


const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
		paddingRight: theme.spacing(2)
	},
	body: {
		fontSize: 14,
		paddingRight: theme.spacing(2)
	}
}))(TableCell);

function CartCell(props) {
	const { children, ...rest } = props;

	return (
		<StyledTableCell {...rest}>
			{children}
		</StyledTableCell>
	)
}

export default CartCell;