import React, { useState } from "react";

export default function Dropdown({ title, children = [], lastItem = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="relative group py-4">
        <button
          className="flex items-center justify-between w-full lg:w-auto lg:justify-start lg:gap-1 text-sm text-slate-600 hover:text-black focus:outline-none"
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {title}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <ul
          className={[
            "absolute left-0 top-full min-w-[180px] bg-white border border-gray-200 rounded shadow-lg transition-all duration-200 z-20",
            isOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none translate-y-2",
            lastItem ? "right-0 left-auto" : ""
          ].join(" ")}
        >
          {children.map((child, i) => (
            <li key={i}>
              <a
                href={child.path}
                className="block px-4 text-sm text-slate-700 hover:bg-slate-100"
              >
                {child.title}
              </a>
            </li>
          ))}
        </ul>
      </li>
      {/* Mobile/expanded links */}
      <ul className={isOpen ? "block lg:hidden" : "hidden lg:hidden"}>
        {children.map((child, i) => (
          <li key={i}>
            <a
              href={child.path}
              className="flex lg:px-3 py-4 items-center text-sm text-slate-600 hover:text-black"
            >
              <span>&emsp;{child.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}