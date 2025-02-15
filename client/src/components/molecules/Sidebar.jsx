import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import Button from '../atoms/Button';
import './Sidebar.scss';

const Sidebar = ({ sections }) => {
	return (
		<nav className="page-sidebar-nav">
			{sections.map((section, sectionIndex) => (
				<div key={sectionIndex} className="page-sidebar-section">
					{section.backLink ? (
						<Button href={section.backLink.href} className="page-sidebar-backlink">
							<ArrowLeftIcon width="16" height="16" />
							<span>{section.backLink.text}</span>
						</Button>
					) : (
						<>
							<div className="page-sidebar-title">
								<section.titleIcon width="16" height="16" fill="#ddd" />
								<span>{section.title}</span>
							</div>
							<ul>
								{section.items.map((item, itemIndex) => (
									<li key={itemIndex}>
										<Link to={item.link} className={`page-sidebar-link ${item.selected ? 'selected' : ''}`}>
											<item.icon width="16" height="16" />
											<span>{item.title}</span>
											{item.count && <span className="count">{item.count}</span>}
											{item.actionIcon && (
												<Button className="action-icon">
													<item.actionIcon width="12" height="12" />
												</Button>
											)}
										</Link>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			))}
		</nav>
	);
};

Sidebar.propTypes = {
	sections: PropTypes.arrayOf(
		PropTypes.shape({
			backLink: PropTypes.shape({
				href: PropTypes.string.isRequired,
				text: PropTypes.string.isRequired,
			}),
			title: PropTypes.string,
			titleIcon: PropTypes.elementType,
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					title: PropTypes.string.isRequired,
					link: PropTypes.string.isRequired,
					count: PropTypes.number,
					icon: PropTypes.elementType.isRequired,
					actionIcon: PropTypes.elementType,
					selected: PropTypes.bool,
				})
			),
		})
	).isRequired,
};

export default Sidebar;
