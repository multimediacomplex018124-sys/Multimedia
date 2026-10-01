import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  GraduationCap,
  CheckCircle,
  Copy,
  Printer,
  Search,
  Upload,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface AdmissionSectionProps {
  onCheckStatus: (appId?: string) => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({ onCheckStatus }) => {
  const { courses, submitApplication, preselectedCourseForAdmission, setPreselectedCourseForAdmission } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    motherName: '',
    mobile: '',
    email: '',
    dob: '',
    address: '',
    courseId: '',
    courseName: '',
    courseDuration: '',
    qualification: 'এইচএসসি / সমমান',
    photoUrl: '',
    extraInfo: ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-populate when preselectedCourse is available
  useEffect(() => {
    if (preselectedCourseForAdmission) {
      setFormData(prev => ({
        ...prev,
        courseId: preselectedCourseForAdmission.id,
        courseName: preselectedCourseForAdmission.name,
        courseDuration: preselectedCourseForAdmission.duration
      }));
    } else if (courses.length > 0 && !formData.courseId) {
      setFormData(prev => ({
        ...prev,
        courseId: courses[0].id,
        courseName: courses[0].name,
        courseDuration: courses[0].duration
      }));
    }
  }, [preselectedCourseForAdmission, courses]);

  const handleCourseChange = (courseId: string) => {
    const selected = courses.find(c => c.id === courseId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        courseId: selected.id,
        courseName: selected.name,
        courseDuration: selected.duration
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.applicantName.trim()) {
      setErrorMsg('শিক্ষার্থীর নাম প্রদান করুন।');
      return;
    }
    if (!formData.mobile.trim()) {
      setErrorMsg('মোবাইল নম্বর প্রদান করুন।');
      return;
    }
    if (!formData.courseId) {
      setErrorMsg('অনুগ্রহ করে একটি কোর্স নির্বাচন করুন।');
      return;
    }

    try {
      const newAppId = submitApplication({
        applicantName: formData.applicantName.trim(),
        fatherName: formData.fatherName.trim() || 'প্রযোজ্য নয়',
        motherName: formData.motherName.trim() || 'প্রযোজ্য নয়',
        mobile: formData.mobile.trim(),
        email: formData.email.trim() || 'applicant@example.com',
        dob: formData.dob || '2005-01-01',
        address: formData.address.trim() || 'বাংলাদেশ',
        courseId: formData.courseId,
        courseName: formData.courseName,
        courseDuration: formData.courseDuration,
        qualification: formData.qualification,
        photoUrl: formData.photoUrl || '/src/assets/images/hero_training_lab_1790844966675.jpg',
        extraInfo: formData.extraInfo.trim()
      });

      setSubmittedId(newAppId);
      // Reset preselection
      setPreselectedCourseForAdmission(null);
    } catch {
      setErrorMsg('আবেদন জমা দেওয়ার সময় ত্রুটি ঘটেছে। পুনরায় চেষ্টা করুন।');
    }
  };

  const handleCopyId = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetForm = () => {
    setSubmittedId(null);
    setFormData({
      applicantName: '',
      fatherName: '',
      motherName: '',
      mobile: '',
      email: '',
      dob: '',
      address: '',
      courseId: courses[0]?.id || '',
      courseName: courses[0]?.name || '',
      courseDuration: courses[0]?.duration || '',
      qualification: 'এইচএসসি / সমমান',
      photoUrl: '',
      extraInfo: ''
    });
  };

  return (
    <section id="admission" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
            অনলাইন ভর্তি কার্যক্রম
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            অনলাইনে কোর্স ভর্তি আবেদন ফরম
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            নিচের ফরমে সঠিক তথ্য দিয়ে আপনার পছন্দের কোর্সে আবেদন সম্পন্ন করুন। আবেদন জমা দেওয়ার পর স্বয়ংক্রিয়ভাবে একটি অ্যাপ্লিকেশন আইডি তৈরি হবে।
          </p>
        </div>

        {/* Success Feedback View */}
        {submittedId ? (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-6 animate-fadeIn shadow-sm">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-600/20">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">
                আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে!
              </h3>
              <p className="text-slate-600 text-sm">
                ধন্যবাদ, {formData.applicantName}। আপনার আবেদনপত্রটি আমাদের কার্যালয়ে নথিভুক্ত হয়েছে।
              </p>
            </div>

            {/* Generated Application ID Box */}
            <div className="max-w-md mx-auto bg-white rounded-xl border border-emerald-200 p-4 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-medium block">
                আপনার ইউনিক অ্যাপ্লিকেশন আইডি (Application ID):
              </span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-blue-900 tracking-wider">
                {submittedId}
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleCopyId}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'কপি হয়েছে!' : 'আইডি কপি করুন'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট রসিদ</span>
                </button>
              </div>
            </div>

            {/* Quick summary of submitted data */}
            <div className="max-w-md mx-auto bg-white/70 rounded-xl border border-slate-200 p-4 text-left text-xs text-slate-700 space-y-1.5">
              <div><span className="font-semibold text-slate-900">নির্বাচিত কোর্স:</span> {formData.courseName}</div>
              <div><span className="font-semibold text-slate-900">কোর্সের মেয়াদ:</span> {formData.courseDuration}</div>
              <div><span className="font-semibold text-slate-900">মোবাইল নম্বর:</span> {formData.mobile}</div>
              <div><span className="font-semibold text-slate-900">বর্তমান স্ট্যাটাস:</span> <span className="text-amber-700 font-semibold">Pending (প্রাথমিক যাচাইাধীন)</span></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onCheckStatus(submittedId)}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>আবেদনের অবস্থা দেখুন</span>
              </button>
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          </div>
        ) : (
          /* Main Admission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
          >
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Course Selection Section */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>কোর্স সম্পর্কিত তথ্য</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    কোর্স নির্বাচন করুন *
                  </label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    কোর্সের মেয়াদ ও সময়
                  </label>
                  <input
                    type="text"
                    value={formData.courseDuration}
                    readOnly
                    className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Applicant Personal Info */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <span>শিক্ষার্থীর ব্যক্তিগত তথ্য</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষার্থীর পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: মোঃ তানভীর আহমেদ"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    placeholder="পিতার নাম লিখুন"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    placeholder="মাতার নাম লিখুন"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ই-মেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    জন্মতারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বর্তমান ও স্থায়ী ঠিকানা *
                </label>
                <textarea
                  rows={2}
                  placeholder="গ্রাম/রোড, ডাকঘর, উপজেলা, জেলা..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            {/* Academic & Photo Upload */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>শিক্ষাগত যোগ্যতা ও ছবি</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    সর্বোচ্চ শিক্ষাগত যোগ্যতা
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="জেএসসি / জেডিসি">জেএসসি / জেডিসি / সমমান</option>
                    <option value="এসএসসি / দাখিল">এসএসসি / দাখিল / সমমান</option>
                    <option value="এইচএসসি / আলিম">এইচএসসি / আলিম / সমমান</option>
                    <option value="ডিপ্লোমা ইন ইঞ্জিনিয়ারিং">ডিপ্লোমা ইন ইঞ্জিনিয়ারিং</option>
                    <option value="স্নাতক / ডিগ্রি">স্নাতক (পাস) / অনার্স</option>
                    <option value="অন্যান্য / আগ্রহী">অন্যান্য / আগ্রহী ব্যক্তি</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    শিক্ষার্থীর ছবি সংযুক্ত করুন
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {formData.photoUrl && (
                      <img
                        src={formData.photoUrl}
                        alt="Preview"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  অন্যান্য তথ্য / পছন্দসই ক্লাস সময়সূচি (যদি থাকে)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: সকালের ব্যাচে ক্লাস করতে আগ্রহী"
                  value={formData.extraInfo}
                  onChange={(e) => setFormData({ ...formData, extraInfo: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                * তথ্যগুলো যাচাই করে "আবেদন জমা দিন" বাটনে ক্লিক করুন।
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2"
              >
                <span>আবেদন জমা দিন</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
