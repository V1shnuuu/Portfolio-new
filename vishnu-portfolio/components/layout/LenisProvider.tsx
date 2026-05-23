'use client';

import React from 'react';
import { useLenis } from '@/animations/useLenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  // Initialize Lenis smooth scrolling and bind it to the window
  useLenis();

  return <>{children}</>;
}

export default LenisProvider;
