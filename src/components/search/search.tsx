/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export default function Search({ onSearch, onFocus, onBlur }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="flex items-center mb-5 w-full bg-gray-100 rounded-full p-2 max-w-sm mx-auto shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-[#707991]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="bg-gray-100 outline-none ml-3 text-gray-500 placeholder-gray-500 flex-grow"
      />
    </div>
  );
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
