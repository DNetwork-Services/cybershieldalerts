'use client';

import { useState } from 'react';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-cyber-cyan text-cyber-black'
            : 'bg-cyber-gray/50 text-gray-400 hover:text-white hover:bg-cyber-gray'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onChange(category.slug)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-cyber-cyan text-cyber-black'
              : 'bg-cyber-gray/50 text-gray-400 hover:text-white hover:bg-cyber-gray'
          }`}
        >
          {category.name}
          <span className="ml-1 text-xs opacity-70">({category.count})</span>
        </button>
      ))}
    </div>
  );
}
