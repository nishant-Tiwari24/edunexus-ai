import React, { useState } from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  icon: IconType;
  text: string;
  isOpen: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  icon: Icon,
  text,
  isOpen,
}) => {
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false); // Added for active state

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  const handleItemClick = () => {
    setActive(!active); // Toggle active state
    onClick(); // Trigger the onClick function passed as a prop
  };

  return (
    <div
      className={`flex items-center justify-between h-[42px] px-4 py-2 ${
        active ? "bg-white text-black" : "bg-black text-gray-400"
      } rounded-lg transition-colors duration-300 cursor-pointer`}
    >
      <div
        onClick={handleItemClick} // Update to use the new handler
        className="flex items-center space-x-4 w-full"
      >
        {isOpen && (
          <span
            className={`text-base ${checked ? "line-through" : ""} flex-grow`}
          >
            {text}
          </span>
        )}
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxClick}
            className="form-checkbox text-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
