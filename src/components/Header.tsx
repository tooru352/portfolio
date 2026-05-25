/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code, User, Compass, GraduationCap, Briefcase, Send, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#s1', label: t('nav.home'), icon: Compass },
    { href: '#s2', label: t('nav.about'), icon: User },
    { href: '#s3', label: t('nav.skills'), icon: Code },
    { href: '#s4', label: t('nav.experience'), icon: Briefcase },
    { href: '#s5', label: t('nav.projects'), icon: Compass },
    { href: '#s7', label: t('nav.education'), icon: GraduationCap },
    { href: '#s9', label: t('nav.contact'), icon: Send },
  ];

  // Dynamically slice brand name
  const brandName = t('brand');
  const brandParts = brandName.split(' ');
  const firstPart = brandParts.slice(0, 2).join(' ');
  const lastPart = brandParts.slice(2).join(' ');

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl transition-all duration-300">
      <nav 
        className={`w-full rounded-hero-btn px-6 py-3.5 flex items-center justify-between transition-all duration-300 ${
          scrolled 
            ? 'liquid-glass-strong shadow-primary' 
            : 'liquid-glass'
        }`}
      >
        {/* Brand Logo */}
        <a href="#s1" className="font-title text-base sm:text-lg font-black tracking-tight flex items-center gap-1 uppercase whitespace-nowrap shrink-0">
          <span className="text-white">
            {firstPart}
            {lastPart && <span className="text-white/60">.{lastPart}</span>}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap shrink">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full text-xs font-title font-medium tracking-wide whitespace-nowrap transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls & Language Selector */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-full text-[10px] font-mono tracking-wide font-bold shrink-0">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'en' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'vi' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              VI
            </button>
          </div>

          <a
            href="#s9"
            className="px-4 py-2 bg-white text-black hover:bg-white/95 rounded-hero-btn text-xs font-title font-bold tracking-wide shadow-primary flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            {t('btn.hire')}
            <Send className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Language selection in mobile */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-full text-[9px] font-mono font-bold">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'en' ? 'bg-white text-black' : 'text-white/50'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('vi')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'vi' ? 'bg-white text-black' : 'text-white/50'
              }`}
            >
              VI
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/5 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 p-4 liquid-glass-strong rounded-[24px] shadow-primary z-40 lg:hidden"
          >
            {/* Mobile language switch inside modal for ease of access */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Language / Ngôn ngữ
              </span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-full text-[10px] font-mono font-bold">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'en' ? 'bg-white text-black' : 'text-white/50'
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('vi')}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'vi' ? 'bg-white text-black' : 'text-white/50'
                  }`}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-white/15 text-white border-white/20' 
                        : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <link.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40'}`} />
                    {link.label}
                  </a>
                );
              })}
            </div>
            
            <a
              href="#s9"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-3.5 bg-white rounded-xl font-title font-bold text-sm text-black flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              {t('btn.connect')}
              <Send className="w-4 h-4 text-black" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
