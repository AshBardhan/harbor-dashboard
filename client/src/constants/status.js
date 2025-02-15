import { ReactComponent as TickIcon } from '../assets/icons/tick.svg';
import { ReactComponent as HourglassIcon } from '../assets/icons/hourglass.svg';
import { ReactComponent as CloningIcon } from '../assets/icons/cloning.svg';
import { ReactComponent as CheckAllIcon } from '../assets/icons/check-all.svg';
import { ReactComponent as FailedIcon } from '../assets/icons/failed.svg';
import { ReactComponent as KilledIcon } from '../assets/icons/killed.svg';

export const Status = {
	ALL: 'ALL',
	RUNNING: 'RUNNING',
	PENDING: 'PENDING',
	UPDATING: 'UPDATING',
	CLONING: 'CLONING',
	FAILED: 'FAILED',
	STOPPED: 'STOPPED',
	KILLED: 'KILLED',
};

export const StatusLabelMapping = {
	[Status.ALL]: 'All',
	[Status.RUNNING]: 'Running',
	[Status.PENDING]: 'Standing Up',
	[Status.UPDATING]: 'Updating',
	[Status.CLONING]: 'Cloning',
	[Status.FAILED]: 'Failed',
	[Status.STOPPED]: 'Stopped',
	[Status.KILLED]: 'Killed',
};

export const StatusColorMapping = {
	[Status.ALL]: '#2F80ED',
	[Status.RUNNING]: '#509900',
	[Status.PENDING]: '#DB9000',
	[Status.UPDATING]: '#DB9000',
	[Status.CLONING]: '#7B61FF',
	[Status.FAILED]: '#CD3A4C',
	[Status.STOPPED]: '#555555',
	[Status.KILLED]: '#AAAAAA',
};

export const statusIconMap = {
	[Status.ALL]: CheckAllIcon,
	[Status.RUNNING]: TickIcon,
	[Status.PENDING]: HourglassIcon,
	[Status.UPDATING]: HourglassIcon,
	[Status.CLONING]: CloningIcon,
	[Status.FAILED]: FailedIcon,
	[Status.STOPPED]: FailedIcon,
	[Status.KILLED]: KilledIcon,
};
