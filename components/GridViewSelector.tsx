'use client';

import React from 'react';

export type GridColumns = 2 | 3 | 4 | 5;

interface GridViewSelectorProps {
  columns: GridColumns;
  onChange: (cols: GridColumns) => void;
  className?: string;
}

export default function GridViewSelector({ columns, onChange, className = '' }: GridViewSelectorProps) {
  const options: { cols: GridColumns; bars: number; label: string }[] = [
    { cols: 2, bars: 2, label: '2 Columns' },
    { cols: 3, bars: 3, label: '3 Columns' },
    { cols: 4, bars: 4, label: '4 Columns' },
    { cols: 5, bars: 5, label: '5 Columns' },
  ];

  return (
    <div 
      className={`inline-flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 h-[40px] sm:h-[42px] shrink-0 ${className}`}
      role="group"
      aria-label="Grid view column selector"
    >
      {options.map((opt) => {
        const isActive = columns === opt.cols;
        // 2 and 3 visible on mobile; 4 on tablet+; 5 on desktop
        const visibility = 
          opt.cols === 5 
            ? 'hidden md:flex' 
            : opt.cols === 4 
            ? 'hidden sm:flex' 
            : 'flex';

        return (
          <button
            key={opt.cols}
            type="button"
            onClick={() => onChange(opt.cols)}
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={isActive}
            className={`h-full px-2.5 sm:px-3 rounded-lg items-center justify-center transition-all cursor-pointer ${visibility} ${
              isActive
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-200/60'
            }`}
          >
            <span className="flex items-center gap-[2.5px] py-1" aria-hidden="true">
              {Array.from({ length: opt.bars }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3.5 rounded-full transition-colors ${
                    opt.cols === 5
                      ? 'w-[2px]'
                      : opt.cols === 4
                      ? 'w-[2px]'
                      : 'w-[2.5px]'
                  } ${isActive ? 'bg-white' : 'bg-slate-500'}`}
                />
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}


