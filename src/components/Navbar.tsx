import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  GraduationCap,
  User,
  ShieldCheck,
  Phone,
  Mail,
  ChevronDown,
  LogOut,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { settings, userSession, logout, setLoginModalOpen, activeSection } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'courses', label: 'কোর্সসমূহ' },
    { id: 'facilities', label: 'সুবিধাসমূহ' },
    { id: 'admission', label: 'ভর্তি' },
    { id: 'application-status', label: 'আবেদন যাচাই' },
    { id: 'notices', label: 'নোটিশ' },
    { id: 'gallery', label: 'গ্যালারি' },
    { id: 'certificate-verify', label: 'সার্টিফিকেট যাচাই' },
    { id: 'contact', label: 'যোগাযোগ' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-300">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{settings.tagline}</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Mail className="w-3 h-3 text-blue-400" />
              <span>{settings.email}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-400">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{settings.phone}</span>
            </span>

            {/* User session status badge */}
            {userSession.role !== 'guest' && (
              <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
                <span className="text-emerald-400 text-xs font-semibold">
                  {userSession.role === 'admin' ? '🛡️ অ্যাডমিন মোড' : `🎓 ${userSession.student?.name}`}
                </span>
                <button
                  onClick={logout}
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-0.5 text-xs transition-colors"
                  title="লগআউট"
                >
                  <LogOut className="w-3 h-3" />
                  <span>লগআউট</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-slate-200 shadow-sm py-2.5' : 'border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                {settings.instituteName}
              </span>
              <span className="hidden sm:block text-[11px] text-slate-500 font-medium tracking-wide">
                কম্পিউটার ও কারিগরি প্রশিক্ষণ ইনস্টিটিউট
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Login Dropdown / Portal Launcher */}
            <div className="relative">
              {userSession.role === 'guest' ? (
                <button
                  onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  <span>লগইন</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>
              ) : userSession.role === 'student' ? (
                <button
                  onClick={() => handleNavClick('student-dashboard')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>আমার ড্যাশবোর্ড</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('admin-panel')}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>অ্যাডমিন প্যানেল</span>
                </button>
              )}

              {/* Login Options Dropdown Menu */}
              {authDropdownOpen && userSession.role === 'guest' && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50"
                  onClick={() => setAuthDropdownOpen(false)}
                >
                  <button
                    onClick={() => setLoginModalOpen('student')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-semibold">শিক্ষার্থী লগইন</div>
                      <div className="text-[10px] text-slate-500">আইডি ও পাসওয়ার্ড দিয়ে প্রবেশ</div>
                    </div>
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button
                    onClick={() => setLoginModalOpen('admin')}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-semibold">ইনস্টিটিউট অ্যাডমিন</div>
                      <div className="text-[10px] text-slate-500">ম্যানেজমেন্ট কন্ট্রোল প্যানেল</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Online Admission CTA */}
            <button
              onClick={() => handleNavClick('admission')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-lg shadow-sm shadow-blue-700/30 transition-all whitespace-nowrap"
            >
              অনলাইনে ভর্তি হন
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('admission')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 rounded-md sm:hidden"
            >
              ভর্তি
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen('student');
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-center text-slate-800 bg-slate-100 rounded-lg flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>শিক্ষার্থী লগইন</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen('admin');
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-center text-amber-900 bg-amber-100 rounded-lg flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>অ্যাডমিন</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
