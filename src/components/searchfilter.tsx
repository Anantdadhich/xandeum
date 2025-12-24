'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchFilter({ 
  value, 
  onChange, 
  placeholder = 'Search something...' 
}: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-10 w-full bg-slate-50 border-none rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-slate-400"
      />
    </div>
  )
}