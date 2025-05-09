"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface LoginViewProps {
  onLoginSuccess?: () => void;
}

export function LoginView({ onLoginSuccess }: LoginViewProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to One Route Away</h2>
        
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors",
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "rounded-lg font-medium",
              socialButtonsBlockButtonText: "text-sm font-medium",
              formFieldInput: "dark:bg-gray-700 dark:text-white border dark:border-gray-600 rounded-lg",
              formFieldLabel: "dark:text-gray-300",
              footer: "hidden",
            },
          }}
          routing="virtual"
          signUpUrl="#"
          afterSignInUrl="/"
          redirectUrl="/"
        />
      </div>

      {/* Close button for mobile */}
      <button 
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={onLoginSuccess}
      >
        Cancel
      </button>
    </div>
  );
}
