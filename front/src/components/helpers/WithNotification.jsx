import React from 'react'
import HeaderIcon from './HeaderIcon'
import { useSelector } from 'react-redux';

const WithNotification = ({ Icon, pageToNavigate}) => {
    const notification = useSelector(state=>state.presisted.notification);
    const notificationCount = notification.length;
    return (
      <div className="relative">
        <HeaderIcon Icon={Icon} pageToNavigate={pageToNavigate} />
        {notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notificationCount}
          </div>
        )}
      </div>
    );
  };

export default WithNotification
