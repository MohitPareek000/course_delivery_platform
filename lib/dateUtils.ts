/**
 * Date utility functions for IST (Indian Standard Time) handling
 * IST is UTC+5:30
 */

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds

/**
 * Get current date/time in IST
 * Returns a Date object representing the current IST time
 */
export function getISTDate(): Date {
  const now = new Date();
  // Add IST offset to get IST time, then create new Date
  return new Date(now.getTime() + IST_OFFSET_MS);
}

/**
 * Convert a UTC Date to IST Date
 */
export function toIST(date: Date): Date {
  return new Date(date.getTime() + IST_OFFSET_MS);
}

/**
 * Convert an IST Date back to UTC for comparison purposes
 */
export function fromIST(istDate: Date): Date {
  return new Date(istDate.getTime() - IST_OFFSET_MS);
}

/**
 * Get current timestamp in IST as ISO string
 */
export function getISTTimestamp(): string {
  return getISTDate().toISOString();
}

/**
 * Format a Date to IST display string
 */
export function formatISTDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    ...options,
  });
}

/**
 * Format a Date to IST with full date and time
 */
export function formatISTDateTime(date: Date): string {
  return formatISTDate(date, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

/**
 * Get IST date string for logging (compact format)
 */
export function getISTLogTimestamp(): string {
  const ist = getISTDate();
  return `${ist.toISOString().replace('T', ' ').replace('Z', '')} IST`;
}

/**
 * Calculate expiry date in IST (e.g., for OTP)
 * @param minutes - Number of minutes until expiry
 */
export function getISTExpiry(minutes: number): Date {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60 * 1000);
}

/**
 * Check if a date has expired (works with both UTC and IST stored dates)
 */
export function isExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate;
}
