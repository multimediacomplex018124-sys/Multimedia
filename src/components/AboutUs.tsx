import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Compass, BookOpen, Layers, Lightbulb, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { settings } = useApp();
  const [activeTab, setActiveTab] = useState<'intro' | 'mission' | 'vision' | 'method' | 'future'>('intro');

  const tabs = [
    { id: 'intro', label: 'প্রতিষ্ঠানের পরিচিতি', icon: BookOpen },
    { id: 'mission', label: 'আমাদের লক্ষ্য', icon: Target },
    { id: 'vision', label: 'উদ্দেশ্য', icon: Compass },
    { id: 'method', label: 'প্রশিক্ষণের ধরন', icon: Layers },
    { id: 'future', label: 'ভবিষ্যৎ পরিকল্পনা', icon: Lightbulb }
  ];

  return (
    <section id="about" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
            আমাদের পরিচিতি
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-3">
            {settings.instituteName} সম্পর্কে জানুন
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {settings.aboutIntro}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Navigation Column */}
          <div className="lg:col-span-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Quick highlight box */}
            <div className="p-4 mt-4 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-1">প্রশিক্ষণ অঙ্গীকার:</span>
              তত্ত্বীয় ধারণার চেয়ে ল্যাবে প্র্যাকটিক্যাল অনুশীলনে সর্বাধিক গুরুত্ব দিয়ে প্রতিটি শিক্ষার্থীকে দক্ষ করে তোলাই আমাদের মূল লক্ষ্য।
            </div>
          </div>

          {/* Detailed Content Display Panel */}
          <div className="lg:col-span-8 bg-slate-50/60 rounded-2xl border border-slate-200 p-6 sm:p-8">
            {activeTab === 'intro' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-b border-slate-200 pb-3">
                  <BookOpen className="w-5 h-5 text-blue-700" />
                  <span>প্রতিষ্ঠানের পরিচিতি</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {settings.instituteName} একটি দক্ষতা ও প্রশিক্ষণভিত্তিক প্রতিষ্ঠান, যেখানে বিভিন্ন মেয়াদের কোর্সের মাধ্যমে শিক্ষার্থীদের ব্যবহারিক ও আধুনিক দক্ষতা অর্জনে সহায়তা করা হয়।
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  আমাদের আধুনিক কম্পিউটার ল্যাবে প্রতিটি শিক্ষার্থীর জন্য রয়েছে স্বতন্ত্র কাজের কম্পিউটার, উচ্চগতির ইন্টারনেট এবং অভিজ্ঞ প্রশিক্ষক দ্বারা সরাসরি হাতে-কলমে নির্দেশনার ব্যবস্থা। কর্মসংস্থান ও ক্যারিয়ারের উপযোগী করে কোর্স কারিকুলাম সাজানো হয়েছে।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>আধুনিক কম্পিউটার প্রশিক্ষণ কারিকুলাম</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>ব্যক্তিগত যত্ন ও বাস্তবসম্মত প্র্যাকটিস</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>কোর্স সম্পন্ন শেষে প্রাতিষ্ঠানিক সার্টিফিকেট</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>অনলাইনে সার্টিফিকেট ভেরিফিকেশন ব্যবস্থা</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-b border-slate-200 pb-3">
                  <Target className="w-5 h-5 text-blue-700" />
                  <span>আমাদের মূল লক্ষ্য (Mission)</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {settings.mission}
                </p>
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-semibold text-slate-900">লক্ষ্য বাস্তবায়নের মূল স্তম্ভ:</div>
                  <p>• মুখস্থবিদ্যার বদলে ল্যাবে বাস্তবমুখী অনুশীলন নিশ্চিত করা।</p>
                  <p>• শিক্ষার্থীদের সমস্যা সমাধানে সার্বক্ষণিক মেন্টরিং প্রদান।</p>
                  <p>• প্রতিটি কোর্সে মানসম্মত কারিকুলাম অনুসরণ।</p>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-b border-slate-200 pb-3">
                  <Compass className="w-5 h-5 text-blue-700" />
                  <span>প্রতিষ্ঠানের উদ্দেশ্য (Vision)</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {settings.vision}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold block text-blue-800 mb-1">ক্যারিয়ার প্রস্তুতি</span>
                    চাকরি ও ফ্রিল্যান্সিংয়ে আত্মবিশ্বাসী কর্মী তৈরি করা।
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold block text-blue-800 mb-1">ডিজিটাল অন্তর্ভুক্তি</span>
                    স্থানীয় তরুণ-তরুণীদের আধুনিক কম্পিউটারে দক্ষ করে তোলা।
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'method' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-b border-slate-200 pb-3">
                  <Layers className="w-5 h-5 text-blue-700" />
                  <span>প্রশিক্ষণের ধরন ও শিক্ষাদান পদ্ধতি</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {settings.trainingMethodology}
                </p>
                <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="font-bold text-blue-700 shrink-0">১. সরাসরি ল্যাব ক্লাস:</span>
                    <span>প্রতিটি ক্লাসে শিক্ষক প্রজেক্টরে প্রদর্শন করবেন এবং ছাত্রছাত্রীরা নিজের কম্পিউটারে সরাসরি অনুশীলন করবেন।</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="font-bold text-blue-700 shrink-0">২. নিয়মিত প্রজেক্ট ও কুইজ:</span>
                    <span>প্রতিটি মডিউল শেষে ব্যবহারিক অ্যাসাইনমেন্ট ও মূল্যায়ন পরীক্ষার মাধ্যমে দক্ষতা যাচাই করা হয়।</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="font-bold text-blue-700 shrink-0">৩. ব্যাকআপ ক্লাস সাপোর্ট:</span>
                    <span>কোনো শিক্ষার্থী ক্লাস মিস করলে পরবর্তীতে অতিরিক্ত সময়ে ল্যাব সাপোর্টের সুযোগ রয়েছে।</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'future' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg border-b border-slate-200 pb-3">
                  <Lightbulb className="w-5 h-5 text-blue-700" />
                  <span>ভবিষ্যৎ পরিকল্পনা ও সম্প্রসারণ</span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {settings.futurePlans}
                </p>
                <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div className="font-semibold text-slate-900 mb-1">পরবর্তী পদক্ষেপ:</div>
                  <p className="leading-relaxed">
                    মাল্টিমিডিয়া কমপ্লেক্স স্থানীয় ও আঞ্চলিক শিক্ষার্থীদের জন্য নতুন নতুন প্রযুক্তি কোর্স, স্মার্ট ল্যাব ফ্যাসিলিটি ও অনলাইন লার্নিং পোর্টালের পরিধি ক্রমাগত বৃদ্ধি করে যাচ্ছে।
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
