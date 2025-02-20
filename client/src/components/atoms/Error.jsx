import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

const Error = ({ children, size = '' }) => {
	return <div className={`error ${size && `error--${size}`}`}>{children}</div>;
};

Error.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf(['', 'big']),
};

export default Error;
