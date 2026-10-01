import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Course,
  AdmissionApplication,
  Student,
  Certificate,
  Notice,
  GalleryItem,
  Instructor,
  ApplicationStatus
} from '../types';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileCheck,
  CalendarCheck,
  Award,
  Bell,
  Image as ImageIcon,
  UserCheck,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Save,
  Download,
  Upload,
  RefreshCw,
  Search,
  ExternalLink,
  Lock,
  Camera,
  Eye,
  KeyRound,
  ShieldCheck,
  FileImage
} from 'lucide-react';

interface AdminPanelProps {
  onExit: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const {
    settings,
    updateSettings,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    applications,
    updateApplicationStatus,
    students,
    addStudent,
    updateStudent,
    attendance,
    addAttendanceRecord,
    examResults,
    addExamResult,
    certificates,
    issueCertificate,
    updateCertificate,
    notices,
    addNotice,
    deleteNotice,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    instructors,
    addInstructor,
    deleteInstructor,
    logout,
    resetAllData,
    exportDataJSON,
    importDataJSON,
    changeAdminPassword
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'courses'
    | 'admissions'
    | 'students'
    | 'attendance'
    | 'exams'
    | 'certificates'
    | 'notices'
    | 'gallery'
    | 'instructors'
    | 'settings'
    | 'security'
  >('dashboard');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [saveErrorMsg, setSaveErrorMsg] = useState('');

  const triggerSaveMsg = (msg: string) => {
    setSaveSuccessMsg(msg);
    setSaveErrorMsg('');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const triggerErrorMsg = (msg: string) => {
    setSaveErrorMsg(msg);
    setTimeout(() => setSaveErrorMsg(''), 4000);
  };

  // Course Add / Edit Form State
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    name: '',
    category: '৩ মাস মেয়াদী কোর্স' as Course['category'],
    duration: '৩ মাস (৩৬টি ক্লাস)',
    description: '',
    learningOutcomes: 'কম্পিউটার পরিচালনা ও আধুনিক অফিস অ্যাপ্লিকেশন',
    courseFee: '৳ ৩,৫০০ (সম্পাদনযোগ্য)',
    admissionFee: '৳ ৫০০ (সম্পাদনযোগ্য)',
    schedule: 'শনি, সোম, বুধ (সকাল ১০:০০ - ১১:৩০)',
    eligibility: 'ন্যূনতম জেএসসি / এসএসসি বা সমমান',
    seats: 20,
    availableSeats: 8,
    instructorName: 'ইন্সট্রাক্টর প্যানেল',
    status: 'ভর্তি চলছে' as Course['status'],
    image: '/src/assets/images/hero_training_lab_1790844966675.jpg'
  });

