import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, onClick, disabled, theme = '', size = '', className = '', ...props }) => {
	const Element = props.href ? 'a' : 'button';
	return (
		<Element className={`button ${theme && `button--${theme}`} ${size && `button--${size}`} ${className}`} onClick={onClick} disabled={disabled} {...props}>
			{children}
		</Element>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	theme: PropTypes.string,
	size: PropTypes.string,
	className: PropTypes.string,
};

export default Button;
