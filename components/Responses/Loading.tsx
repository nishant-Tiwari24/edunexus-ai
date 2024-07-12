import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-16 m-2 w-[500px] rounded-3xl bg-zinc-800 animate-pulse text-white shadow-lg"
          >
            <p className="bg-zinc-700 h-6 w-[450px] mb-2 rounded"></p>
            <p className="bg-zinc-700 h-4 w-[400px] rounded"></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
