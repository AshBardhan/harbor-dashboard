// utils/StatusEnums.js
export const Status = {
    ALL: 'ALL',
    RUNNING: "RUNNING",
    PENDING: "PENDING",
    UPDATING: "UPDATING",
    FAILED: "FAILED",
    STOPPED: "STOPPED",
  };

  export const StatusLabelMapping = {
    ALL: "All",
    RUNNING: "Running",
    PENDING: "Standing Up",
    UPDATING: "Updating",
    FAILED: "Failed",
    STOPPED: "Stopped"
  };

  export const StatusColorMapping = {
    ALL: "#2F80ED",
    RUNNING: "#509900",
    PENDING: "#DB9000",
    UPDATING: "#DB9000",
    FAILED: "#CD3A4C",
    STOPPED: "#555555"
  };