import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CartRow from './cart-row';
import CartCell from './cart-cell';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto'
    },
    table: {
        minWidth: 700,
        maxWidth: '100%'
    }
}));


function CartTable(props) {
    const { items } = props;
    const classes = useStyles();

    if (!items.length) return null;

    const body = items.map(({ id, entities }) => <CartRow key={id} id={id} entities={entities}/>);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CartCell>Image</CartCell>
                        <CartCell align="left">Name</CartCell>
                        <CartCell align="right">Counts</CartCell>
                        <CartCell align="right">Price</CartCell>
                        <CartCell align="center">Delete</CartCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body}
                </TableBody>
            </Table>
        </Paper>
    )
}

CartTable.defaultProps = {
    items: []
};

export default CartTable;