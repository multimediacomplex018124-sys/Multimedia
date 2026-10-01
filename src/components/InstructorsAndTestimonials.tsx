import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  ChevronDown,
  Quote,
  GraduationCap,
  Sparkles,
  Phone,
  HelpCircle
} from 'lucide-react';

export const InstructorsAndTestimonials: React.FC = () => {
  const { instructors, testimonials, faqs } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-16">
      
      {/* 1. Instructors Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
              প্রশিক্ষক প্যানেল
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
              আমাদের অভিজ্ঞ ও নিবেদিত প্রশিক্ষকবৃন্দ
            </h2>
            <p className="text-slate-600 text-sm">
              ব্যবহারিক ক্ষেত্রে অভিজ্ঞ প্রশিক্ষকমণ্ডলী শিক্ষার্থীদের নিবিড় তত্ত্বাবধানে পাঠদান ও মেন্টরিং করেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 bg-slate-800 overflow-hidden relative">
                    <img
                      src={inst.photoUrl}
                      alt={inst.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] font-semibold text-blue-300">
                        {inst.designation}
                      </span>
                      <h3 className="text-base font-bold">{inst.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="text-xs font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md inline-block">
                      বিষয়: {inst.subject}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {inst.bio}
                    </p>
                  </div>
                </div>

                {inst.phone && (
                  <div className="px-5 py-3 bg-white border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{inst.phone}</span>
                    </span>
                    <span className="text-slate-400">মেন্টরিং সাপোর্ট</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Student Testimonials Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3 py-1 rounded-md">
              শিক্ষার্থীদের অভিজ্ঞতা
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
              আমাদের সফল প্রশিক্ষণার্থীদের মতামত
            </h2>
            <p className="text-slate-600 text-sm">
              কোর্স সম্পন্ন করে ক্যারিয়ারে এগিয়ে যাওয়া শিক্ষার্থীদের কিছু সত্যনিষ্ঠ অভিজ্ঞতা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-7 h-7 text-blue-200" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={t.photoUrl}
                    alt={t.studentName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.studentName}</h4>
                    <p className="text-[11px] text-blue-700 font-medium">{t.course}</p>
                    <p className="text-[10px] text-slate-500">{t.currentRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (FAQ) Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
              সাধারণ জিজ্ঞাসা
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
              প্রায়শই জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)
            </h2>
            <p className="text-slate-600 text-sm">
              ভর্তি, কোর্স, ল্যাব সুবিধা এবং সার্টিফিকেট সংক্রান্ত সাধারণ প্রশ্নের উত্তর।
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/60"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-700 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};
