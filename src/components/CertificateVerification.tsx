import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Certificate } from '../types';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  Printer,
  ShieldCheck,
  Sparkles,
  Calendar,
  User,
  GraduationCap
} from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const { verifyCertificate } = useApp();
  const [certId, setCertId] = useState('');
  const [searched, setSearched] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    const cert = verifyCertificate(certId);
    setVerifiedCert(cert);
    setSearched(true);
  };

  return (
    <section id="certificate-verify" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
            অনলাইন ভেরিফিকেশন সিস্টেম
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            সার্টিফিকেট যাচাই করুন
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            মাল্টিমিডিয়া কমপ্লেক্স থেকে প্রদত্ত প্রশিক্ষণ সনদপত্রের সত্যতা যাচাই করতে সনদে উল্লিখিত সার্টিফিকেট আইডি প্রবেশ করান।
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs mb-8">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="সার্টিফিকেট আইডি দিন (যেমন: MC-CERT-2026-001)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-slate-800"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>যাচাই করুন</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <span>টেস্টিংয়ের জন্য নমুনা আইডি:</span>
            <button
              type="button"
              onClick={() => {
                setCertId('MC-CERT-2026-001');
              }}
              className="font-mono text-blue-700 hover:underline font-semibold"
            >
              MC-CERT-2026-001
            </button>
            <span>অথবা</span>
            <button
              type="button"
              onClick={() => {
                setCertId('MC-CERT-2026-002');
              }}
              className="font-mono text-blue-700 hover:underline font-semibold"
            >
              MC-CERT-2026-002
            </button>
          </div>
        </div>

        {/* Invalid Certificate State */}
        {searched && !verifiedCert && (
          <div className="max-w-2xl mx-auto bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-rose-950">
              এই সার্টিফিকেটের তথ্য খুঁজে পাওয়া যায়নি।
            </h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto">
              দয়া করে সার্টিফিকেটে উল্লেখিত আইডি নম্বরটি সতর্কতার সাথে পরীক্ষা করুন অথবা যেকোনো অসঙ্গতি থাকলে ইনস্টিটিউট কর্তৃপক্ষের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>
        )}

        {/* Valid Verified Certificate Display Card */}
        {verifiedCert && (
          <div className="max-w-2xl mx-auto bg-white border-2 border-emerald-300 rounded-2xl overflow-hidden shadow-lg animate-fadeIn">
            {/* Top Verification Banner */}
            <div className="bg-emerald-600 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                <div>
                  <div className="font-bold text-sm sm:text-base">যাচাই সম্পন্ন: সনদপত্রটি সম্পূর্ণ বৈধ ও অনুমোদিত</div>
                  <div className="text-[11px] text-emerald-100">Status: Officially Verified & Registered</div>
                </div>
              </div>
              <div className="text-xs font-mono bg-emerald-700/80 px-2.5 py-1 rounded">
                ID: {verifiedCert.id}
              </div>
            </div>

            {/* Certificate Details Sheet */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="text-xs font-serif text-amber-700 font-semibold tracking-wider uppercase mb-1">
                  মাল্টিমিডিয়া কমপ্লেক্স · কেন্দ্রীয় সনদ ডেটাবেস
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {verifiedCert.studentName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">পিতার নাম: {verifiedCert.fatherName}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">কোর্সের নাম:</span>
                  <span className="font-bold text-slate-900 text-sm">{verifiedCert.courseName}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">কোর্সের সময়কাল:</span>
                  <span className="font-semibold text-slate-800">{verifiedCert.courseDuration}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">প্রাপ্ত গ্রেড / মূল্যায়ন:</span>
                  <span className="font-bold text-blue-700 text-sm">{verifiedCert.grade}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">সনদ ইস্যু তারিখ:</span>
                  <span className="font-semibold text-slate-800">{verifiedCert.issueDate}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">রেজিস্ট্রেশন নম্বর:</span>
                  <span className="font-mono font-semibold text-slate-800">{verifiedCert.regNo}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-500 block">সেশন / ব্যাচ:</span>
                  <span className="font-semibold text-slate-800">{verifiedCert.session}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                <div>
                  অনুমোদনকারী: <span className="font-semibold text-slate-800">{verifiedCert.instituteSignatory}</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>ভেরিফিকেশন কপি প্রিন্ট</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
