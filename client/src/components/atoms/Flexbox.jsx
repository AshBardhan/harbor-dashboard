import React from 'react';
import PropTypes from 'prop-types';

const Flexbox = ({ direction = 'row', justifyContent = 'flex-start', alignItems = 'stretch', gap = '0', wrap = 'nowrap', children, className = '', style = {}, ...props }) => {
	const flexStyles = {
		display: 'flex',
		flexDirection: direction,
		justifyContent: justifyContent,
		alignItems: alignItems,
		gap: gap,
		flexWrap: wrap,
		...style,
	};

	return (
		<div className={className} style={flexStyles} {...props}>
			{children}
		</div>
	);
};

Flexbox.propTypes = {
	direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
	justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
	alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
	gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
	children: PropTypes.node,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default Flexbox;
