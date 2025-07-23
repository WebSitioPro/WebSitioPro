/**
 * URL utility functions for clean client URLs
 */

/**
 * Generates a clean URL slug from a business name
 * Removes special characters, spaces, and converts to lowercase
 * Example: "Dr. Juan García" -> "dr.juangarcia"
 */
export function generateClientSlug(businessName: string): string {
  return businessName
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
    .replace(/\s+/g, '') // Remove all spaces
    .trim();
}

/**
 * Generates a full client URL from business name and client ID
 * Format: "dr.juangarcia43"
 */
export function generateClientUrl(businessName: string, clientId: number): string {
  const slug = generateClientSlug(businessName);
  return `${slug}${clientId}`;
}

/**
 * Parses a client URL to extract the client ID
 * Assumes the ID is at the end of the URL slug
 */
export function parseClientUrl(urlSlug: string): { clientId: number | null; slug: string } {
  // Extract trailing numbers
  const match = urlSlug.match(/^(.+?)(\d+)$/);
  
  if (match) {
    const [, slug, idStr] = match;
    const clientId = parseInt(idStr, 10);
    return { clientId: isNaN(clientId) ? null : clientId, slug };
  }
  
  return { clientId: null, slug: urlSlug };
}

/**
 * Validates if a URL slug matches a business name and client ID
 */
export function validateClientUrl(urlSlug: string, businessName: string, clientId: number): boolean {
  const expectedUrl = generateClientUrl(businessName, clientId);
  return urlSlug === expectedUrl;
}