"use client";

import { useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import useClickOutside from "@/app/hooks/userclicksoutside";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { name: "Profile", route: "/profile" },
  { name: "Settings", route: "/settings" },
  { name: "Dashboard", route: "/dashboard" },
  { name: "Support", route: "/support" },
  { name: "Help", route: "/help" },
];

const UserComponent: React.FC = () => {
  const { data: session } = useSession();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const router = useRouter();

  const toggleDropdown = useCallback(() => {
    setIsDropdownVisible((prev) => !prev);
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownVisible(false);
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
    router.push("/");
  }, [router]);

  const handleNavigation = useCallback(
    (route: string) => {
      router.push(route);
      setIsDropdownVisible(false);
    },
    [router]
  );

  const dropdownRef = useClickOutside(handleCloseDropdown);

  return (
    <div className="relative hidden md:flex items-center space-x-2">
      <button onClick={toggleDropdown}>
        <span>{session?.user?.email || "User"}</span>
      </button>

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 top-8 bg-zinc-800 rounded-md shadow-lg z-50"
        >
          <ul className="py-1 text-white">
            {menuItems.map(({ name, route }) => (
              <li
                key={name}
                className="px-4 py-2 hover:bg-green-600 cursor-pointer"
                onClick={() => handleNavigation(route)}
              >
                {name}
              </li>
            ))}
            <li
              className="px-4 py-2 hover:bg-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
