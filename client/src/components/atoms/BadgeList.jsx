import React from "react";
import PropTypes from "prop-types";
import "./BadgeList.scss";

const BadgeList = ({ list }) => {
  return (
    <div className="badges">
      {list.map((item, index) => (
        <div key={index} className="badge">
          <img src={item} width={16} height={16} alt={`Badge ${index}`} />
        </div>
      ))}
    </div>
  );
};

BadgeList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BadgeList;
