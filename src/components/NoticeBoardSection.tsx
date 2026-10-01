import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Notice, NoticeCategory } from '../types';
import { Bell, Calendar, Download, Eye, FileText, X, AlertCircle } from 'lucide-react';

export const NoticeBoardSection: React.FC = () => {
  const { notices } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল নোটিশ');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);

  const categories = [
    'সকল নোটিশ',
    'ভর্তি বিজ্ঞপ্তি',
    'ক্লাস নোটিশ',
    'পরীক্ষা',
    'ফলাফল',
    'গুরুত্বপূর্ণ ঘোষণা'
  ];

  const filteredNotices = notices.filter((n) => {
    if (selectedCategory === 'সকল নোটিশ') return true;
    return n.category === selectedCategory;
  });

  return (
    <section id="notices" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3 py-1 rounded-md">
            বিজ্ঞপ্তি ও নোটিশ বোর্ড
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            ইনস্টিটিউট নোটিশ বোর্ড
          </h2>
          <p className="text-slate-600 text-sm">
            ভর্তি বিজ্ঞপ্তি, ক্লাস রুটিন, পরীক্ষার সময়সূচি ও গুরুত্বপূর্ণ প্রাতিষ্ঠানিক নির্দেশনাসমূহ।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs max-w-3xl mx-auto mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-xl border p-4 sm:p-5 transition-all shadow-xs hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                notice.isImportant ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{notice.date}</span>
                  </span>
                  {notice.isImportant && (
                    <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      জরুরি
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => setActiveNoticeModal(notice)}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>পড়ুন</span>
                </button>

                {notice.attachmentName && (
                  <button
                    onClick={() => {
                      alert(`'${notice.attachmentName}' ডাউনলোড শুরু হচ্ছে...`);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                    title="সংযুক্তি ফাইল"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notice Modal */}
        {activeNoticeModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {activeNoticeModal.category}
                  </span>
                  <span>·</span>
                  <span>প্রকাশিত: {activeNoticeModal.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeNoticeModal.title}
                </h3>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
                {activeNoticeModal.description}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                <span>মাল্টিমিডিয়া কমপ্লেক্স · নোটিশ বোর্ড প্রশাসন</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold transition-colors no-print"
                  >
                    প্রিন্ট নোটিশ
                  </button>
                  <button
                    onClick={() => setActiveNoticeModal(null)}
                    className="px-4 py-1.5 text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-semibold transition-colors"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
