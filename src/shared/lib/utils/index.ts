import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names into a single string
 * @param inputs - The class values to combine
 * @returns The combined class name
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
