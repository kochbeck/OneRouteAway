"use client";

import React from 'react';

interface AuthButtonProps {
  onClick?: () => void;
}

export function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <button
      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      onClick={onClick}
    >
      Sign In / Register
    </button>
  );
}
