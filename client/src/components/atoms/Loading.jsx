import React from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

const Loading = ({ message = 'Loading...', size = '' }) => {
	return (
		<div className={`loading ${size && `loading--${size}`}`}>
			<span className={`loading-icon ${size && `loading-icon--${size}`}`}></span>
			<span className={`loading-message ${size && `loading-message--${size}`}`}>{message}</span>
		</div>
	);
};

Loading.propTypes = {
	message: PropTypes.string,
	size: PropTypes.oneOf(['', 'big']),
};

export default Loading;
