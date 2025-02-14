import { ReactComponent as ProjectsIcon } from '../assets/icons/projects.svg';
import { ReactComponent as DocsIcon } from '../assets/icons/docs.svg';
import { ReactComponent as CommandSheetIcon } from '../assets/icons/command-sheet.svg';
import { ReactComponent as UserIcon } from '../assets/icons/user.svg';
import { ReactComponent as UserKeyIcon } from '../assets/icons/user-key.svg';
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';

export default function Header() {
	return (
		<header className="page-header">
			<img width={97} src="/assets/images/harbor-logo.svg" />
			<nav className="page-header-nav">
				<a className="page-header-nav-item" href="#">
					<ProjectsIcon width="14" height="14" />
					<span>Projects</span>
				</a>
				<a className="page-header-nav-item" href="#">
					<DocsIcon width="14" height="14" />
					<span>Docs</span>
				</a>
				<a className="page-header-nav-item" href="#">
					<CommandSheetIcon width="14" height="14" />
					<span>Command cheatsheet</span>
				</a>
				<a className="page-header-nav-item page-header-nav-item--right" href="#">
					<UserKeyIcon width="14" height="14" />
					<span>Your user key</span>
				</a>
				<div className="page-header-nav-item">
					<UserIcon width="32" height="32" />
					<ArrowDownIcon width="14" height="14" />
				</div>
			</nav>
		</header>
	);
}
