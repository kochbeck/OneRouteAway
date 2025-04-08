"use client";

import React from "react";

interface LoginViewProps {
  onLoginSuccess?: () => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  // In a real application, this would use the Clerk widget
  // For now, we'll create a simple placeholder

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to One Route Away</h2>
        
        <div className="space-y-4">
          <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
            <p>This is where the Clerk.js widget would appear.</p>
            <p className="text-sm">It would provide options for email/password login and OAuth providers.</p>
          </div>
          
          <div className="space-y-3">
            <button 
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              onClick={onLoginSuccess}
            >
              Sign in with Email
            </button>
            
            <button 
              className="w-full py-2 px-4 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg border border-gray-300 transition-colors flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
              onClick={onLoginSuccess}
            >
              Continue with Google
            </button>
            
            <button 
              className="w-full py-2 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium rounded-lg transition-colors flex items-center justify-center"
              onClick={onLoginSuccess}
            >
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
