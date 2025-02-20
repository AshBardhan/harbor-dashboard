import React, { useState } from 'react';
import Sidebar from '../components/organisms/Sidebar';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as TestnetsIcon } from '../assets/icons/testnets.svg';
import { ReactComponent as MembersIcon } from '../assets/icons/members.svg';
import { ReactComponent as ProjectKeyIcon } from '../assets/icons/project-key.svg';

export default function SidebarContainer() {
	const [sidebarConfig, setSidebarConfig] = useState([
		{
			backLink: {
				href: '#',
				text: 'Back to all Projects',
			},
		},
		{
			title: 'Acme frontend',
			titleIcon: StarIcon,
			items: [
				{
					id: 'testnets',
					title: 'Testnets',
					link: '/testnets',
					count: 8,
					icon: TestnetsIcon,
					actionIcon: AddIcon,
					selected: true,
				},
				{
					id: 'members',
					title: 'Members',
					link: '/members',
					count: 1,
					icon: MembersIcon,
					actionIcon: AddIcon,
				},
				{
					id: 'project-key',
					title: 'Project Key',
					link: '/project-key',
					icon: ProjectKeyIcon,
					actionIcon: CopyIcon,
				},
			],
		},
	]);

	const updateSidebarLinkSelected = (itemIndex, sectionIndex) => {
		setSidebarConfig((prevConfig) => {
			const newConfig = [...prevConfig];
			newConfig[sectionIndex].items.forEach((item) => {
				item.selected = false;
			});
			newConfig[sectionIndex].items[itemIndex].selected = true;
			return newConfig;
		});
	};

	return <Sidebar sections={sidebarConfig} onSiderbarLinkClick={updateSidebarLinkSelected} />;
}
