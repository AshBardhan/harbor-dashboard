import { ReactComponent as TickIcon } from '../assets/icons/tick.svg';
import { ReactComponent as HourglassIcon } from '../assets/icons/hourglass.svg';
import { ReactComponent as CheckAllIcon } from '../assets/icons/check-all.svg';
import { ReactComponent as FailedIcon } from '../assets/icons/failed.svg';
import { ReactComponent as KilledIcon } from '../assets/icons/killed.svg';

export const Status = {
    ALL: 'ALL',
    RUNNING: "RUNNING",
    PENDING: "PENDING",
    UPDATING: "UPDATING",
    FAILED: "FAILED",
    STOPPED: "STOPPED",
  };

  export const StatusLabelMapping = {
    [Status.ALL]: "All",
    [Status.RUNNING]: "Running",
    [Status.PENDING]: "Standing Up",
    [Status.UPDATING]: "Updating",
    [Status.FAILED]: "Failed",
    [Status.STOPPED]: "Stopped"
  };

  export const StatusColorMapping = {
    [Status.ALL]: "#2F80ED",
    [Status.RUNNING]: "#509900",
    [Status.PENDING]: "#DB9000",
    [Status.UPDATING]: "#DB9000",
    [Status.FAILED]: "#CD3A4C",
    [Status.STOPPED]: "#555555"
  };

  export const statusIconMap = {
    [Status.ALL]: CheckAllIcon,
    [Status.RUNNING]: TickIcon,
    [Status.PENDING]: HourglassIcon,
    [Status.UPDATING]: HourglassIcon,
    [Status.FAILED]: FailedIcon,
    [Status.STOPPED]: KilledIcon,

  };