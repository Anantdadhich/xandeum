'use client'

import { Search } from 'lucide-react'

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

<<<<<<< HEAD
export function SearchFilter({ 
  value, 
  onChange, 
  placeholder = 'Search something...' 
}: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
=======
export function SearchFilter({
  value,
  onChange,
  placeholder = 'Search by pubkey or IP address...'
}: SearchFilterProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground-muted)]" />
      <input
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
<<<<<<< HEAD
        className="pl-10 h-10 w-full bg-slate-50 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-slate-400"
=======
        className="w-full h-12 pl-12 pr-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)] text-white placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-subtle)] transition-all"
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
      />
    </div>
  )
}