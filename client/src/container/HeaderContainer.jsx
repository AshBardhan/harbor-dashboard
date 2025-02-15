import React from 'react';
import Header from '../components/molecules/Header';
import { ReactComponent as ProjectsIcon } from '../assets/icons/projects.svg';
import { ReactComponent as DocsIcon } from '../assets/icons/docs.svg';
import { ReactComponent as CommandSheetIcon } from '../assets/icons/command-sheet.svg';
import { ReactComponent as UserKeyIcon } from '../assets/icons/user-key.svg';

const navItems = [
	{ href: '#', label: 'Projects', icon: ProjectsIcon },
	{ href: '#', label: 'Docs', icon: DocsIcon },
	{ href: '#', label: 'Command cheatsheet', icon: CommandSheetIcon },
	{ href: '#', label: 'Your user key', icon: UserKeyIcon, align: 'right' },
];

export default function HeaderContainer() {
	return <Header logoSrc="/assets/images/harbor-logo.svg" navItems={navItems} />;
}
