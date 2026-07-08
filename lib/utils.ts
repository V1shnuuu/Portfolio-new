import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


/**
 * Combines tailwind classes safely using clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object into a readable format.
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    ...options,
  };
  return d.toLocaleDateString('en-US', defaultOptions);
}

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Smoothly scrolls to a target DOM element with an 80px offset for the fixed navbar.
 */
export function scrollToSection(id: string) {
  const elementId = id.replace('#', '');
  const element = document.getElementById(elementId);
  if (!element) return;

  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Splits a text string into character spans, resolving spaces as non-breaking spaces (\u00A0)
 * to maintain visual layout during letter-by-letter GSAP animation reveals.
 */
export function splitTextToSpans(text: string, className: string = '') {
  return text.split('').map((char, index) => {
    return React.createElement(
      'span',
      { key: `${char}-${index}`, className: `inline-block ${className}` },
      char === ' ' ? '\u00A0' : char
    );
  });
}

