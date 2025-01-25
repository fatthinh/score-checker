import React from 'react';

function SingleSelect({ label, options = [], defaultValue, onChange, name }) {
    return (
        <label className="block text-md">
            <span className="text-gray-700 font-semibold">{label}</span>
            <select
                className="h-10 block w-full mt-1 text-md form-select focus:border-primary-400 focus:outline-none focus:shadow-outline-purple border px-2 py-1 rounded-lg"
                defaultValue={defaultValue}
                onChange={(e) => onChange && onChange(e.target.value)}
                name={name}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default SingleSelect;
