import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem, GalleryCategory } from '../types';
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল ছবি');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'সকল ছবি',
    'কম্পিউটার ল্যাব',
    'ক্লাসরুম',
    'প্রশিক্ষণ কার্যক্রম',
    'অনুষ্ঠান',
    'শিক্ষার্থী কার্যক্রম'
  ];

  const filteredItems = gallery.filter((item) => {
    if (selectedCategory === 'সকল ছবি') return true;
    return item.category === selectedCategory;
  });

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-md">
            ফটোগ্রাফি ও কার্যক্রম
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            ইনস্টিটিউট ফটো গ্যালারি
          </h2>
          <p className="text-slate-600 text-sm">
            আমাদের আধুনিক কম্পিউটার ল্যাব, শ্রেণিকক্ষ, ব্যবহারিক ওয়ার্কশপ এবং সনদ বিতরণ অনুষ্ঠানের কিছু খণ্ডচিত্র।
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200 shadow-xs max-w-3xl mx-auto mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer border border-slate-200"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Scrim & Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[11px] font-semibold text-amber-300">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold leading-snug mt-0.5 line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                  <span>{item.date}</span>
                  <span className="flex items-center gap-1 text-blue-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>বড় করে দেখুন</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentLightboxItem && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container with Caption */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center text-white space-y-1 px-4">
                <div className="text-xs text-amber-300 font-semibold">
                  {currentLightboxItem.category} · {currentLightboxItem.date}
                </div>
                <h3 className="text-base sm:text-lg font-bold">{currentLightboxItem.title}</h3>
                {currentLightboxItem.caption && (
                  <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {currentLightboxItem.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
