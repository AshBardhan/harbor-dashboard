import { ReactComponent as ArrowLeftIcon } from '../assets/icons/arrow-left.svg';
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as CopyIcon } from '../assets/icons/copy.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { ReactComponent as TestnetsIcon } from '../assets/icons/testnets.svg';
import { ReactComponent as MembersIcon } from '../assets/icons/members.svg';
import { ReactComponent as ProjectKeyIcon } from '../assets/icons/project-key.svg';

export default function Sidebar() {
	return (
		<nav className="page-sidebar-nav">
			<div className="page-sidebar-section">
				<a href="#" className="page-sidebar-backlink">
					<ArrowLeftIcon width="16" height="16" fill="currentColor" />
					<span>Back to all Projects</span>
				</a>
			</div>
			<div className="page-sidebar-section">
				<div className="page-sidebar-title">
					<StarIcon width="16" height="16" fill="#ddd" />
					<span>Acme frontend</span>
				</div>
				<ul>
					<li className="selected">
						<TestnetsIcon width="16" height="16" fill="currentColor" />
						<span>Testnets</span>
						<span className="count">8</span>
						<AddIcon width="12" height="12" className="action-icon" />
					</li>
					<li>
						<MembersIcon width="16" height="16" fill="currentColor" />
						<span>Members</span>
						<span className="count">1</span>
						<AddIcon width="12" height="12" className="action-icon" />
					</li>
					<li>
						<ProjectKeyIcon width="16" height="16" fill="currentColor" />
						<span>Project Key</span>
						<span className="count">8</span>
						<CopyIcon width="12" height="12" className="action-icon" />
					</li>
				</ul>
			</div>
		</nav>
	);
}
