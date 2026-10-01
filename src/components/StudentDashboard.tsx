import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Calendar,
  Clock,
  Award,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Printer,
  Bell,
  LogOut,
  Sparkles
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { userSession, logout, getStudentAttendanceStats, attendance, getStudentExamResults, certificates, notices } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'exams' | 'certificate' | 'fees'>('profile');

  const student = userSession.student;
  if (!student) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-600">শিক্ষার্থী হিসেবে লগইন করা নেই।</p>
      </div>
    );
  }

  const attendanceStats = getStudentAttendanceStats(student.id);
  const studentAttendanceRecords = attendance.filter(a => a.studentId === student.id);
  const examResults = getStudentExamResults(student.id);
  const studentCertificates = certificates.filter(c => c.studentId === student.id || c.rollNo === student.rollNo);

  return (
    <div className="py-10 bg-slate-100/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={student.photoUrl || '/src/assets/images/hero_training_lab_1790844966675.jpg'}
              alt={student.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{student.name}</h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                আইডি: <span className="font-mono font-bold text-blue-700">{student.id}</span> · রোল: {student.rollNo} · রেজি: {student.regNo}
              </p>
              <p className="text-xs font-medium text-slate-700 mt-0.5">
                কোর্স: {student.enrolledCourseName} ({student.batch})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 no-print"
            >
              <Printer className="w-4 h-4" />
              <span>আইডি কার্ড প্রিন্ট</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
          {[
            { id: 'profile', label: 'শিক্ষার্থী প্রোফাইল', icon: User },
            { id: 'attendance', label: 'উপস্থিতি রিপোর্ট', icon: Calendar },
            { id: 'exams', label: 'পরীক্ষা ও ফলাফল', icon: Award },
            { id: 'certificate', label: 'সনদপত্র', icon: GraduationCap },
            { id: 'fees', label: 'ফি ও পেমেন্ট', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Enrolled Course Info */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <span>ব্যক্তিগত ও প্রাতিষ্ঠানিক তথ্য</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">শিক্ষার্থীর পূর্ণ নাম:</span>
                  <span className="font-bold text-slate-900">{student.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">পিতার নাম:</span>
                  <span className="font-semibold text-slate-800">{student.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">মাতার নাম:</span>
                  <span className="font-semibold text-slate-800">{student.motherName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">মোবাইল নম্বর:</span>
                  <span className="font-semibold text-slate-800">{student.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ই-মেইল:</span>
                  <span className="font-semibold text-slate-800">{student.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ভর্তির তারিখ:</span>
                  <span className="font-semibold text-slate-800">{student.admissionDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">সেশন:</span>
                  <span className="font-semibold text-slate-800">{student.session}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ব্যাচ:</span>
                  <span className="font-semibold text-slate-800">{student.batch}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
                <span className="font-bold block">ইনস্টিটিউট নিরাপত্তা নির্দেশনা:</span>
                <p>আপনার স্টুডেন্ট আইডি ও পাসওয়ার্ড ব্যক্তিগত ও গোপনীয়। ল্যাবে ক্লাসে প্রবেশের সময় আইডি কার্ড সাথে রাখা আবশ্যক।</p>
              </div>
            </div>

            {/* Quick Course & Routine Card */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>ক্লাস রুটিন ও শিডিউল</span>
                </h3>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-semibold text-slate-800 block">{student.enrolledCourseName}</span>
                  <p className="text-slate-600">সময়: শনি, সোম, বুধ (বিকাল ৪:৩০ - ৬:০০)</p>
                  <p className="text-emerald-700 font-medium">রুম নং: কম্পিউটার ল্যাব-১</p>
                </div>
              </div>

              {/* Attendance Quick Gauge */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">উপস্থিতি সংক্ষেপ</h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold font-mono text-blue-700">
                    {attendanceStats.percentage}%
                  </div>
                  <div className="text-xs text-right text-slate-500">
                    <div>মোট ক্লাস: {attendanceStats.total}টি</div>
                    <div className="text-emerald-600">উপস্থিত: {attendanceStats.present}টি</div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${attendanceStats.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance Management / Tracking */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">শিক্ষার্থী উপস্থিতি রেজিস্টার</h2>
                <p className="text-xs text-slate-500">ক্লাস উপস্থিতির বিস্তারিত দিনভিত্তিক তথ্য</p>
              </div>

              {/* Attendance Stat Counter Grid */}
              <div className="flex items-center gap-3 text-xs">
                <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                  মোট ক্লাস: <span className="font-bold text-slate-800 font-mono">{attendanceStats.total}</span>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  উপস্থিত: <span className="font-bold font-mono">{attendanceStats.present}</span>
                </div>
                <div className="px-3 py-1.5 bg-rose-50 text-rose-800 rounded-lg border border-rose-200">
                  অনুপস্থিত: <span className="font-bold font-mono">{attendanceStats.absent}</span>
                </div>
                <div className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 font-bold font-mono">
                  {attendanceStats.percentage}%
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            {studentAttendanceRecords.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-500">কোনো উপস্থিতির তথ্য এখনো নথিবদ্ধ হয়নি।</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="py-2.5 px-4">তারিখ</th>
                      <th className="py-2.5 px-4">ক্লাসে আলোচিত বিষয় (Topic)</th>
                      <th className="py-2.5 px-4 text-center">উপস্থিতি স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentAttendanceRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-4 font-mono text-slate-800">{rec.date}</td>
                        <td className="py-2.5 px-4 text-slate-700">{rec.topicCovered || 'নিয়মিত ল্যাব ক্লাস'}</td>
                        <td className="py-2.5 px-4 text-center">
                          {rec.status === 'Present' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>Present</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-semibold">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>Absent</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Exam Results */}
        {activeTab === 'exams' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">মূল্যায়ন পরীক্ষা ও ফলাফল</h2>
              <p className="text-xs text-slate-500">শ্রেণিকক্ষ মূল্যায়ন ও টার্মিনাল পরীক্ষার গ্রেড শিট</p>
            </div>

            {examResults.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-500">ফলাফল প্রক্রিয়াধীন রয়েছে।</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examResults.map((ex) => (
                  <div key={ex.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] text-blue-700 font-semibold">{ex.examName}</span>
                        <h3 className="text-sm font-bold text-slate-900">{ex.subject}</h3>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded">
                        গ্রেড: {ex.grade}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
                      <span>প্রাপ্ত নম্বর: <b className="text-slate-900 font-mono">{ex.obtainedMarks}</b> / {ex.totalMarks}</span>
                      <span>ফলাফল: <b className="text-emerald-700 font-semibold">{ex.resultStatus}</b></span>
                      <span>তারিখ: {ex.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Certificate View */}
        {activeTab === 'certificate' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">প্রাতিষ্ঠানিক সনদপত্র (Certificate)</h2>
              <p className="text-xs text-slate-500">কোর্স সমাপ্তির পর প্রদানকৃত আনুষ্ঠানিক যাচাইযোগ্য সার্টিফিকেট</p>
            </div>

            {studentCertificates.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-2">
                <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">সার্টিফিকেট প্রক্রিয়াধীন রয়েছে</h3>
                <p className="text-xs text-slate-500">কোর্স সমাপনী পরীক্ষা উত্তীর্ণ হলে এবং সকল আনুষ্ঠানিকতা শেষ হলে সার্টিফিকেট এখানে প্রদর্শিত হবে।</p>
              </div>
            ) : (
              <div className="space-y-6">
                {studentCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="relative bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 border-4 border-double border-amber-300 rounded-2xl p-6 sm:p-10 shadow-lg text-center space-y-4 max-w-2xl mx-auto"
                  >
                    <div className="flex items-center justify-center gap-2 text-amber-700 font-serif text-sm tracking-wider uppercase">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>মাল্টিমিডিয়া কমপ্লেক্স · প্রশিক্ষণ সনদপত্র</span>
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>

                    <div className="text-xs text-slate-500">
                      সার্টিফিকেট আইডি: <span className="font-mono font-bold text-slate-800">{cert.id}</span>
                    </div>

                    <div className="space-y-1 pt-2">
                      <p className="text-xs text-slate-600">প্রত্যয়ন করা যাচ্ছে যে,</p>
                      <h3 className="text-2xl font-bold text-slate-900">{cert.studentName}</h3>
                      <p className="text-xs text-slate-600">পিতা: {cert.fatherName}</p>
                    </div>

                    <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                      সফলতার সহিত <b>{cert.courseName}</b> ({cert.courseDuration}) কোর্স সম্পন্ন করেছেন এবং পরীক্ষায় <b>{cert.grade}</b> গ্রেড পেয়ে উত্তীর্ণ হয়েছেন।
                    </p>

                    <div className="pt-6 grid grid-cols-2 text-xs border-t border-amber-200 text-slate-700">
                      <div>
                        <span className="block text-slate-500">প্রদানের তারিখ:</span>
                        <span className="font-semibold">{cert.issueDate}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500">স্বাক্ষরকারী:</span>
                        <span className="font-semibold">{cert.instituteSignatory}</span>
                      </div>
                    </div>

                    <div className="pt-2 no-print">
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-800 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>সার্টিফিকেট প্রিন্ট করুন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Fee & Payment details */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">কোর্স ফি ও পেমেন্ট হিস্ট্রি</h2>
              <p className="text-xs text-slate-500">পরিশোধিত ফি ও বকেয়ার হিসাব বিবরণী</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <span className="text-xs text-emerald-800 font-semibold block">পরিশোধিত কোর্স ফি:</span>
                <span className="text-2xl font-bold font-mono text-emerald-950">{student.feePaid}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs text-slate-600 font-semibold block">সর্বমোট নির্ধারিত ফি:</span>
                <span className="text-2xl font-bold font-mono text-slate-900">{student.feeTotal}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 p-3 bg-slate-50 rounded-lg">
              * পেমেন্ট সংক্রান্ত যেকোনো সংশোধনের জন্য ইনস্টিটিউট অফিসে যোগাযোগ করুন।
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
