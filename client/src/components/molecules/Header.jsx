import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import "./Header.scss";

const Header = ({ logoSrc, navItems }) => {
  return (
    <header className="page-header">
      <img width={97} src={logoSrc} alt="Logo" />
      <nav className="page-header-nav">
        {navItems.map((item, index) => (
          <Link
            key={index}
            className={`page-header-nav-item ${item.align && `page-header-nav-item--${item.align}`}`}
            href={item.href}
          >
            <item.icon width="14" height="14" />
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="page-header-nav-item">
          <UserIcon width="32" height="32" />
          <ArrowDownIcon width="12" height="12" />  
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      align: PropTypes.string,
    })
  ).isRequired,
};

export default Header;
