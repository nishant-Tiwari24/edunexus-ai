import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-zinc-200 font-medium mb-1">{label}:</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-zinc-800 p-4 rounded-xl border-[rgba(255, 255, 255, 0.125)] border-[1px] "
      />
    </div>
  );
};

export default InputField;
