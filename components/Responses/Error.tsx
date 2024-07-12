import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <div className="text-red-500 text-center mt-4">{message}</div>;
};

export default Error;
