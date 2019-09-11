import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function MessageBar(props) {
	const { text, isOpen, onClose, children, timeout, ...rest } = props;
  const classes = useStyles();
	const { t } = useTranslation();

	const actions = [
		<IconButton
			key="close"
			aria-label={t('buttons.close')}
			color="inherit"
			className={classes.close}
			onClick={onClose}
		>
			<CloseIcon />
		</IconButton>
	];

  return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={isOpen}
			autoHideDuration={timeout}
			onClose={onClose}
			message={children || text}
			action={actions}
			{...rest}
		/>
  );
}

MessageBar.propTypes = {
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	timeout: PropTypes.number,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func
};

MessageBar.defaultProps = {
	text: '',
	timeout: 5000,
	isOpen: false,
	onClose: null
};

export default MessageBar;