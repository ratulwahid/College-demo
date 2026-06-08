import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquareText, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PublicContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-12 py-6">
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">যোগাযোগ ও অভিযোগ সেল</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের দাপ্তরিক ঠিকানা, মোবাইল হেল্পলাইন এবং অফিশিয়াল বার্তা প্রেরণ ফরম।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-800" />
              কার্যালয় ও যোগাযোগের বিবরণী
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex gap-4.5 items-start">
                <MapPin className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                <div className="space-y-1 select-all">
                  <span className="font-bold text-slate-900 text-sm block">মহাবিদ্যালয় ঠিকানা:</span>
                  <p className="leading-relaxed">
                    আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ<br />
                    ঝিনাইগাতী থানা রোড, ঝিনাইগাতী জিপিও ৪১৩০,<br />
                    শেরপুর জেলা, ময়মনসিংহ বিভাগ, বাংলাদেশ।
                  </p>
                </div>
              </div>

              <div className="flex gap-4.5 items-start border-t border-slate-50 pt-4">
                <Phone className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">মোবাইল হেল্পলাইন সমূহ:</span>
                  <div className="font-mono space-y-0.5 text-slate-605">
                    <p>০১৭৫১-১২৩৪৫৬ (প্রধান অফিস সেল)</p>
                    <p>০১৭১২-৩৪৫৬৭৮ (ভর্তি ও আইসিটি হেল্প ডেস্ক)</p>
                    <p>০১৮২৩-৪৫৬৭৮৯ (পরীক্ষা সংক্রান্ত জরুরী অনুসন্ধান)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4.5 items-start border-t border-slate-50 pt-4">
                <Mail className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                <div className="space-y-1 select-all">
                  <span className="font-bold text-slate-900 text-sm block font-sans">ইমেইল এড্রেস:</span>
                  <p>info.asgdc@gmail.com</p>
                  <p className="text-[10px] text-slate-400">সরকারি নোটিশের জন্য: desk.asgdc@edu.bd</p>
                </div>
              </div>

              <div className="flex gap-4.5 items-start border-t border-slate-50 pt-4">
                <Clock className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">দাপ্তরিক কার্যাদি সময়সূচী:</span>
                  <p className="leading-relaxed">
                    শনিবার থেকে বৃহস্পতিবার: সকাল ০৯:০০ ঘটিকা হতে বিকাল ০৪:০০ ঘটিকা পর্যন্ত。<br />
                    <span className="text-amber-700 font-semibold">* শুক্রবার সরকারি সাপ্তাহিক ছুটির কারণে সকল দাপ্তরিক কার্যালয় বন্ধ থাকে।</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Feedback Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-105 pb-3 border-slate-100">
            <MessageSquareText className="w-5 h-5 text-emerald-800" />
            <h3 className="text-lg font-bold text-slate-900">সরাসরি বার্তা ও অভিযোগ জমাদান</h3>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                key="submitted-banner"
                className="p-6 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-bold text-lg">আপনার বার্তাটি সফলভাবে প্রেরণ করা হয়েছে!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  আপনার মতামত/জিজ্ঞাসাটি আমাদের রেকর্ড সেলে নিবন্ধিত করা হলো। দায়িত্বরত শিক্ষক মণ্ডলী অথবা প্রধান সহকারী খুবই কম সময়ের মধ্যে আপনার ইমেইল বা মোবাইলে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-emerald-900 hover:text-emerald-950 text-xs font-bold underline"
                >
                  আরেকটি বার্তা লিখুন
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="contact-form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">আপনার পূর্ণ নাম <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: মো: মনিরুজ্জামান"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">যোযোগের মেইল (Email ID) <span className="text-rose-500">*</span></label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    placeholder="০১৭০০-XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">মতামত / অনুসন্ধানের বিষয় <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: একাদশ শ্রেণীতে ভর্তি কোটা সংক্রান্ত"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">আপনার পূর্ণ বার্তাটি লিখুন <span className="text-rose-500">*</span></label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="আপনার অভিযোগ, প্রশ্ন অথবা পরামর্শটি বিস্তারিত এখানে আমাদের কর্মকর্তা বা অধ্যক্ষ মহোদয়ের উদ্দেশ্যে লিখুন..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-805 text-emerald-800 shrink-0" />
                    <span>আপনার তথ্য সুরক্ষিত থাকবে ও স্প্যামিং ফিল্টার করা হবে।</span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 hover:shadow text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:bg-slate-300 disabled:border-slate-300"
                  >
                    {submitting ? (
                      <span>বার্তা পাঠানো হচ্ছে...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>বার্তা প্রেরণ করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Embedded Google Map Placeholder Block */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-sm">গুগল ম্যাপে কলেজের ভৌত ও ভৌগলিক অবস্থান (ঝিনাইগাতী থানা মোড়)</h4>
        <div className="w-full h-80 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-cover bg-center select-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80")' }} />
          <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-emerald-900/5 transition-all duration-300" />
          
          {/* Centered Map Pin details overlay card */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-emerald-800/10 shadow-2xl max-w-xs text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
              <MapPin className="w-5 h-5" />
            </div>
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ</h5>
            <p className="text-[10px] text-slate-500 leading-relaxed">থানা রোড মোড়, ঝিনাইগাতী বাজার সংলগ্ন, ঝিনাইগাতী, শেরপুর জিপিও ৪১৩০</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block mt-1 text-[10px] text-emerald-800 font-bold underline hover:text-emerald-900"
            >
              গুগল ম্যাপে বড় আকারে দেখুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
