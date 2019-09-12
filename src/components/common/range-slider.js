import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';

function RangeSlider(props) {
	const { 
		step,
		min, 
		max, 
		defaultValues,
		afterChange 
	} = props;

	const [start, end] = defaultValues;
	const defaults = (start || end) && (start !== min || end !== max)
	? defaultValues
	: [min, max];

	const [values, setValues] = useState(defaults);

	function onChangeHandler(_, values) {
		setValues(values);
	}

	return (
		<div>
			<Slider
				step={step}
        value={values}
				min={min}
				max={max}
				onChange={onChangeHandler}
        onChangeCommitted={afterChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
		</div>
	)
}

RangeSlider.defaultProps = {
	step: 10,
	defaultValues: []
};

RangeSlider.propTypes = {
	step: PropTypes.number,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	defaultValues: PropTypes.arrayOf(PropTypes.number),
	afterChange: PropTypes.func.isRequired
};

export default RangeSlider;