"use client";

import Link from "next/link";

export default function MainNav() {
  return (
    <header className="nav__bar">
      <div className="nav__left">
        <Link href="/" className="nav__logo">
          Skinstric
        </Link>
        <span className="nav__section-label">[intro]</span>
      </div>

      <button type="button" className="nav__enter-code">
        Enter code
      </button>
    </header>
  );
}
