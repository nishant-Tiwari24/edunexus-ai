import LogoComponent from "./Logo";
import NotificationIcon from "./Notification";
import UserComponent from "./Avatar";
import { FaEnvelope, FaBell } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="relative z-50 py-3 bg-black text-white border-b border-zinc-800 w-full">
      <div className="flex justify-between items-center w-full px-6">
        <div className="flex-shrink-0">
          <LogoComponent />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
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
