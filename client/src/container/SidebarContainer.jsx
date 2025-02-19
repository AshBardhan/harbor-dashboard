import Sidebar from '../components/molecules/Sidebar';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as TestnetsIcon } from '../assets/icons/testnets.svg';
import { ReactComponent as MembersIcon } from '../assets/icons/members.svg';
import { ReactComponent as ProjectKeyIcon } from '../assets/icons/project-key.svg';

let sidebarConfig = [
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
				count: 8,
				icon: ProjectKeyIcon,
				actionIcon: CopyIcon,
			},
		],
	},
];

export default function SidebarContainer() {
	return <Sidebar sections={sidebarConfig} />;
}
