import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Laptop, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onApplyNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onApplyNow }) => {
  const { settings } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 pt-8 pb-16 lg:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Institute Trust Marker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100/70 border border-blue-200/80 text-blue-900 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>কারিগরি ও ব্যবহারিক কম্পিউটার প্রশিক্ষণ কেন্দ্র</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.25] text-balance">
              {settings.tagline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {settings.instituteName}ে আধুনিক ও যুগোপযোগী প্রশিক্ষণের মাধ্যমে আপনার দক্ষতা ও ক্যারিয়ারকে এগিয়ে নিন।
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-md shadow-blue-700/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onApplyNow}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-blue-900 bg-white hover:bg-blue-50/70 active:scale-95 border border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>অনলাইনে ভর্তি হন</span>
              </button>
            </div>

            {/* Value Indicators */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>৩, ৬ মাস ও ১ বছর মেয়াদী কোর্স</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                <span>১০০% কম্পিউটার ল্যাব প্র্যাকটিস</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>সুবিধাজনক শিফট ও রুটিন</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/src/assets/images/hero_training_lab_1790844966675.jpg"
                alt="মাল্টিমিডিয়া কমপ্লেক্স কম্পিউটার ল্যাব"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>নতুন ব্যাচে সীমিত আসনে ভর্তি চলছে</span>
                </div>
                <div className="text-base sm:text-lg font-bold mt-1">
                  মাল্টিমিডিয়া কমপ্লেক্স প্রশিক্ষণ ল্যাব
                </div>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
                  ব্যবহারিক কাজের মাধ্যমে আধুনিক তথ্যপ্রযুক্তির বাস্তবমুখী জ্ঞান অর্জনের বিশ্বস্ত প্রতিষ্ঠান।
                </p>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg border border-slate-200/90 p-3.5 items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
                ✓
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">যাচাইযোগ্য সার্টিফিকেট</div>
                <div className="text-slate-500">অনলাইন ডাটাবেসে সত্যতা যাচাইয়ের সুবিধা</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
