"use client";

import React from 'react';
import { UserCircle } from 'lucide-react';

interface AuthButtonProps {
  onClick?: () => void;
}

export function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <button
      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex items-center justify-center"
      onClick={onClick}
      aria-label="Sign In or Register"
    >
      <UserCircle size={24} />
    </button>
  );
}
