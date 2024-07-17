import React from 'react';
import { IconType } from 'react-icons';

interface MenuItemProps {
  icon: IconType;
  text: string;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, isOpen }) => {
  return (
    <div className="flex items-center space-x-4 p-2 hover:bg-purple-500 rounded-lg transition-colors duration-300 cursor-pointer px-6">
      {isOpen && <span className="text-zinc-300">{text}</span>}
    </div>
  );
};

export default MenuItem;
