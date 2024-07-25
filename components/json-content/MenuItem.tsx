import React, { useState } from 'react';
import { IconType } from 'react-icons';

interface MenuItemProps {
  icon: IconType;
  text: string;
  isOpen: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, icon: Icon, text, isOpen }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  return (
    <div className='flex justify-between'>
    <div
      onClick={onClick}
      className="flex items-center justify-between space-x-4 p-2 rounded-lg transition-colors duration-300 cursor-pointer px-6"
    >
      {isOpen && (
        <span className={`text-gray-400 text-base hover:text-white ${checked ? 'line-through' : ''}`}>
          {text}
        </span>
      )}
    </div>
    <div className='w-[20px] h-[20px]'>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxClick}
        className="form-checkbox  text-green-500 w-[20px] h-[20px]"
      />
    </div>
    </div>
  );
};

export default MenuItem;
