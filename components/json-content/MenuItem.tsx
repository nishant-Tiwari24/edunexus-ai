import React from 'react';
import { IconType } from 'react-icons';

interface MenuItemProps {
  icon: IconType;
  text: string;
  isOpen: boolean;
  onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick:onClick, icon: Icon, text, isOpen }) => {
  return (
    <div onClick={onClick} className="flex items-center space-x-4 p-2 hover:bg-purple-900  rounded-lg transition-colors duration-300 cursor-pointer px-6">
      {isOpen && <span className="text-gray-400 text-base hover:text-white">{text}</span>}
    </div>
  );
};

export default MenuItem;
