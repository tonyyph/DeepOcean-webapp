"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navItems, siteLinks } from "@/content/landingContent";
import { LangToggle } from "@/components/ui/LangToggle";
import { T } from "@/components/ui/T";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`site-nav${scrolled ? " site-nav-scrolled" : ""}`}>
      <a className="nav-brand" href="#hero" aria-label="Deep Ocean home">
        <Image src="/assets/app-icon.png" alt="" width={34} height={34} />
        <span>Deep Ocean</span>
      </a>

      <div className={`nav-links${open ? " nav-links-open" : ""}`}>
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <T en={link.label.en} vi={link.label.vi} />
          </a>
        ))}
        <LangToggle />
      </div>

      <a className="nav-cta" href={siteLinks.primaryCta}>
        <T en="Coming soon" vi="Sắp ra mắt" />
      </a>

      <button
        className="nav-menu"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>
  );
}
