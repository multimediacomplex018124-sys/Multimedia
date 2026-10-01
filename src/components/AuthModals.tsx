import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, GraduationCap, ShieldCheck, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthModalsProps {
  onSuccessNavigate: (target: 'student-dashboard' | 'admin-panel') => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({ onSuccessNavigate }) => {
  const { loginModalOpen, setLoginModalOpen, loginAsStudent, loginAsAdmin } = useApp();

  // Student form state
  const [studentId, setStudentId] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const [studentError, setStudentError] = useState('');

  // Admin form state
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  if (loginModalOpen === 'none') return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    const res = loginAsStudent(studentId, studentPass);
    if (res.success) {
      setLoginModalOpen('none');
      onSuccessNavigate('student-dashboard');
    } else {
      setStudentError(res.message);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    const ok = loginAsAdmin(adminPass);
    if (ok) {
      setLoginModalOpen('none');
      onSuccessNavigate('admin-panel');
    } else {
      setAdminError('ভুল অ্যাডমিন পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setLoginModalOpen('none')}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Student Login Modal */}
        {loginModalOpen === 'student' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">শিক্ষার্থী লগইন</h3>
              <p className="text-xs text-slate-500">
                আপনার স্টুডেন্ট আইডি ও পাসওয়ার্ড প্রদান করে ড্যাশবোর্ডে প্রবেশ করুন
              </p>
            </div>

            {studentError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{studentError}</span>
              </div>
            )}

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  শিক্ষার্থী আইডি (Student ID) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="যেমন: STU-2026-101"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={studentPass}
                    onChange={(e) => setStudentPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Demo hint */}
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
                <span className="font-bold block">ডেমো টেস্টিং তথ্য:</span>
                <p>আইডি: <span className="font-mono font-semibold">STU-2026-101</span> | পাসওয়ার্ড: <span className="font-mono font-semibold">student123</span></p>
                <button
                  type="button"
                  onClick={() => {
                    setStudentId('STU-2026-101');
                    setStudentPass('student123');
                  }}
                  className="text-blue-700 font-bold hover:underline"
                >
                  [এক ক্লিকে পূরণ করুন]
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>লগইন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setLoginModalOpen('admin')}
                className="text-xs text-slate-500 hover:text-blue-700 transition-colors"
              >
                ইনস্টিটিউট অ্যাডমিন? এখানে ক্লিক করুন
              </button>
            </div>
          </div>
        )}

        {/* Admin Login Modal */}
        {loginModalOpen === 'admin' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">ইনস্টিটিউট অ্যাডমিন প্যানেল</h3>
              <p className="text-xs text-slate-500">
                কোর্স, শিক্ষার্থী, ফলাফল ও সেটিংস পরিচালনার জন্য অ্যাডমিন লগইন
              </p>
            </div>

            {adminError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  অ্যাডমিন নিরাপত্তা কোড / পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="পাসওয়ার্ড দিন"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Security hint */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <span className="font-bold block">অ্যাডমিন প্রবেশাধিকার:</span>
                <p>ডিফল্ট প্রাথমিক পাসওয়ার্ড: <span className="font-mono font-semibold">admin123</span> (অ্যাডমিন প্যানেল থেকে যেকোনো সময় পরিবর্তনযোগ্য)</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setLoginModalOpen('student')}
                className="text-xs text-slate-500 hover:text-blue-700 transition-colors"
              >
                শিক্ষার্থী হিসেবে প্রবেশ করতে চান?
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
