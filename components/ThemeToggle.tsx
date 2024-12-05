import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';


export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <div 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
        className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        {theme === 'light' ? (
          <Moon 
            className="text-gray-600 hover:text-gray-900 transition-colors" 
            size={24} 
          />
        ) : (
          <Sun 
            className="text-yellow-500 hover:text-yellow-600 transition-colors" 
            size={24} 
          />
        )}
      </div>
    );
  };