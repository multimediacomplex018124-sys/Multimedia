import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Youtube, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, courses } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Institute Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {settings.instituteName}
              </span>
            </div>

            <p className="text-amber-300 font-semibold text-sm">
              “{settings.tagline}”
            </p>

            <p className="text-slate-400 leading-relaxed text-xs">
              {settings.aboutIntro}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-850 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors text-slate-300 border border-slate-800"
                title="ফেসবুক"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-850 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors text-slate-300 border border-slate-800"
                title="ইউটিউব"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-850 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-300 border border-slate-800"
                title="হোয়াটসঅ্যাপ"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              দ্রুত লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  হোম পেজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities')}
                  className="hover:text-white transition-colors"
                >
                  সুবিধাসমূহ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admission')}
                  className="hover:text-white transition-colors"
                >
                  অনলাইনে ভর্তি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('application-status')}
                  className="hover:text-white transition-colors"
                >
                  আবেদনের অবস্থা
                </button>
              </li>
            </ul>
          </div>

          {/* Courses Menu */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              প্রশিক্ষণ কোর্সসমূহ
            </h4>
            <ul className="space-y-2">
              {courses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="hover:text-white transition-colors text-left truncate max-w-xs block"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & Office Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              সার্টিফিকেট ও যোগাযোগ
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('certificate-verify')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>✓ সার্টিফিকেট যাচাই করুন</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors"
                >
                  ইনস্টিটিউট নোটিশ বোর্ড
                </button>
              </li>
              <li className="pt-2 text-[11px] space-y-1 text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{settings.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{settings.address}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-4 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p>© 2026 {settings.instituteName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
