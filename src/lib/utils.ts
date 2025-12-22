import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenPubkey(pubkey: string, chars: number = 8): string {
  if (!pubkey || pubkey.length <= chars * 2) return pubkey
  return `${pubkey.slice(0, chars)}...${pubkey.slice(-chars)}`
}