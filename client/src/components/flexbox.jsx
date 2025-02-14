import React from "react";

const Flexbox = ({
  direction = "row",
  justifyContent = "flex-start",
  alignItems = "stretch",
  gap = "0",
  wrap = "nowrap",
  children,
  className = "",
  style = {},
  ...props
}) => {
  const flexStyles = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
    gap: gap,
    flexWrap: wrap,
    ...style,
  };

  return (
    <div className={className} style={flexStyles} {...props}>
      {children}
    </div>
  );
};

export default Flexbox;
