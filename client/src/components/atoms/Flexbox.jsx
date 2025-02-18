import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Flexbox = ({
	direction = 'row',
	justifyContent = 'flex-start',
	alignItems = 'stretch',
	gap = '0',
	wrap = 'nowrap',
	breakpoint = null, // Optional breakpoint for responsiveness
	children,
	className = '',
	style = {},
	...props
}) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// Update windowWidth on window resize
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		// Add event listener for window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// Determine the flex direction based on the window width and breakpoint
	const calculateFlexDirection = () => {
		return breakpoint && windowWidth <= breakpoint ? (direction === 'row' ? 'column' : 'row') : direction;
	};

	const calculateAlignItems = () => {
		return breakpoint && windowWidth <= breakpoint ? (direction === 'row' ? '' : 'center') : alignItems;
	};

	const calculatejustifyContent = () => {
		return breakpoint && windowWidth <= breakpoint ? (direction === 'row' ? 'center' : '') : justifyContent;
	};

	// Flexbox styles
	const flexStyles = {
		display: 'flex',
		flexDirection: calculateFlexDirection(),
		justifyContent: calculatejustifyContent(),
		alignItems: calculateAlignItems(),
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
	direction: PropTypes.oneOf(['row', 'column']),
	justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
	alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center', 'baseline']),
	gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
	breakpoint: PropTypes.number,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default Flexbox;
