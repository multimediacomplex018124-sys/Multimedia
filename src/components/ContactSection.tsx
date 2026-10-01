import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  Facebook,
  Youtube,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', mobile: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-700 tracking-wider uppercase bg-blue-100/70 px-3 py-1 rounded-md">
            যোগাযোগ ও পরামর্শ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
            আমাদের সাথে সরাসরি যোগাযোগ করুন
          </h2>
          <p className="text-slate-600 text-sm">
            যেকোনো কোর্সে ভর্তি, ফি কিংবা প্রতিষ্ঠান সংক্রান্ত অনুসন্ধানে নিচের মাধ্যমে যোগাযোগ করতে পারেন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                যোগাযোগের মাধ্যম
              </h3>

              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">ইনস্টিটিউটের ঠিকানা:</span>
                    <p className="text-slate-600 leading-relaxed mt-0.5">{settings.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">মোবাইল নম্বর:</span>
                    <p className="text-slate-800 font-mono font-medium mt-0.5">{settings.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">অফিসিয়াল ই-মেইল:</span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-blue-700 hover:underline font-mono mt-0.5 block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">সামাজিক যোগাযোগ মাধ্যম:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    title="ফেসবুক পেজ"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                    title="ইউটিউব চ্যানেল"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-semibold flex items-center gap-1.5"
                    title="হোয়াটসঅ্যাপে চ্যাট"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed / Location Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3.5 bg-slate-900 text-white text-xs font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>গুগল ম্যাপে অবস্থান (Google Maps)</span>
                </span>
                <a
                  href={settings.googleMapLocation}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 hover:underline flex items-center gap-1"
                >
                  <span>ম্যাপ খুলুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-48 bg-slate-100 flex items-center justify-center text-xs text-slate-500 p-4 text-center">
                <div>
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-slate-800">{settings.instituteName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              আমাদের বার্তা পাঠান
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              আপনার প্রশ্ন বা তথ্যের জন্য নিচের ফরমটি পূরণ করুন। আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">
                  আপনার বার্তা সফলভাবে গৃহীত হয়েছে!
                </h4>
                <p className="text-xs text-emerald-800">
                  ধন্যবাদ! খুব শীঘ্রই আমাদের একাডেমি থেকে আপনার সাথে যোগাযোগ করা হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      placeholder="আপনার পূর্ণ নাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      placeholder="০১XXXXXXXXX"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ই-মেইল (যদি থাকে)
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    বার্তা বা জিজ্ঞাস্য বিষয় *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="আপনি কোন কোর্সে আগ্রহী বা কী জানতে চান বিস্তারিত লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>বার্তা পাঠান</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
