/**
 * WhatsApp contact utility
 * Stores the trainer's WhatsApp number and provides a normalized wa.me link
 */

// Store the exact number as provided by the user
export const TRAINER_WHATSAPP_NUMBER = "1+ 9549354101";

/**
 * Normalizes a phone number to E.164 format (digits only)
 * Removes all non-digit characters
 */
function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}

/**
 * Generates a WhatsApp wa.me deep link URL
 * Opens WhatsApp chat directly with the trainer's number
 * Falls back to WhatsApp Web if the app is not available
 */
export function getWhatsAppChatUrl(): string {
  const normalizedNumber = normalizePhoneNumber(TRAINER_WHATSAPP_NUMBER);
  return `https://wa.me/${normalizedNumber}`;
}

/**
 * Opens WhatsApp chat in a new window/tab
 * Handles popup blockers gracefully by falling back to direct navigation
 */
export function openWhatsAppChat(): void {
  const url = getWhatsAppChatUrl();
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  
  // Fallback if popup is blocked
  if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
    window.location.href = url;
  }
}
