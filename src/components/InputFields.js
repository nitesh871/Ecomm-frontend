import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputWithIcon = ({ icon, type, name, placeholder, value, onChange }) => {
  return (
    <div className="w-full relative flex border rounded-md">
    {/* Wrapper for input and icon */}
    <div className="w-full flex items-center">
        {/* Input field with padding for icon */}
        <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full flex-1 border focus:border-blue-400 rounded-md py-2 px-10" // Increased padding for space for icon
            required
        />
        
        {/* Icon inside the input field */}
        <FontAwesomeIcon
            icon={icon}
            className="text-blue-500 absolute left-3" // Positioning icon inside input field
        />
    </div>
</div>

  );
};

export default InputWithIcon;
