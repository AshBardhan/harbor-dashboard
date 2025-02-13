import { useEffect, useRef, useState } from "react";
import Flexbox from "./flexbox";

export default function Dropdown({options, onChange}) {
    const [selected, setSelected] = useState(options[0]); 
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const onDropdownButtonClick = (e) => {
        setIsOpen(!isOpen);
        e.stopPropagation();
      };

    const onDropdownOptionClick = (option) => {
        setSelected(option);
        onChange(option.value);
        setIsOpen(false);
    };

    useEffect(() => {
        const pageClickEvent = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
          }
        };
        window.addEventListener('click', pageClickEvent);
        return () => {
          window.removeEventListener('click', pageClickEvent);
        }
    });

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-button" onClick={onDropdownButtonClick}>
                <Flexbox alignItems="center" justifyContent="center" gap="5px" style={{color: selected.color || '' }}>
                    {selected.icon && (<span className="icon"></span>)}
                    {selected.label}
                </Flexbox>
            </div>
            <div className={`dropdown-menu ${isOpen && 'open'}`}>
                {options.map(option => (
                    <div className={`dropdown-menu-option ${option.value === selected.value && 'selected'}`} key={option.value} onClick={() => onDropdownOptionClick(option)}>
                        <Flexbox alignItems="center" justifyContent="center" gap="5px" style={{color: option.color || '' }}>
                            {option.icon && (<span className="icon"></span>)}
                            {option.label}
                        </Flexbox>
                    </div>
                ))}
            </div>
        </div>
    );
} 