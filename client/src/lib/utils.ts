import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a WhatsApp URL with a message
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  // Remove any non-numeric characters from the phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Create the WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
}

/**
 * Format a date based on the locale
 */
export function formatDate(date: string, locale: string): string {
  if (!date) return '';
  
  // Simple implementation - in a real app, use date-fns or Intl.DateTimeFormat
  return date;
}
