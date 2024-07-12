import React from 'react';

interface RoadmapBoxProps {
  keyText: string;
  valueText: string;
  isLast: boolean;
  isThird: boolean;
}

const RoadmapBox: React.FC<RoadmapBoxProps> = ({ keyText, valueText, isLast, isThird }) => {
  return (
    <div className="relative flex flex-col items-center p-10 m-2 rounded-3xl border-[2px] border-zinc-600 text-center bg-gradient-to-r from-zinc-700 via-zinc-800 to-black text-white shadow-lg">
      <p className="font-medium text-lg text-gray-400">{keyText}</p>
      <p>{valueText}</p>
      {!isLast && (
        <div
          className={`absolute ${isThird ? 'bottom-0 left-1/2  transform -translate-x-1/2 translate-y-full ' : 'top-1/2 -rotate-90 right-0 transform translate-x-full -translate-y-1/2'} h-8 w-8`}
        >
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isThird ? (
                <></>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

export default RoadmapBox;
