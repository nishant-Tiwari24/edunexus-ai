import React from "react";
import LogoComponent from "./Logo";
import NotificationIcon from "./Notification";
import UserComponent from "./Avatar";
import {
  FaEnvelope,
  FaBell,
  FaSearch,
  FaCalendarAlt,
  FaTrophy,
  FaMedal,
} from "react-icons/fa";

const ProgressBar = ({ currentDay, totalDays }) => {
  const progress = (currentDay / totalDays) * 100;
  return (
    <div className="flex items-center space-x-2">
      <FaCalendarAlt className="text-xl text-zinc-500" />
      <span>Day {currentDay}</span>
      <div className="w-48 bg-zinc-700 rounded-full h-1.5 mx-2">
        <div
          className="bg-lime-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <FaTrophy className="text-xl text-yellow-500" />
      <span>Day {totalDays}</span>
    </div>
  );
};

const TaskProgress = ({ completedTasks, totalTasks }) => {
  const progress = (completedTasks / totalTasks) * 100;
  return (
    <div className="flex items-center space-x-2">
      🎖️
      <div className="w-48 bg-zinc-700 text-zinc-400 rounded-full h-1.5 mx-2">
        <div
          className="bg-purple-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span>
        {completedTasks}/{totalTasks}
      </span>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="relative z-50 py-3 bg-black text-white border-b border-zinc-800 w-full">
      <div className="flex justify-between items-center w-full px-6">
        <div className="flex-shrink-0">
          <LogoComponent />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <div className="flex items-center space-x-4">
            <ProgressBar currentDay={50} totalDays={180} />
          </div>
          <TaskProgress completedTasks={770} totalTasks={4320} />
          <NotificationIcon
            icon={<FaEnvelope className="text-2xl" />}
            count={2}
            bgColor="bg-red-500"
          />
          <NotificationIcon
            icon={<FaBell className="text-2xl" />}
            count={3}
            bgColor="bg-green-500"
          />
          <UserComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;
