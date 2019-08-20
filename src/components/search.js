import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { submitSearchForm } from '../ducks/products';


const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%'
    }
}));

const inputProps = { 'aria-label': 'search' };

function Search(props) {
    const { submitSearchForm } = props;
    const classes = useStyles();
    const [inputValue, setValue] = useState('');

    const setInputValue = (e) => {
        const value = e.target.value;

        if (value === '') {
           submitSearchForm('');
        }

        setValue(value);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        submitSearchForm(inputValue);
    };

    return (
        <form className={classes.search} onSubmit={onSubmitForm}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search product"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={inputProps}
                type='search'
                onChange={setInputValue}
                value={inputValue}
            />
        </form>
    )
}

export default connect(null, {
    submitSearchForm
})(Search);