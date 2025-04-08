"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface ClerkAuthProviderProps {
  children: ReactNode;
}

export default function ClerkAuthProvider({ children }: ClerkAuthProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
