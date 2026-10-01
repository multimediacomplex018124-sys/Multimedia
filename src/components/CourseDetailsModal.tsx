import React from 'react';
import { Course } from '../types';
import {
  X,
  Clock,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (course: Course) => void;
  onContact: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onApply,
  onContact
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header Bar with Image Preview */}
        <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-600/90 text-white">
                {course.category}
              </span>
              <span className="text-xs text-amber-300 font-medium">
                স্ট্যাটাস: {course.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              {course.name}
            </h2>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-5 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>কোর্সের মেয়াদ:</span>
              </span>
              <span className="font-semibold text-slate-800 block">{course.duration}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>সময়সূচী:</span>
              </span>
              <span className="font-semibold text-slate-800 block">{course.schedule}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                <span>কোর্স ফি:</span>
              </span>
              <span className="font-semibold text-slate-900 block">{course.courseFee}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>অবশিষ্ট আসন:</span>
              </span>
              <span className="font-semibold text-slate-800 block">{course.availableSeats} টি</span>
            </div>
          </div>

          {/* Course Overview */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>কোর্স বিবরণ ও সারসংক্ষেপ</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>শিক্ষার্থীরা কী কী শিখবেন</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.learningOutcomes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>কোর্স কারিকুলাম ও মডিউলসমূহ</span>
            </h3>
            <div className="space-y-2.5">
              {course.curriculum.map((m, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 mb-1.5 text-blue-900">
                    {m.module}
                  </div>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
                    {m.topics.map((t, tIdx) => (
                      <li key={tIdx}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Fees detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs sm:text-sm space-y-1">
              <span className="font-bold text-blue-950 block">ভর্তির শিক্ষাগত যোগ্যতা:</span>
              <p className="text-slate-700">{course.eligibility}</p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100 text-xs sm:text-sm space-y-1">
              <span className="font-bold text-amber-950 block">ফি সংক্রান্ত তথ্য:</span>
              <p className="text-slate-700">কোর্স ফি: {course.courseFee} | ভর্তি ফি: {course.admissionFee}</p>
            </div>
          </div>

          {/* Facilities Provided */}
          <div className="space-y-2 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900">কোর্সের অন্তর্ভুক্ত সুবিধাসমূহ:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                • প্রতিটি ক্লাসের লেকচার শিট ও ফাইল
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                • অতিরিক্ত ল্যাব প্র্যাকটিস সুযোগ
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                • যাচাইযোগ্য কোর্স সমাপ্তি সনদপত্র
              </div>
            </div>
          </div>

          {/* FAQ snippet */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)</span>
            </div>
            <p className="text-slate-600">
              প্রশ্ন: চাকরি বা পড়াশোনার পাশাপাশি কি এই কোর্সটি করা সম্ভব?
            </p>
            <p className="text-slate-700 font-medium">
              উত্তর: হ্যাঁ, সকাল ও সান্ধ্যকালীন বিভিন্ন শিফটে ক্লাস থাকায় সুবিধাজনক সময়ে কোর্সটি সম্পন্ন করা যায়।
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            প্রশিক্ষক: <span className="font-semibold text-slate-800">{course.instructorName}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onContact();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
              <span>যোগাযোগ করুন</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onApply(course);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-lg shadow-sm shadow-blue-700/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>অনলাইনে ভর্তি হন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
