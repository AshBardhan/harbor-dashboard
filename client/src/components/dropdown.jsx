import { useState } from "react";

export default function Dropdown({options, onChange}) {
    const [selected, setSelected] = useState(options[0]);

    const onItemClick = (option) => {
        if(selected !== option.value) {
            setSelected(option);
            onChange(option.value);
        }
    };

    return (
        <div style={{position: 'relative'}}>
            <span>{selected.label}</span>
            <div style={{position: 'absolute', top: '100%', right: '0', border : '1px solid', width: '100px'}}>
                {options.map(option => (
                    <div key={option.value} style={{cursor: 'pointer'}} onClick={() => onItemClick(option)}>
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
} 