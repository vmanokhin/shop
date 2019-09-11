import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { languages } from '../../libs/i18next';

const useStyles = makeStyles(theme => ({
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
}));

function LanguageChanger(props) {
	const { i18n } = useTranslation();
	const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

	const changeLanguageHandler = (lang) => () => {
		setAnchorEl(null);

		if (i18n.language !== lang) {
			i18n.changeLanguage(lang);
		}
	}

	function renderMenuItems(items = []) {
    return items.map(item => (
			<MenuItem 
				key={item} 
				className={classes.menuItem} 
				onClick={changeLanguageHandler(item)}
				dense
			>
				{item}
			</MenuItem>
		));
	}

  return (
    <div>
			<IconButton className={classes.button} onClick={handleClick}>
				{i18n.language}
			</IconButton>

      <Menu
        keepMounted
        open={Boolean(anchorEl)}
				anchorEl={anchorEl}
        onClose={handleClose}
      >
				{renderMenuItems(languages)}
      </Menu>
    </div>
  );
}


export default LanguageChanger;