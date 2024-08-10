interface NotificationIconProps {
  icon: React.ReactNode;
  count: number;
  bgColor: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  icon,
  count,
  bgColor,
}) => (
  <div className="relative">
    {icon}
    <span
      className={`absolute -top-2 -right-2 ${bgColor} text-xs rounded-full w-5 h-5 flex items-center justify-center`}
    >
      {count}
    </span>
  </div>
);

export default NotificationIcon;
