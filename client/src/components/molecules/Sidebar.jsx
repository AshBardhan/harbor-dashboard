import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightShortIcon } from '../../assets/icons/arrow-right-short.svg';

import Button from '../atoms/Button';
import './Sidebar.scss';
import Text from '../atoms/Text';

const Sidebar = ({ sections }) => {
	const [showSlidingSidebar, setShowSlidingSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSlidingSidebar(!showSlidingSidebar);
	};

	return (
		<aside className={`page-sidebar ${!showSlidingSidebar ? 'hide' : ''}`}>
			<nav className="page-sidebar-nav">
				<div className="page-sidebar-slider-button">
					<Button className="action-button" onClick={toggleSidebar}>
						<ArrowRightShortIcon width="12" height="12" />
					</Button>
				</div>
				{sections.map((section, sectionIndex) => (
					<div key={sectionIndex} className="page-sidebar-section">
						{section.backLink ? (
							<Button href={section.backLink.href} className="page-sidebar-backlink">
								<ArrowLeftIcon width="16" height="16" />
								<Text className="title">{section.backLink.text}</Text>
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
												<Text className="title">{item.title}</Text>
												{item.count && <span className="count">{item.count}</span>}
												{item.actionIcon && (
													<Button className="action-button">
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
		</aside>
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
