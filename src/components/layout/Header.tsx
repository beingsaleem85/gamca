"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getAvailableCities } from "@/lib/medical-centers";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { MessageCircle, Menu, X, ShieldCheck, ChevronRight, ChevronDown, MapPin } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [medicalCentersDropdownOpen, setMedicalCentersDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const pathname = usePathname();

  const cityList = useMemo(() => {
    return getAvailableCities().filter((c) => c !== "All Cities");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Medical Token", href: "/book-medical-token" },
    { name: "Medical Centers", href: "/medical-centers", hasSubmenu: true },
    { name: "Medical Process", href: "/medical-process" },
    { name: "Documents", href: "/required-documents" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-amber-500/30"
          : "bg-white py-4 border-b border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex-shrink-0 bg-slate-50 rounded-lg p-1 border border-amber-500/40 group-hover:border-amber-600 transition-colors shadow-sm">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#061224] tracking-tight group-hover:text-amber-600 transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.hasSubmenu && pathname.startsWith("/medical-centers"));

              if (item.hasSubmenu) {
                return (
                  <div
                    key={item.href}
                    className="relative group"
                    onMouseEnter={() => setMedicalCentersDropdownOpen(true)}
                    onMouseLeave={() => setMedicalCentersDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                        isActive
                          ? "text-amber-800 bg-amber-500/10 font-bold border border-amber-500/30"
                          : "text-slate-700 hover:text-amber-700 hover:bg-slate-100/80"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                          medicalCentersDropdownOpen ? "rotate-180 text-amber-600" : ""
                        }`}
                      />
                    </Link>

                    {/* Submenu Dropdown */}
                    <div
                      className={`absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 transition-all duration-200 z-50 ${
                        medicalCentersDropdownOpen
                          ? "opacity-100 visible translate-y-1"
                          : "opacity-0 invisible translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider px-2.5 pb-2 mb-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span>Medical Centers by City</span>
                        <span className="text-[9px] text-slate-400 font-medium">Wafid Pakistan</span>
                      </div>

                      <div className="space-y-0.5 max-h-80 overflow-y-auto pr-0.5">
                        <Link
                          href="/medical-centers"
                          onClick={() => setMedicalCentersDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#061224] hover:bg-amber-500/10 hover:text-amber-800 rounded-lg transition-colors border-b border-slate-100 mb-1"
                        >
                          <span>All Medical Centers</span>
                          <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full">All Pakistan</span>
                        </Link>

                        {cityList.map((city) => (
                          <Link
                            key={city}
                            href={`/medical-centers?city=${encodeURIComponent(city)}`}
                            onClick={() => setMedicalCentersDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-amber-700 rounded-lg transition-colors group/item"
                          >
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-400 group-hover/item:text-amber-600 transition-colors" />
                              {city} Medical Centers
                            </span>
                            <ChevronRight className="w-3 h-3 text-slate-300 group-hover/item:text-amber-600 group-hover/item:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (item.href === "/book-medical-token" && pathname === "/book-medical-token") {
                      window.dispatchEvent(new Event("reset-medical-token-form"));
                    }
                  }}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? "text-amber-800 bg-amber-500/10 font-bold border border-amber-500/30"
                      : "text-slate-700 hover:text-amber-700 hover:bg-slate-100/80"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-xl bg-white hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center hover:scale-105"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-8 h-8 rounded-lg" />
            </a>
            <Link
              href="/book-medical-token"
              onClick={() => {
                if (pathname === "/book-medical-token") {
                  window.dispatchEvent(new Event("reset-medical-token-form"));
                }
              }}
              className="gold-btn px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Get Medical Token
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-7 h-7 rounded-md" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-amber-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.hasSubmenu && pathname.startsWith("/medical-centers"));

              if (item.hasSubmenu) {
                return (
                  <div key={item.href} className="space-y-1">
                    <div
                      className={`flex items-center justify-between px-4 py-3 text-base rounded-lg transition-colors ${
                        isActive
                          ? "text-amber-800 bg-amber-500/10 font-bold border border-amber-500/30"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 font-semibold"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileSubmenuOpen(!mobileSubmenuOpen);
                        }}
                        className="p-1 text-slate-500 hover:text-amber-700 focus:outline-none"
                        aria-label="Toggle city submenu"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            mobileSubmenuOpen ? "rotate-180 text-amber-600" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Mobile Submenu Items */}
                    {mobileSubmenuOpen && (
                      <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-amber-500/40 ml-4 bg-slate-50/70 rounded-r-xl">
                        <Link
                          href="/medical-centers"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-xs font-bold text-[#061224] hover:text-amber-700 border-b border-slate-200/60 pb-2 mb-1"
                        >
                          All Medical Centers
                        </Link>
                        {cityList.map((city) => (
                          <Link
                            key={city}
                            href={`/medical-centers?city=${encodeURIComponent(city)}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-amber-700"
                          >
                            {city} Medical Centers
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.href === "/book-medical-token" && pathname === "/book-medical-token") {
                      window.dispatchEvent(new Event("reset-medical-token-form"));
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-base rounded-lg transition-colors ${
                    isActive
                      ? "text-amber-800 bg-amber-500/10 font-bold border border-amber-500/30"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <Link
              href="/book-medical-token"
              onClick={() => {
                setMobileMenuOpen(false);
                if (pathname === "/book-medical-token") {
                  window.dispatchEvent(new Event("reset-medical-token-form"));
                }
              }}
              className="gold-btn w-full py-3.5 rounded-xl text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Get Medical Token
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
