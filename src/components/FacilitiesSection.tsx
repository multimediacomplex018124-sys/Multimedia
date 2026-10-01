import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Monitor,
  Laptop,
  Users,
  Projector,
  Wifi,
  Award,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const { facilities } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-blue-700" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-indigo-700" />;
      case 'Users':
        return <Users className="w-6 h-6 text-emerald-700" />;
      case 'Projector':
        return <Projector className="w-6 h-6 text-amber-700" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-cyan-700" />;
      case 'Award':
        return <Award className="w-6 h-6 text-rose-700" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-700" />;
    }
  };

  return (
    <section id="facilities" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3 py-1 rounded-md">
            ল্যাব ও অবকাঠামো
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            আমাদের বিশেষ সুবিধাসমূহ
          </h2>
          <p className="text-slate-600 text-sm">
            শিক্ষার্থীদের স্বাচ্ছন্দ্যে হাতে-কলমে কম্পিউটার ও কারিগরি শিক্ষা গ্রহণের জন্য নিশ্চিত করা হয়েছে প্রয়োজনীয় আধুনিক সব পরিবেশ।
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-3 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(fac.iconName)}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {fac.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fac.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
