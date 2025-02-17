import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowDownShortIcon } from '../../assets/icons/arrow-down-short.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import './Header.scss';

const Header = ({ logoSrc, navItems }) => {
	return (
		<header className="page-header">
			<img width={97} src={logoSrc} alt="Logo" />
			<nav className="page-header-nav">
				{navItems.map((item, index) => (
					<Link key={index} className={`page-header-nav-item ${item.align ? `page-header-nav-item--${item.align}` : ''}`} href={item.href}>
						<item.icon width="14" height="14" />
						<span className="page-header-nav-item-label">{item.label}</span>
					</Link>
				))}
				<div className="page-header-nav-item">
					<UserIcon width="32" height="32" />
					<ArrowDownShortIcon width="12" height="12" />
				</div>
			</nav>
		</header>
	);
};

Header.propTypes = {
	logoSrc: PropTypes.string.isRequired,
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			href: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			icon: PropTypes.elementType.isRequired,
			align: PropTypes.string,
		})
	).isRequired,
};

export default Header;
