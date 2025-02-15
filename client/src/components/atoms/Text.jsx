import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ type = 'span', fontWeight, children, className, style = {}, ...props }) => {
	const Element = type;
	const textStyles = {
		fontWeight,
		...style,
	};

	return (
		<Element className={className} style={textStyles} {...props}>
			{children}
		</Element>
	);
};

Text.propTypes = {
	type: PropTypes.string,
	fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default Text;
