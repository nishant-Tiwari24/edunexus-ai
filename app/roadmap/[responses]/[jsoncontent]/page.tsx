import React from 'react';
import Sidebar from '@/components/json-content/Sidebar';
import JsonContentPage from '@/components/json-content/MainPage';

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <JsonContentPage/>
      </div>
    </div>
  );
};

export default Home;
