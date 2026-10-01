import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course, CourseCategory } from '../types';
import {
  Clock,
  Calendar,
  Users,
  Search,
  ArrowRight,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface CourseSectionProps {
  onSelectCourse: (course: Course) => void;
  onApplyForCourse: (course: Course) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  onSelectCourse,
  onApplyForCourse
}) => {
  const { courses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল কোর্স');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'সকল কোর্স',
    '৩ মাস মেয়াদী কোর্স',
    '৬ মাস মেয়াদী কোর্স',
    '১ বছর মেয়াদী কোর্স',
    'অন্যান্য কোর্স'
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'সকল কোর্স' || course.category === selectedCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/60 px-3 py-1 rounded-md">
            প্রশিক্ষণ কোর্সসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-3">
            পেশাদার ও কারিগরি দক্ষতা উন্নয়ন কোর্স
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            আপনার আগ্রহ ও সুবিধাজনক মেয়াদ অনুযায়ী সেরা কোর্সটি বেছে নিন এবং হাতে-কলমে প্র্যাকটিস করে নিজেকে প্রস্তুত করুন।
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs (Segmented control style buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs w-full md:w-auto">
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="কোর্স খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-800"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">কোনো কোর্স পাওয়া যায়নি। অনুসন্ধান পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                {/* Course Image & Overlay Details */}
                <div>
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    
                    {/* Status marker */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {course.category}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs text-white ${
                          course.status === 'ভর্তি চলছে'
                            ? 'bg-emerald-600'
                            : course.status === 'আসন সীমিত'
                            ? 'bg-amber-600'
                            : 'bg-rose-600'
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs">
                      <div className="flex items-center justify-between text-slate-200">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-400" />
                          <span>অবশিষ্ট আসন: {course.availableSeats}টি</span>
                        </span>
                        <span className="text-amber-300 font-semibold">{course.courseFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {course.name}
                    </h3>

                    {/* Unboxed Metadata Line with separators */}
                    <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{course.duration}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{course.schedule}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Eligibility & Trainer Note */}
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                      <div>
                        <span className="font-semibold text-slate-700">যোগ্যতা:</span> {course.eligibility}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">প্রশিক্ষক:</span> {course.instructorName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>বিস্তারিত দেখুন</span>
                  </button>

                  <button
                    onClick={() => onApplyForCourse(course)}
                    className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1"
                  >
                    <span>ভর্তি হন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