  // Handle Course Image File Upload
  const handleCourseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseFormData({
      name: course.name,
      category: course.category,
      duration: course.duration,
      description: course.description,
      learningOutcomes: course.learningOutcomes.join('\n'),
      courseFee: course.courseFee,
      admissionFee: course.admissionFee,
      schedule: course.schedule,
      eligibility: course.eligibility,
      seats: course.seats,
      availableSeats: course.availableSeats,
      instructorName: course.instructorName,
      status: course.status,
      image: course.image
    });
    setShowCourseForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.name.trim()) {
      triggerErrorMsg('কোর্সের নাম লিখুন।');
      return;
    }

    const payload = {
      ...courseFormData,
      learningOutcomes: courseFormData.learningOutcomes.split('\n').filter(Boolean),
      curriculum: [
        {
          module: 'মডিউল ০১: প্রাথমিক ও ব্যবহারিক বিষয়াবলী',
          topics: ['টুলস পরিচিতি', 'হাতে-কলমে ল্যাব প্র্যাকটিস']
        }
      ]
    };

    if (editingCourseId) {
      updateCourse(editingCourseId, payload);
      triggerSaveMsg('কোর্সটি সফলভাবে হালনাগাদ (Edit) করা হয়েছে!');
    } else {
      addCourse(payload);
      triggerSaveMsg('নতুন কোর্স সফলভাবে যুক্ত হয়েছে!');
    }

    setEditingCourseId(null);
    setShowCourseForm(false);
  };

  // Gallery Add Form State
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    category: 'কম্পিউটার ল্যাব' as GalleryItem['category'],
    imageUrl: '/src/assets/images/lab_computer_class_1790844981413.jpg',
    date: new Date().toISOString().split('T')[0],
    caption: ''
  });

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFormData.title.trim()) {
      triggerErrorMsg('ছবির শিরোনাম দিন।');
      return;
    }
    if (!galleryFormData.imageUrl) {
      triggerErrorMsg('একটি ছবি আপলোড করুন অথবা লিংক দিন।');
      return;
    }

    addGalleryItem(galleryFormData);
    setShowGalleryForm(false);
    setGalleryFormData({
      title: '',
      category: 'কম্পিউটার ল্যাব',
      imageUrl: '/src/assets/images/lab_computer_class_1790844981413.jpg',
      date: new Date().toISOString().split('T')[0],
      caption: ''
    });
    triggerSaveMsg('গ্যালারিতে নতুন ছবি সফলভাবে যুক্ত হয়েছে!');
  };

  // Password Change Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      triggerErrorMsg('নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মেলেনি!');
      return;
    }
    const res = changeAdminPassword(currentPass, newPass);
    if (res.success) {
      triggerSaveMsg(res.message);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } else {
      triggerErrorMsg(res.message);
    }
  };

  // Notice Form State
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeFormData, setNoticeFormData] = useState({
    title: '',
    category: 'গুরুত্বপূর্ণ ঘোষণা' as Notice['category'],
    date: new Date().toISOString().split('T')[0],
    description: '',
    attachmentName: 'notice.pdf',
    isImportant: false
  });

  // Certificate Issue Form
  const [showCertForm, setShowCertForm] = useState(false);
  const [certFormData, setCertFormData] = useState({
    studentName: '',
    fatherName: '',
    studentId: 'STU-2026-101',
    courseName: courses[0]?.name || '',
    courseDuration: courses[0]?.duration || '৩ মাস',
    regNo: 'MC-REG-2026-001',
    rollNo: '১০১',
    grade: 'A+',
    issueDate: new Date().toISOString().split('T')[0],
    session: 'জানুয়ারি - জুন ২০২৬',
    verificationStatus: 'Valid' as Certificate['verificationStatus'],
    instituteSignatory: 'পরিচালক, মাল্টিমিডিয়া কমপ্লেক্স'
  });

  // New Student Form
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    mobile: '০১XXXXXXXXX',
    email: 'student@example.com',
    password: 'student123',
    photoUrl: '/src/assets/images/lab_computer_class_1790844981413.jpg',
    enrolledCourseId: courses[0]?.id || '',
    enrolledCourseName: courses[0]?.name || '',
    batch: 'ব্যাচ-২৫',
    session: '২০২৬',
    rollNo: '১০৫',
    regNo: 'MC-REG-2026-105',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'অধ্যয়নরত' as Student['status'],
    feePaid: '৳ ৩,৫০০',
    feeTotal: '৳ ৩,৫০০ (সম্পাদনযোগ্য)'
  });

  // Settings local state
  const [localSettings, setLocalSettings] = useState(settings);
  const [searchFilter, setSearchFilter] = useState('');

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice(noticeFormData);
    setShowNoticeForm(false);
    triggerSaveMsg('নতুন নোটিশ প্রকাশিত হয়েছে!');
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = issueCertificate(certFormData);
    setShowCertForm(false);
    triggerSaveMsg(`সার্টিফিকেট ইস্যু সম্পন্ন হয়েছে! আইডি: ${newId}`);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addStudent(studentFormData);
    setShowStudentForm(false);
    triggerSaveMsg(`নতুন শিক্ষার্থী যুক্ত হয়েছে! আইডি: ${newId}`);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const ok = importDataJSON(content);
        if (ok) {
          triggerSaveMsg('ডাটা সফলভাবে ইমপোর্ট করা হয়েছে!');
        } else {
          triggerErrorMsg('ভুল ফাইল ফরম্যাট!');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-2 pt-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>নিরাপদ অ্যাডমিন প্যানেল</span>
            </span>
            <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
              {settings.instituteName}
            </h2>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'ড্যাশবোর্ড ওভারভিউ', icon: LayoutDashboard },
              { id: 'courses', label: 'কোর্সসমূহ পরিচালনা', icon: BookOpen },
              { id: 'gallery', label: 'গ্যালারি ছবি আপলোড', icon: ImageIcon },
              { id: 'security', label: 'পাসওয়ার্ড পরিবর্তন', icon: Lock },
              { id: 'admissions', label: 'ভর্তি আবেদনপত্রসমূহ', icon: FileCheck },
              { id: 'students', label: 'শিক্ষার্থী তালিকা', icon: Users },
              { id: 'attendance', label: 'উপস্থিতি ব্যবস্থাপনা', icon: CalendarCheck },
              { id: 'exams', label: 'পরীক্ষা ও ফলাফল', icon: Award },
              { id: 'certificates', label: 'সার্টিফিকেট ব্যবস্থাপনা', icon: Award },
              { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell },
              { id: 'instructors', label: 'প্রশিক্ষক প্যানেল', icon: UserCheck },
              { id: 'settings', label: 'ইনস্টিটিউট সেটিংস', icon: SettingsIcon }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit & Logout Buttons */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button
            onClick={onExit}
            className="w-full py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-850 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>ওয়েবসাইটে ফিরে যান</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              logout();
              onExit();
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>অ্যাডমিন লগআউট</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        {/* Save success toast */}
        {saveSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500 text-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Error toast */}
        {saveErrorMsg && (
          <div className="mb-6 p-4 bg-rose-950 border border-rose-500 text-rose-200 rounded-xl text-xs flex items-center gap-2 animate-fadeIn shadow-lg">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{saveErrorMsg}</span>
          </div>
        )}

        {/* 1. Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">ইনস্টিটিউট অ্যাডমিন ওভারভিউ</h1>
                <p className="text-xs text-slate-400">একাডেমিক এবং প্রশাসনিক তথ্যের সারসংক্ষেপ</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportDataJSON}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ব্যাকআপ ডাউনলোড</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400">মোট শিক্ষার্থী</span>
                <div className="text-2xl font-bold font-mono text-blue-400">{students.length} জন</div>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400">নতুন ভর্তি আবেদন</span>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {applications.filter(a => a.status === 'Pending').length} টি
                </div>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400">সক্রিয় কোর্স</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">{courses.length} টি</div>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <span className="text-xs text-slate-400">গ্যালারি ছবি</span>
                <div className="text-2xl font-bold font-mono text-purple-400">{gallery.length} টি</div>
              </div>
            </div>

            {/* Recent Applications Quick Action Box */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>সাম্প্রতিক ভর্তি আবেদনসমূহ</span>
                </h3>
                <button
                  onClick={() => setActiveTab('admissions')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  সবগুলো দেখুন →
                </button>
              </div>

              <div className="divide-y divide-slate-700 text-xs">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-white">{app.applicantName}</span>
                      <span className="text-slate-400 ml-2">({app.courseName})</span>
                      <div className="text-[11px] text-slate-500 font-mono">
                        আইডি: {app.id} · তারিখ: {app.appliedDate} · মোবাইল: {app.mobile}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-700 text-slate-200">
                        {app.status}
                      </span>
                      {app.status === 'Pending' && (
                        <button
                          onClick={() => {
                            updateApplicationStatus(app.id, 'Approved', 'আবেদন অনুমোদিত হয়েছে। অফিসে যোগাযোগ করুন।');
                            triggerSaveMsg('আবেদন অনুমোদিত করা হয়েছে!');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Course Management (With Image Upload & Full Edit) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">কোর্স পরিচালনা ও ছবি সংযোজন</h2>
                <p className="text-xs text-slate-400">নতুন কোর্স যুক্ত করুন, ছবি আপলোড করুন অথবা যেকোনো কোর্সের তথ্য সম্পাদন করুন</p>
              </div>
              <button
                onClick={() => {
                  setEditingCourseId(null);
                  setCourseFormData({
                    name: '',
                    category: '৩ মাস মেয়াদী কোর্স',
                    duration: '৩ মাস (৩৬টি ক্লাস)',
                    description: '',
                    learningOutcomes: 'কম্পিউটার পরিচালনা ও আধুনিক অফিস অ্যাপ্লিকেশন',
                    courseFee: '৳ ৩,৫০০ (সম্পাদনযোগ্য)',
                    admissionFee: '৳ ৫০০ (সম্পাদনযোগ্য)',
                    schedule: 'শনি, সোম, বুধ (সকাল ১০:০০ - ১১:৩০)',
                    eligibility: 'ন্যূনতম জেএসসি / এসএসসি বা সমমান',
                    seats: 20,
                    availableSeats: 8,
                    instructorName: 'ইন্সট্রাক্টর প্যানেল',
                    status: 'ভর্তি চলছে',
                    image: '/src/assets/images/hero_training_lab_1790844966675.jpg'
                  });
                  setShowCourseForm(!showCourseForm);
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন কোর্স যুক্ত করুন</span>
              </button>
            </div>

            {/* Course Form with Image Upload & Live Preview */}
            {showCourseForm && (
              <form onSubmit={handleSaveCourse} className="p-5 sm:p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span>{editingCourseId ? 'কোর্স তথ্য ও ছবি পরিবর্তন (সম্পাদন)' : 'নতুন কোর্স তৈরি ফরম'}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCourseForm(false);
                      setEditingCourseId(null);
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ✕ বন্ধ করুন
                  </button>
                </div>

                {/* Course Image Upload Section */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-700 space-y-3">
                  <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>কোর্সের ছবি (কম্পিউটার/মোবাইল থেকে আপলোড করুন বা লিংক দিন)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Image Preview Box */}
                    <div className="sm:col-span-4 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 h-32 flex items-center justify-center relative">
                      {courseFormData.image ? (
                        <img
                          src={courseFormData.image}
                          alt="Course preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-center text-xs text-slate-500">
                          <FileImage className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span>ছবি নির্বাচিত হয়নি</span>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="sm:col-span-8 space-y-2.5 text-xs">
                      <div>
                        <span className="block text-slate-400 mb-1">১. ডিভাইস থেকে নতুন ছবি আপলোড করুন:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCourseImageUpload}
                          className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="block text-slate-400 mb-1">২. অথবা ছবির সরাসরি লিংক (URL) লিখুন:</span>
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          value={courseFormData.image}
                          onChange={(e) => setCourseFormData({ ...courseFormData, image: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                        />
                      </div>

                      {/* Quick Predefined Lab Images */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[11px] text-slate-400">ইনস্টিটিউট ল্যাব ছবি:</span>
                        <button
                          type="button"
                          onClick={() => setCourseFormData({ ...courseFormData, image: '/src/assets/images/hero_training_lab_1790844966675.jpg' })}
                          className="px-2 py-0.5 bg-slate-750 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                        >
                          ল্যাব-১
                        </button>
                        <button
                          type="button"
                          onClick={() => setCourseFormData({ ...courseFormData, image: '/src/assets/images/lab_computer_class_1790844981413.jpg' })}
                          className="px-2 py-0.5 bg-slate-750 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                        >
                          ল্যাব-২
                        </button>
                        <button
                          type="button"
                          onClick={() => setCourseFormData({ ...courseFormData, image: '/src/assets/images/multimedia_design_training_1790844996845.jpg' })}
                          className="px-2 py-0.5 bg-slate-750 hover:bg-slate-700 rounded text-[10px] text-slate-300"
                        >
                          ডিজাইন ল্যাব
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Metadata Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">কোর্সের নাম *</label>
                    <input
                      type="text"
                      value={courseFormData.name}
                      onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">ক্যাটাগরি</label>
                    <select
                      value={courseFormData.category}
                      onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="৩ মাস মেয়াদী কোর্স">৩ মাস মেয়াদী কোর্স</option>
                      <option value="৬ মাস মেয়াদী কোর্স">৬ মাস মেয়াদী কোর্স</option>
                      <option value="১ বছর মেয়াদী কোর্স">১ বছর মেয়াদী কোর্স</option>
                      <option value="অন্যান্য কোর্স">অন্যান্য কোর্স</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">মেয়াদ ও ক্লাস সংখ্যা</label>
                    <input
                      type="text"
                      value={courseFormData.duration}
                      onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">কোর্স ফি</label>
                    <input
                      type="text"
                      value={courseFormData.courseFee}
                      onChange={(e) => setCourseFormData({ ...courseFormData, courseFee: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">সময়সূচী / রুটিন</label>
                    <input
                      type="text"
                      value={courseFormData.schedule}
                      onChange={(e) => setCourseFormData({ ...courseFormData, schedule: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">ভর্তি স্ট্যাটাস</label>
                    <select
                      value={courseFormData.status}
                      onChange={(e) => setCourseFormData({ ...courseFormData, status: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="ভর্তি চলছে">ভর্তি চলছে</option>
                      <option value="আসন সীমিত">আসন সীমিত</option>
                      <option value="ভর্তি বন্ধ">ভর্তি বন্ধ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">কোর্স সারসংক্ষেপ বিবরণী *</label>
                  <textarea
                    rows={2}
                    value={courseFormData.description}
                    onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">কী কী শিখবেন (প্রতি লাইনে একটি বিষয়)</label>
                  <textarea
                    rows={3}
                    value={courseFormData.learningOutcomes}
                    onChange={(e) => setCourseFormData({ ...courseFormData, learningOutcomes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCourseForm(false);
                      setEditingCourseId(null);
                    }}
                    className="px-4 py-2 bg-slate-700 text-xs font-semibold rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-xs font-semibold text-white rounded-lg hover:bg-blue-500 shadow-sm"
                  >
                    {editingCourseId ? 'কোর্সের পরিবর্তন সংরক্ষণ করুন' : 'কোর্স তৈরি সম্পন্ন করুন'}
                  </button>
                </div>
              </form>
            )}

            {/* Courses Table */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">ছবি</th>
                    <th className="py-3 px-4">কোর্সের নাম</th>
                    <th className="py-3 px-4">ক্যাটাগরি</th>
                    <th className="py-3 px-4">কোর্স ফি</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-750">
                      <td className="py-3 px-4">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-12 h-9 rounded object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                      <td className="py-3 px-4 text-slate-300">{c.category}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{c.courseFee}</td>
                      <td className="py-3 px-4">
                        <select
                          value={c.status}
                          onChange={(e) => {
                            updateCourse(c.id, { status: e.target.value as any });
                            triggerSaveMsg('কোর্স স্ট্যাটাস আপডেট হয়েছে!');
                          }}
                          className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1"
                        >
                          <option value="ভর্তি চলছে">ভর্তি চলছে</option>
                          <option value="আসন সীমিত">আসন সীমিত</option>
                          <option value="ভর্তি বন্ধ">ভর্তি বন্ধ</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleStartEditCourse(c)}
                          className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-950/50 rounded transition-colors inline-flex items-center gap-1"
                          title="সম্পাদন করুন"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>এডিট</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`'${c.name}' মুছে ফেলতে চান?`)) {
                              deleteCourse(c.id);
                              triggerSaveMsg('কোর্স মুছে ফেলা হয়েছে!');
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded transition-colors inline-flex items-center gap-1"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>ডিলিট</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Photo Gallery Management (With File Upload & Live Preview) */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">গ্যালারি ছবি পরিচালনা ও আপলোড</h2>
                <p className="text-xs text-slate-400">কম্পিউটার ল্যাব, ক্লাস ও অনুষ্ঠানের নতুন ছবি আপলোড ও মুছে ফেলা</p>
              </div>
              <button
                onClick={() => setShowGalleryForm(!showGalleryForm)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ছবি আপলোড করুন</span>
              </button>
            </div>

            {/* Gallery Image Upload Form */}
            {showGalleryForm && (
              <form onSubmit={handleSaveGalleryItem} className="p-5 sm:p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>নতুন ছবি যুক্ত করার ফরম</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowGalleryForm(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ✕ বন্ধ করুন
                  </button>
                </div>

                {/* Upload Image Selector */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-700 space-y-3">
                  <label className="block text-xs font-semibold text-slate-200">
                    ছবি নির্বাচন করুন (ডিভাইস থেকে ফাইল নির্বাচন করুন অথবা লিংক লিখুন)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-4 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 h-36 flex items-center justify-center">
                      {galleryFormData.imageUrl ? (
                        <img
                          src={galleryFormData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-xs text-slate-500">ছবি দেখা যাবে</span>
                      )}
                    </div>

                    <div className="sm:col-span-8 space-y-3 text-xs">
                      <div>
                        <span className="block text-slate-400 mb-1">কম্পিউটার/মোবাইল থেকে ছবি আপলোড:</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                          className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="block text-slate-400 mb-1">অথবা ছবির ইউআরএল (URL):</span>
                        <input
                          type="text"
                          value={galleryFormData.imageUrl}
                          onChange={(e) => setGalleryFormData({ ...galleryFormData, imageUrl: e.target.value })}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">ছবির শিরোনাম *</label>
                    <input
                      type="text"
                      placeholder="যেমন: কম্পিউটার ল্যাব প্র্যাকটিস ক্লাস"
                      value={galleryFormData.title}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">ক্যাটাগরি</label>
                    <select
                      value={galleryFormData.category}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="কম্পিউটার ল্যাব">কম্পিউটার ল্যাব</option>
                      <option value="ক্লাসরুম">ক্লাসরুম</option>
                      <option value="প্রশিক্ষণ কার্যক্রম">প্রশিক্ষণ কার্যক্রম</option>
                      <option value="অনুষ্ঠান">অনুষ্ঠান</option>
                      <option value="শিক্ষার্থী কার্যক্রম">শিক্ষার্থী কার্যক্রম</option>
                      <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">তারিখ</label>
                    <input
                      type="date"
                      value={galleryFormData.date}
                      onChange={(e) => setGalleryFormData({ ...galleryFormData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">সংক্ষিপ্ত বিবরণ / ক্যাপশন (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="ছবি সম্পর্কে এক লাইনের বর্ণনা..."
                    value={galleryFormData.caption}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGalleryForm(false)}
                    className="px-4 py-2 bg-slate-700 text-xs font-semibold rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-xs font-semibold text-white rounded-lg hover:bg-blue-500"
                  >
                    ছবি সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            )}

            {/* Gallery Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative group flex flex-col justify-between">
                  <div className="h-40 overflow-hidden bg-slate-900">
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-3 text-xs text-white space-y-1">
                    <span className="text-[10px] font-semibold text-amber-400 bg-slate-900 px-2 py-0.5 rounded">
                      {g.category}
                    </span>
                    <p className="font-bold truncate mt-1">{g.title}</p>
                    <p className="text-[11px] text-slate-400">{g.date}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`'${g.title}' ছবিটি মুছে ফেলতে চান?`)) {
                        deleteGalleryItem(g.id);
                        triggerSaveMsg('ছবি মুছে ফেলা হয়েছে!');
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-rose-600/90 text-white rounded-lg shadow-sm hover:bg-rose-600 transition-colors"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Dedicated Security & Password Change */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <span>অ্যাডমিন নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                আপনার অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন। নতুন পাসওয়ার্ড সেট করলে অন্যরা কেউ অ্যাডমিন প্যানেলে ঢুকতে পারবে না।
              </p>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4 text-xs">
              <div className="p-3.5 bg-amber-950/50 border border-amber-800/80 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                <span>নিরাপত্তার স্বার্থে পাসওয়ার্ড কাউকে জানাবেন না।</span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  বর্তমান অ্যাডমিন পাসওয়ার্ড *
                </label>
                <input
                  type="password"
                  placeholder="বর্তমান পাসওয়ার্ড দিন"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  নতুন পাসওয়ার্ড *
                </label>
                <input
                  type="password"
                  placeholder="কমপক্ষে ৪ অক্ষরের নতুন পাসওয়ার্ড"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  নতুন পাসওয়ার্ড নিশ্চিত করুন *
                </label>
                <input
                  type="password"
                  placeholder="নতুন পাসওয়ার্ডটি পুনরায় লিখুন"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>পাসওয়ার্ড আপডেট করুন</span>
              </button>
            </form>
          </div>
        )}

        {/* 5. Admission Management */}
        {activeTab === 'admissions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">ভর্তি আবেদন ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-400">অনলাইন আবেদন যাচাই করুন এবং স্ট্যাটাস পরিবর্তন করুন</p>
              </div>
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="নাম বা আইডি দিয়ে খুঁজুন..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">আইডি</th>
                    <th className="py-3 px-4">আবেদনকারীর নাম</th>
                    <th className="py-3 px-4">কোর্স</th>
                    <th className="py-3 px-4">মোবাইল</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                    <th className="py-3 px-4">অ্যাডমিন নোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {applications
                    .filter(
                      (a) =>
                        a.applicantName.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        a.id.toLowerCase().includes(searchFilter.toLowerCase())
                    )
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-slate-750">
                        <td className="py-3 px-4 font-mono font-semibold text-blue-400">{app.id}</td>
                        <td className="py-3 px-4 text-white font-medium">{app.applicantName}</td>
                        <td className="py-3 px-4 text-slate-300">{app.courseName}</td>
                        <td className="py-3 px-4 text-slate-300 font-mono">{app.mobile}</td>
                        <td className="py-3 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => {
                              updateApplicationStatus(app.id, e.target.value as ApplicationStatus);
                              triggerSaveMsg('আবেদনের স্ট্যাটাস পরিবর্তিত হয়েছে!');
                            }}
                            className={`border rounded px-2 py-1 text-xs font-semibold ${
                              app.status === 'Approved'
                                ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                                : app.status === 'Completed'
                                ? 'bg-blue-950 border-blue-600 text-blue-300'
                                : app.status === 'Pending'
                                ? 'bg-amber-950 border-amber-600 text-amber-300'
                                : 'bg-rose-950 border-rose-600 text-rose-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-slate-400 max-w-xs">
                          <input
                            type="text"
                            defaultValue={app.adminNote || ''}
                            onBlur={(e) => {
                              updateApplicationStatus(app.id, app.status, e.target.value);
                              triggerSaveMsg('বার্তা সংরক্ষিত হয়েছে!');
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Student Management */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">শিক্ষার্থী ডাটাবেস</h2>
                <p className="text-xs text-slate-400">নিবন্ধিত শিক্ষার্থী যোগ ও রোল সংক্রান্ত তথ্য</p>
              </div>
              <button
                onClick={() => setShowStudentForm(!showStudentForm)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন শিক্ষার্থী যুক্ত করুন</span>
              </button>
            </div>

            {showStudentForm && (
              <form onSubmit={handleSaveStudent} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 animate-fadeIn">
                <h3 className="text-sm font-bold text-white">নতুন শিক্ষার্থী নিবন্ধন ফরম</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">শিক্ষার্থীর নাম *</label>
                    <input
                      type="text"
                      value={studentFormData.name}
                      onChange={(e) => setStudentFormData({ ...studentFormData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">পিতার নাম</label>
                    <input
                      type="text"
                      value={studentFormData.fatherName}
                      onChange={(e) => setStudentFormData({ ...studentFormData, fatherName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={studentFormData.mobile}
                      onChange={(e) => setStudentFormData({ ...studentFormData, mobile: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">কোর্স</label>
                    <select
                      value={studentFormData.enrolledCourseName}
                      onChange={(e) => setStudentFormData({ ...studentFormData, enrolledCourseName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">রোল নম্বর</label>
                    <input
                      type="text"
                      value={studentFormData.rollNo}
                      onChange={(e) => setStudentFormData({ ...studentFormData, rollNo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">লগইন পাসওয়ার্ড</label>
                    <input
                      type="text"
                      value={studentFormData.password}
                      onChange={(e) => setStudentFormData({ ...studentFormData, password: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowStudentForm(false)}
                    className="px-4 py-2 bg-slate-700 text-xs font-semibold rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-xs font-semibold text-white rounded-lg hover:bg-blue-500"
                  >
                    নিবন্ধন সম্পন্ন করুন
                  </button>
                </div>
              </form>
            )}

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">আইডি</th>
                    <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4">কোর্স</th>
                    <th className="py-3 px-4">রোল</th>
                    <th className="py-3 px-4">পাসওয়ার্ড</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-750">
                      <td className="py-3 px-4 font-mono font-bold text-blue-400">{s.id}</td>
                      <td className="py-3 px-4 text-white font-medium">{s.name}</td>
                      <td className="py-3 px-4 text-slate-300">{s.enrolledCourseName}</td>
                      <td className="py-3 px-4 font-mono text-slate-300">{s.rollNo}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{s.password}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. Attendance Management */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">উপস্থিতি রেজিস্টার</h2>
            <p className="text-xs text-slate-400">প্রতিটি ক্লাসের তারিখ অনুযায়ী উপস্থিতি এন্ট্রি</p>

            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-slate-200">উপস্থিতি দ্রুত এন্ট্রি:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">শিক্ষার্থী নির্বাচন</label>
                  <select
                    id="att-student-select"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">তারিখ</label>
                  <input
                    type="date"
                    id="att-date-input"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">উপস্থিতি স্ট্যাটাস</label>
                  <select
                    id="att-status-select"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    <option value="Present">Present (উপস্থিত)</option>
                    <option value="Absent">Absent (অনুপস্থিত)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const stuId = (document.getElementById('att-student-select') as HTMLSelectElement).value;
                      const date = (document.getElementById('att-date-input') as HTMLInputElement).value;
                      const status = (document.getElementById('att-status-select') as HTMLSelectElement).value as any;
                      addAttendanceRecord({ studentId: stuId, date, status, topicCovered: 'নিয়মিত ল্যাব ক্লাস' });
                      triggerSaveMsg('উপস্থিতি রেকর্ড যুক্ত হয়েছে!');
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                  >
                    হাজিরা সংরক্ষণ
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">আইডি</th>
                    <th className="py-3 px-4">তারিখ</th>
                    <th className="py-3 px-4">বিষয়</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {attendance.slice(0, 15).map((a) => (
                    <tr key={a.id} className="hover:bg-slate-750">
                      <td className="py-3 px-4 font-mono text-blue-400">{a.studentId}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{a.date}</td>
                      <td className="py-3 px-4 text-slate-300">{a.topicCovered}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            a.status === 'Present'
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'bg-rose-950 text-rose-300'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. Exam & Result Management */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">পরীক্ষা ও ফলাফল প্রকাশ</h2>
            <p className="text-xs text-slate-400">পরীক্ষার নম্বর ও গ্রেডশিট তৈরি</p>

            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-slate-200">ফলাফল যোগ করুন:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">শিক্ষার্থী</label>
                  <select
                    id="exam-stu-select"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">পরীক্ষার নাম</label>
                  <input
                    type="text"
                    id="exam-name-input"
                    defaultValue="মিডটার্ম ব্যবহারিক মূল্যায়ন"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">প্রাপ্ত নম্বর (১০০ এ)</label>
                  <input
                    type="number"
                    id="exam-marks-input"
                    defaultValue={85}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const stuId = (document.getElementById('exam-stu-select') as HTMLSelectElement).value;
                      const exName = (document.getElementById('exam-name-input') as HTMLInputElement).value;
                      const marks = Number((document.getElementById('exam-marks-input') as HTMLInputElement).value);
                      const stu = students.find(s => s.id === stuId);
                      addExamResult({
                        studentId: stuId,
                        studentName: stu?.name || 'শিক্ষার্থী',
                        examName: exName,
                        subject: stu?.enrolledCourseName || 'আইসিটি ও কম্পিউটার',
                        date: new Date().toISOString().split('T')[0],
                        totalMarks: 100,
                        obtainedMarks: marks,
                        grade: marks >= 80 ? 'A+' : marks >= 70 ? 'A' : 'B',
                        resultStatus: marks >= 50 ? 'Passed' : 'Failed',
                        publishedDate: new Date().toISOString().split('T')[0]
                      });
                      triggerSaveMsg('ফলাফল প্রকাশ সম্পন্ন হয়েছে!');
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                  >
                    ফলাফল প্রকাশ করুন
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">শিক্ষার্থী</th>
                    <th className="py-3 px-4">পরীক্ষা</th>
                    <th className="py-3 px-4">নম্বর</th>
                    <th className="py-3 px-4">গ্রেড</th>
                    <th className="py-3 px-4">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {examResults.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-750">
                      <td className="py-3 px-4 text-white font-medium">{r.studentName}</td>
                      <td className="py-3 px-4 text-slate-300">{r.examName}</td>
                      <td className="py-3 px-4 font-mono text-amber-300">{r.obtainedMarks} / {r.totalMarks}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">{r.grade}</td>
                      <td className="py-3 px-4 text-slate-400">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">সার্টিফিকেট প্রশাসন</h2>
                <p className="text-xs text-slate-400">সনদপত্র ইস্যু এবং অনলাইন ভেরিফিকেশন ডাটাবেস</p>
              </div>
              <button
                onClick={() => setShowCertForm(!showCertForm)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন সনদপত্র ইস্যু করুন</span>
              </button>
            </div>

            {showCertForm && (
              <form onSubmit={handleIssueCert} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 animate-fadeIn">
                <h3 className="text-sm font-bold text-white">সার্টিফিকেট ইস্যু ফরম</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">শিক্ষার্থীর নাম *</label>
                    <input
                      type="text"
                      value={certFormData.studentName}
                      onChange={(e) => setCertFormData({ ...certFormData, studentName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">পিতার নাম</label>
                    <input
                      type="text"
                      value={certFormData.fatherName}
                      onChange={(e) => setCertFormData({ ...certFormData, fatherName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">কোর্সের নাম</label>
                    <input
                      type="text"
                      value={certFormData.courseName}
                      onChange={(e) => setCertFormData({ ...certFormData, courseName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">কোর্সের মেয়াদ</label>
                    <input
                      type="text"
                      value={certFormData.courseDuration}
                      onChange={(e) => setCertFormData({ ...certFormData, courseDuration: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">প্রাপ্ত গ্রেড</label>
                    <input
                      type="text"
                      value={certFormData.grade}
                      onChange={(e) => setCertFormData({ ...certFormData, grade: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">স্বাক্ষরকারী পদবি</label>
                    <input
                      type="text"
                      value={certFormData.instituteSignatory}
                      onChange={(e) => setCertFormData({ ...certFormData, instituteSignatory: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCertForm(false)}
                    className="px-4 py-2 bg-slate-700 text-xs font-semibold rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-xs font-semibold text-white rounded-lg hover:bg-blue-500"
                  >
                    সনদপত্র ইস্যু করুন
                  </button>
                </div>
              </form>
            )}

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 bg-slate-850">
                    <th className="py-3 px-4">সার্টিফিকেট আইডি</th>
                    <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4">কোর্স</th>
                    <th className="py-3 px-4">ইস্যু তারিখ</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-750">
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">{cert.id}</td>
                      <td className="py-3 px-4 text-white font-medium">{cert.studentName}</td>
                      <td className="py-3 px-4 text-slate-300">{cert.courseName}</td>
                      <td className="py-3 px-4 text-slate-400">{cert.issueDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300">
                          {cert.verificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. Notices Management */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">নোটিশ বোর্ড পরিচালনা</h2>
                <p className="text-xs text-slate-400">নতুন প্রাতিষ্ঠানিক নোটিশ ও বিজ্ঞপ্তি প্রকাশ</p>
              </div>
              <button
                onClick={() => setShowNoticeForm(!showNoticeForm)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন নোটিশ প্রকাশ করুন</span>
              </button>
            </div>

            {showNoticeForm && (
              <form onSubmit={handleSaveNotice} className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-4 animate-fadeIn">
                <h3 className="text-sm font-bold text-white">নতুন নোটিশ ফরম</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">নোটিশের শিরোনাম *</label>
                    <input
                      type="text"
                      value={noticeFormData.title}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">ক্যাটাগরি</label>
                    <select
                      value={noticeFormData.category}
                      onChange={(e) => setNoticeFormData({ ...noticeFormData, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="ভর্তি বিজ্ঞপ্তি">ভর্তি বিজ্ঞপ্তি</option>
                      <option value="ক্লাস নোটিশ">ক্লাস নোটিশ</option>
                      <option value="পরীক্ষা">পরীক্ষা</option>
                      <option value="ফলাফল">ফলাফল</option>
                      <option value="গুরুত্বপূর্ণ ঘোষণা">গুরুত্বপূর্ণ ঘোষণা</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">নোটিশের বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    value={noticeFormData.description}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNoticeForm(false)}
                    className="px-4 py-2 bg-slate-700 text-xs font-semibold rounded-lg"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-xs font-semibold text-white rounded-lg hover:bg-blue-500"
                  >
                    প্রকাশ করুন
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-blue-400 bg-blue-950 px-2 py-0.5 rounded text-[11px]">
                        {n.category}
                      </span>
                      <span className="text-slate-500">· {n.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{n.title}</h4>
                    <p className="text-slate-400 mt-1">{n.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('এই নোটিশটি মুছে ফেলতে চান?')) {
                        deleteNotice(n.id);
                        triggerSaveMsg('নোটিশ মুছে ফেলা হয়েছে!');
                      }
                    }}
                    className="text-rose-400 hover:text-rose-300 p-1.5"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. Instructors */}
        {activeTab === 'instructors' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">প্রশিক্ষক প্যানেল ব্যবস্থাপনা</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {instructors.map((inst) => (
                <div key={inst.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3 text-xs">
                  <img src={inst.photoUrl} alt={inst.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{inst.name}</h3>
                    <p className="text-blue-400 font-semibold">{inst.designation}</p>
                    <p className="text-slate-300 mt-1">বিষয়: {inst.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. Website Settings & General Content */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">ইনস্টিটিউট সেটিংস ও তথ্য</h2>
                <p className="text-xs text-slate-400">নাম, ঠিকানা, ফোন ও অফিশিয়াল সোশ্যাল মিডিয়া লিংক সম্পাদন</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSettings(localSettings);
                  triggerSaveMsg('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">ইনস্টিটিউটের নাম *</label>
                  <input
                    type="text"
                    value={localSettings.instituteName}
                    onChange={(e) => setLocalSettings({ ...localSettings, instituteName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">ট্যাগলাইন (Slogan)</label>
                  <input
                    type="text"
                    value={localSettings.tagline}
                    onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">অফিসিয়াল ই-মেইল *</label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">মোবাইল নম্বর (যোগাযোগ)</label>
                  <input
                    type="text"
                    value={localSettings.phone}
                    onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">প্রতিষ্ঠানের পূর্ণ ঠিকানা</label>
                <input
                  type="text"
                  value={localSettings.address}
                  onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">ফেসবুক পেজ লিংক</label>
                  <input
                    type="text"
                    value={localSettings.facebookUrl}
                    onChange={(e) => setLocalSettings({ ...localSettings, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">আমাদের সম্পর্কে বিবরণ</label>
                <textarea
                  rows={3}
                  value={localSettings.aboutIntro}
                  onChange={(e) => setLocalSettings({ ...localSettings, aboutIntro: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white leading-relaxed"
                />
              </div>
            </div>

            {/* Factory Reset & Import Box */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-200 block">ডাটা ব্যাকআপ ও রিসেট:</span>
                <span className="text-slate-400">পরীক্ষামূলক ডেটা প্রাথমিক অবস্থায় ফিরিয়ে নিন বা ইমপোর্ট করুন</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg cursor-pointer flex items-center gap-1 font-semibold">
                  <Upload className="w-3.5 h-3.5" />
                  <span>ইমপোর্ট JSON</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
                <button
                  onClick={() => {
                    if (confirm('আপনি কি নিশ্চিত যে সকল তথ্য রিসেট করতে চান?')) {
                      resetAllData();
                      triggerSaveMsg('ডাটাবেস ডিফল্ট অবস্থায় রিসেট হয়েছে!');
                    }
                  }}
                  className="px-3 py-1.5 bg-rose-950/70 border border-rose-800 text-rose-300 hover:bg-rose-900 rounded-lg flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>রিসেট ডিফল্ট</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
