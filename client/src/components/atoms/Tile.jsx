import React from "react";
import PropTypes from "prop-types";
import "./Tile.scss";

const Tile = ({ theme, children, ...props }) => {
  return (
    <div className={`tile ${theme && `tile--${theme}`}`} {...props}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Tile;
