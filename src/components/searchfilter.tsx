'use client'

import { Search } from 'lucide-react'

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchFilter({
  value,
  onChange,
  placeholder = 'Search by pubkey or IP address...'
}: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-10 w-64 bg-[#141414] border border-[#252525] rounded-lg text-sm text-white focus:border-[#00FFAA]/50 focus:outline-none placeholder:text-[#666] transition-colors"
      />
    </div>
  )
}