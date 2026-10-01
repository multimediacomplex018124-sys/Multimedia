import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdmissionApplication } from '../types';
import { Search, FileText, CheckCircle2, Clock, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface ApplicationStatusSectionProps {
  initialSearchId?: string;
  onApplyNew: () => void;
}

export const ApplicationStatusSection: React.FC<ApplicationStatusSectionProps> = ({
  initialSearchId = '',
  onApplyNew
}) => {
  const { applications } = useApp();
  const [searchId, setSearchId] = useState(initialSearchId);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<AdmissionApplication | null>(() => {
    if (initialSearchId) {
      return applications.find(a => a.id.toLowerCase() === initialSearchId.toLowerCase()) || null;
    }
    return null;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const term = searchId.trim().toLowerCase();
    const found = applications.find(
      (a) => a.id.toLowerCase() === term || a.mobile.includes(term)
    );
    setResult(found || null);
    setSearched(true);
  };

  const getStatusBadge = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Approved (অনুমোদিত)</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending (বিচারাধীন / যাচাই চলছে)</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Completed (ভর্তি প্রক্রিয়া সম্পন্ন)</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Rejected (বাতিল)</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="application-status" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3 py-1 rounded-md">
            ভর্তি স্ট্যাটাস ট্র্যাকিং
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            ভর্তি আবেদনের অবস্থা দেখুন
          </h2>
          <p className="text-slate-600 text-sm">
            আপনার আবেদনপত্র জমা দেওয়ার সময় প্রাপ্ত অ্যাপ্লিকেশন আইডি (যেমন: MC-ADM-2026-1001) অথবা মোবাইল নম্বর দিয়ে আবেদনের বর্তমান অবস্থা জানুন।
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="অ্যাপ্লিকেশন আইডি লিখুন (যেমন: MC-ADM-2026-1001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>অনুসন্ধান করুন</span>
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span>পরীক্ষার জন্য নমুনা আইডি:</span>
            <button
              type="button"
              onClick={() => {
                setSearchId('MC-ADM-2026-1001');
              }}
              className="font-mono text-blue-700 hover:underline font-semibold"
            >
              MC-ADM-2026-1001
            </button>
            <span>বা</span>
            <button
              type="button"
              onClick={() => {
                setSearchId('MC-ADM-2026-1002');
              }}
              className="font-mono text-blue-700 hover:underline font-semibold"
            >
              MC-ADM-2026-1002
            </button>
          </div>
        </div>

        {/* Search Results Display Card */}
        {searched && !result && (
          <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-3 shadow-xs animate-fadeIn">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              কোনো আবেদনের তথ্য খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              দয়া করে আপনার অ্যাপ্লিকেশন আইডিটি পুনরায় পরীক্ষা করুন অথবা নতুন করে ভর্তি আবেদন জমা দিন।
            </p>
            <button
              onClick={onApplyNew}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline"
            >
              <span>নতুন আবেদন করতে এখানে ক্লিক করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-fadeIn">
            {/* Top header of card */}
            <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-blue-300 font-medium">অ্যাপ্লিকেশন আইডি:</span>
                <div className="text-lg font-mono font-bold">{result.id}</div>
              </div>
              <div>{getStatusBadge(result.status)}</div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">আবেদনকারীর নাম:</span>
                  <span className="text-sm font-bold text-slate-900">{result.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">নির্বাচিত কোর্স:</span>
                  <span className="text-sm font-bold text-slate-900">{result.courseName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">কোর্সের মেয়াদ:</span>
                  <span className="font-semibold text-slate-800">{result.courseDuration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">আবেদনের তারিখ:</span>
                  <span className="font-semibold text-slate-800">{result.appliedDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">মোবাইল নম্বর:</span>
                  <span className="font-semibold text-slate-800">{result.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">শিক্ষাগত যোগ্যতা:</span>
                  <span className="font-semibold text-slate-800">{result.qualification}</span>
                </div>
              </div>

              {/* Admin note message box */}
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>ইনস্টিটিউট কার্যালয়ের বার্তা (Important Message):</span>
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {result.adminNote || 'আপনার আবেদনটি বিবেচনাধীন রয়েছে। শীঘ্রই কার্যালয় থেকে পরবর্তী দিকনির্দেশনা প্রদান করা হবে।'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                <span>যেকোনো তথ্যের জন্য ইনস্টিটিউটের হেল্পলাইনে যোগাযোগ করুন।</span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors no-print"
                >
                  প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
