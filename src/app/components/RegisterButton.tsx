import React from 'react';

interface RegisterButtonProps {
  onClick?: () => void;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
      onClick={onClick}
    >
      Register
    </button>
  );
};