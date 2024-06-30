import React from 'react';

interface LabelledInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const LabelledInput: React.FC<LabelledInputProps> = ({ id, type, value, onChange, label }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 border border-gray-600 rounded-md bg-[#0E093A] text-gray-300 focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

export default LabelledInput;
