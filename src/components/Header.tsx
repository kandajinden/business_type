"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E0E0E0] h-14 md:h-16 flex items-center px-4 md:px-8">
      <a href="/" className="flex items-center">
        {/* mizukaraロゴ (design.md §3) */}
        <img
          src="https://mizukara.com/wp-content/themes/goalb/assets_renew/images/header/logo.svg"
          alt="mizukara"
          className="h-6 md:h-7"
        />
      </a>
    </header>
  );
}
