import { useEffect, useRef, useState } from "react";
import Flexbox from "./flexbox";
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';

export default function Dropdown({options, selected, label, onChange}) {
    let selectedIndex = options.findIndex(option => option.value === selected);
    if (selectedIndex === -1) {
        selectedIndex= 0; 
    }
    const [selectedOption, setSelectedOption] = useState(options[selectedIndex]); 
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
  
    const onDropdownButtonClick = (e) => {
        setIsOpen(!isOpen);
        e.stopPropagation();
      };

    const onDropdownOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    const getDropdownIcon = (option) => {
        const IconComponent = option?.icon || null;
        return IconComponent ? <IconComponent width="14" height="14" /> : null;
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
                {label && <span className="dropdown-button-label">{label}</span>}
                <Flexbox alignItems="center" justifyContent="center" gap="5px" style={{color: selectedOption.color || '' }}>
                    {selectedOption.icon && getDropdownIcon(selectedOption)}
                    <span>{selectedOption.label}</span>
                </Flexbox>
                <ArrowDownIcon className="icon" width="10" height="10"/>
            </div>
            <div className={`dropdown-menu ${isOpen && 'open'}`}>
                {options.map(option => (
                    <div className={`dropdown-menu-option ${option.value === selectedOption.value && 'selected'}`} key={option.value} onClick={() => onDropdownOptionClick(option)}>
                        <Flexbox alignItems="center" justifyContent="center" gap="5px" style={{color: option.color || '' }}>
                            {option.icon && getDropdownIcon(option)}
                            {option.label}
                        </Flexbox>
                    </div>
                ))}
            </div>
        </div>
    );
} 