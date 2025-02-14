import React from "react";

export default function Text({
  type = "p",
  color,
  children,
  className,
  style = {},
  ...props
}) {
  const Element = type;
  const textStyles = {
    color,
    ...style,
  };

  return (
    <Element className={className} style={textStyles} {...props}>
      {children}
    </Element>
  );
}
