import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, ClipboardList, CheckCircle2, ChevronRight, User, Phone, Mail, Award, AlertTriangle, Printer } from 'lucide-react';

export default function AdmissionView() {
  const [step, setStep] = useState(1); // 1: Info & eligibility, 2: Apply Form, 3: Success slip
  
  // Eligibility states
  const [sscGPA, setSscGPA] = useState('');
  const [targetDept, setTargetDept] = useState<'Science' | 'Humanities' | 'Business Studies'>('Science');
  const [eligibilityResult, setEligibilityResult] = useState<{ checked: boolean; isEligible: boolean; message: string } | null>(null);

  // Application form states
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    sscSchool: '',
    sscRoll: '',
    sscRegistration: '',
    phone: '',
    email: '',
    address: ''
  });

  const [applyError, setApplyError] = useState('');
  const [appId, setAppId] = useState('');

  const checkEligibility = () => {
    const val = parseFloat(sscGPA);
    if (isNaN(val) || val < 1 || val > 5) {
      setEligibilityResult({ checked: true, isEligible: false, message: 'অনুগ্রহ করে ১.০০ থেকে ৫.০০ এর মধ্যে সঠিক জিপিএ লিখুন।' });
      return;
    }

    if (targetDept === 'Science') {
      if (val >= 4.0) {
        setEligibilityResult({ checked: true, isEligible: true, message: 'অভিনন্দন! আপনি বিজ্ঞান বিভাগে ভর্তির যোগ্য। ভর্তি ফরম পূরণ করতে পারেন।' });
      } else {
        setEligibilityResult({ checked: true, isEligible: false, message: 'দুঃখিত, বিজ্ঞান শাখায় ভর্তির জন্য ন্যূনতম জিপিএ ৪.০০ প্রয়োজন।' });
      }
    } else if (targetDept === 'Business Studies') {
      if (val >= 3.5) {
        setEligibilityResult({ checked: true, isEligible: true, message: 'অভিনন্দন! আপনি ব্যবসায় শিক্ষা বিভাগে ভর্তির যোগ্য। ভর্তি ফরম পূরণ করতে পারেন।' });
      } else {
        setEligibilityResult({ checked: true, isEligible: false, message: 'দুঃখিত, ব্যবসায় শিক্ষা শাখায় ভর্তির জন্য ন্যূনতম জিপিএ ৩.৫০ প্রয়োজন।' });
      }
    } else {
      if (val >= 3.0) {
        setEligibilityResult({ checked: true, isEligible: true, message: 'অভিনন্দন! আপনি মানবিক বিভাগে ভর্তির যোগ্য। ভর্তি ফরম পূরণ করতে পারেন।' });
      } else {
        setEligibilityResult({ checked: true, isEligible: false, message: 'দুঃখিত, মানবিক শাখায় ভর্তির জন্য ন্যূনতম জিপিএ ৩.০০ প্রয়োজন।' });
      }
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.sscRoll || !formData.phone || !formData.sscRegistration) {
      setApplyError('কক্ষ চিহ্নিত লাল তারকা যুক্ত ক্ষেত্রসমূহ অবশ্যই পূরণ করতে হবে।');
      return;
    }
    setApplyError('');
    // Generate a random high-fidelity application barcode id
    const randomId = 'ASG-2026-' + Math.floor(100000 + Math.random() * 900000);
    setAppId(randomId);
    setStep(3);
  };

  const printSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-12 py-6">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">একাদশ শ্রেণীতে ভর্তি কার্যক্রম ২০২৬</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজে ভর্তির যোগ্যতা যাচাই, নির্দেশিকা ও সরাসরি অনলাইন আবেদন প্রক্রিয়া।
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
            key="step1"
          >
            {/* Split Sections: Eligibility Calculator & Seat Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Eligibility Form */}
              <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-900">
                  <GraduationCap className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold">ভর্তির অনলাইন যোগ্যতা ক্যালকুলেটর</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  আপনার এসএসসি জিপিএ ও কাঙ্ক্ষিত বিভাগটি নির্বাচন করে এক ক্লিকে ভর্তির যোগ্যতা যাচাই করুন।
                </p>

                <div className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">নির্বাচন করুন বিভাগ</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Science', 'Humanities', 'Business Studies'].map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => {
                            setTargetDept(dept as any);
                            setEligibilityResult(null);
                          }}
                          className={`px-2.5 py-2 text-xs font-semibold border rounded-lg transition-all cursor-pointer ${
                            targetDept === dept 
                              ? 'bg-emerald-900 border-emerald-950 text-white shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {dept === 'Science' ? 'বিজ্ঞান' : dept === 'Humanities' ? 'মানবিক' : 'ব্যবসায় শিক্ষা'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">আপনার এসএসসি জিপিএ (SSC GPA)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="1"
                      max="5"
                      value={sscGPA}
                      placeholder="যেমন: ৪.৭৫"
                      onChange={(e) => {
                        setSscGPA(e.target.value);
                        setEligibilityResult(null);
                      }}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>

                  <button
                    onClick={checkEligibility}
                    className="w-full py-2.5 bg-emerald-950 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 cursor-pointer shadow-sm transition-all"
                  >
                    ভর্তির যোগ্যতা যাচাই করুন
                  </button>

                  {eligibilityResult?.checked && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`p-3.5 border rounded-lg text-xs flex gap-3 ${
                        eligibilityResult.isEligible 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
                          : 'bg-rose-50 border-rose-100 text-rose-900'
                      }`}
                    >
                      {eligibilityResult.isEligible ? (
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5 animate-bounce" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 shrink-0 text-rose-700 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold leading-relaxed">{eligibilityResult.message}</p>
                        {eligibilityResult.isEligible && (
                          <button
                            onClick={() => setStep(2)}
                            className="mt-2 text-amber-600 hover:text-amber-700 font-bold underline flex items-center gap-0.5"
                          >
                            সরাসরি অনলাইন আবেদন করুন <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Admission breakdown */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ClipboardList className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-lg font-bold text-slate-900">ভর্তি যোগ্যতা ও আসন সংখ্যা</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-100/60 bg-emerald-50/20 space-y-1">
                    <span className="text-xs font-semibold text-emerald-800">বিজ্ঞান শাখা</span>
                    <h4 className="font-bold text-lg text-slate-900">আসন: ১৫০ টি</h4>
                    <p className="text-[11px] text-slate-500">ন্যূনতম জিপিএ: ৪.০০<br />বাধ্যতামূলক: সাধারণ গণিত ও উচ্চতর গণিত</p>
                  </div>
                  <div className="p-4 rounded-xl border border-sky-100/60 bg-sky-50/20 space-y-1">
                    <span className="text-xs font-semibold text-sky-800">মানবিক শাখা</span>
                    <h4 className="font-bold text-lg text-slate-900">আসন: ২৫০ টি</h4>
                    <p className="text-[11px] text-slate-500">ন্যূনতম জিপিএ: ৩.০০<br />বাধ্যতামূলক: এসএসসি মানবিক বা সমমান পাস</p>
                  </div>
                  <div className="p-4 rounded-xl border border-amber-100/60 bg-amber-50/20 space-y-1">
                    <span className="text-xs font-semibold text-amber-800">ব্যবসায় শিক্ষা শাখা</span>
                    <h4 className="font-bold text-lg text-slate-900">আসন: ১৫০ টি</h4>
                    <p className="text-[11px] text-slate-500">ন্যূনতম জিপিএ: ৩.৫০<br />বাধ্যতামূলক: এসএসসি ব্যবসায় শাখা বা সমমান পাস</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm">ভর্তি প্রক্রিয়া ও সময়সূচী:</h4>
                  <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 text-xs text-slate-600">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 bg-emerald-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">১</div>
                      <h5 className="font-bold text-slate-900">অনলাইন আবেদনপত্র দাখিল ও যোগ্যতা যাচাই</h5>
                      <p className="text-slate-500">মে ২৫, ২০২৬ থেকে জুন ২০, ২০২৬</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 bg-emerald-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">২</div>
                      <h5 className="font-bold text-slate-900">মেধাতালিকা ও অপেক্ষমান তালিকা প্রকাশ</h5>
                      <span className="text-slate-500">জুন ২৪, ২০২৬ (দুপুর ২:০০ টায়)</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 bg-slate-300 text-slate-800 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">৩</div>
                      <h5 className="font-bold text-slate-900">মূল কাগজপত্র জমাদান ও চূড়ান্ত আর্থিক নিষ্পত্তি</h5>
                      <p className="text-slate-500">জুন ২৫ থেকে জুন ৩০, ২০২৬</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document checklist & apply button */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100/80 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-bold text-slate-900 text-lg flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                  ভর্তির প্রয়োজনীয় কাগজপত্রের চেকলিস্ট
                </h3>
                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  ভর্তি স্লিপ জমা দেওয়ার সময় অবশ্যই সাথে আনতে হবে: এসএসসি পরীক্ষার মূল একাডেমিক মার্কশীট/ট্রান্সক্রিপ্ট, টেস্টীমোনিয়াল প্রশংসাপত্র, জন্ম নিবন্ধন সনদের ফটোকপি এবং অভিভাবক সহ শিক্ষার্থীর ৩ কপি রঙ্গিন পাসপোর্ট ছবি।
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-emerald-950 text-white hover:bg-emerald-900 text-xs font-bold rounded-xl shadow-md border border-emerald-950 cursor-pointer tracking-wider flex items-center gap-1 shrink-0"
              >
                অনলাইনে সরাসরি আবেদন করুন <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Form STEP 2 */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            key="step2"
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 lg:p-10 max-w-3xl mx-auto space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">একাদশ শ্রেণী অনলাইন ভর্তি আবেদন ফর্ম</h3>
                <p className="text-xs text-slate-500">যথাযথভাবে এবং সর্তকতার সাথে নিচের তথ্যসমূহ সম্পন্ন করুন।</p>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                ফিরে যান
              </button>
            </div>

            {applyError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-900 text-xs rounded-lg flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                <span>{applyError}</span>
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">কাঙ্ক্ষিত বিভাগ <span className="text-rose-500">*</span></label>
                <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="formDept" 
                      defaultChecked={targetDept === 'Science'} 
                      onClick={() => setTargetDept('Science')} 
                      className="accent-emerald-900"
                    />
                    বিজ্ঞান (Science)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="formDept" 
                      defaultChecked={targetDept === 'Humanities'} 
                      onClick={() => setTargetDept('Humanities')} 
                      className="accent-emerald-900"
                    />
                    মানবিক (Humanities)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="formDept" 
                      defaultChecked={targetDept === 'Business Studies'} 
                      onClick={() => setTargetDept('Business Studies')} 
                      className="accent-emerald-900"
                    />
                    ব্যবসায় শিক্ষা
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">শিক্ষার্থীর নাম (পূর্ণ নাম বাংলায়) <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: আহমেদ তানভীর"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">পিতা / অভিভাবকের নাম <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="যেমন: মো: জহিরুল ইসলাম"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">এসএসসি বিদ্যালয় (SSC School Name)</label>
                <input 
                  type="text" 
                  placeholder="যেমন: ঝিনাইগাতী পাইলট উচ্চ বিদ্যালয়"
                  value={formData.sscSchool}
                  onChange={(e) => setFormData({ ...formData, sscSchool: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">এসএসসি রোল <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="রোল লিখুন"
                    value={formData.sscRoll}
                    onChange={(e) => setFormData({ ...formData, sscRoll: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">এসএসসি রেজিস্ট্রেশন <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="রেজি: নং"
                    value={formData.sscRegistration}
                    onChange={(e) => setFormData({ ...formData, sscRegistration: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">মোবাইল নম্বর <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    required
                    placeholder="যেমন: ০১৭১১-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ইমেইল এড্রেস (ঐচ্ছিক)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">বর্তমান ঠিকানা (গ্রাম, উপজেলা ও জেলা)</label>
                <textarea 
                  rows={2}
                  placeholder="যেমন: গ্রাম- তিনআনী, ডাকঘর- ঝিনাইগাতী, শেরপুর"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="md:col-span-2 pt-4 flex gap-3 justify-end leading-none">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  আবেদন সম্পন্ন করুন
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 3 success slip */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key="step3"
            className="max-w-xl mx-auto space-y-6"
          >
            {/* Confirmation Box */}
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-2xl p-6 text-center shadow-sm space-y-3 no-print">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-1 animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">ভর্তির আবেদনপত্র সফলভাবে গৃহীত হয়েছে!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                অভিনন্দন! আপনার প্রাথমিক ভর্তির আবেদনটি নিবন্ধিত করা হয়েছে। দয়া করে নিচের রসিদটি প্রিন্ট অথবা কপি করে সংগ্রহে রাখুন।
              </p>
            </div>

            {/* Application Receipt slip - Printable */}
            <div className="bg-white border-2 border-slate-900/10 p-6 md:p-8 rounded-2xl shadow-md space-y-6 relative print-card">
              <div className="absolute top-0 right-0 p-4 border-b border-l border-slate-100/60 text-slate-400 font-mono text-[9px] uppercase tracking-wider select-none no-print">
                প্রাথমিক আবেদন কপি (অনলাইন)
              </div>
              
              {/* College Banner Header */}
              <div className="text-center border-b-2 border-slate-100 pb-4 space-y-1">
                <GraduationCap className="w-10 h-10 text-emerald-900 mx-auto" />
                <h2 className="text-xl font-bold text-slate-900">আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ</h2>
                <p className="text-[10px] text-slate-500 font-mono">ঝিনাইগাতী, শেরপুর, বাংলাদেশ | ভর্তি শিক্ষাবর্ষ: ২০২৬-২০২৭</p>
                <span className="inline-block px-3 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded-full uppercase tracking-wider mt-1.5">
                  আবেদন রসিদ (মেধাতালিকা ট্র্যাকিং)
                </span>
              </div>

              {/* Barcode tracking ID */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-dashed border-slate-100 bg-slate-50/50 p-3 rounded-lg">
                <div className="text-center sm:text-left space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Application ID</span>
                  <p className="text-sm font-bold font-mono text-emerald-900 tracking-widerCopy">{appId}</p>
                </div>
                <div className="text-center sm:text-right space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">আবেদনের তারিখ ও সময়</span>
                  <p className="text-xs font-mono text-slate-600">২০২৬-০৬-০৮ | ১০:৪২ AM</p>
                </div>
              </div>

              {/* Submission details */}
              <div className="space-y-3.5">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">আবেদনকারীর বিবরণী</h4>
                
                <div className="grid grid-cols-2 gap-y-2.5 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">শিক্ষার্থীর নাম</span>
                    <span className="font-bold text-slate-800">{formData.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">আবেদিত বিভাগ</span>
                    <span className="font-bold text-slate-800 text-primary">
                      {targetDept === 'Science' ? 'বিজ্ঞান (Science)' : targetDept === 'Humanities' ? 'মানবিক (Humanities)' : 'ব্যবসায় শিক্ষা (Business Studies)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">পিতার নাম</span>
                    <span>{formData.parentName || 'মো: জহিরুল ইসলাম'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">মোবাইল নম্বর</span>
                    <span className="font-mono">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">এসএসসি রোল</span>
                    <span className="font-mono">{formData.sscRoll}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px]">এসএসসি রেজিষ্ট্রেশন</span>
                    <span className="font-mono">{formData.sscRegistration}</span>
                  </div>
                  <div className="col-span-2 border-t border-slate-100 pt-2">
                    <span className="text-slate-400 block font-semibold text-[10px]">বর্তমান ঠিকানা</span>
                    <span className="italic">{formData.address || 'ঝিনাইগাতী সদর, শেরপুর'}</span>
                  </div>
                </div>
              </div>

              {/* Instructions footer */}
              <div className="border-t-2 border-dashed border-slate-100 pt-4 space-y-1.5 text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg">
                <p className="font-semibold text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 shrink-0" /> গুরুত্বপূর্ণ নির্দেশনা:
                </p>
                <ol className="list-decimal list-inside space-y-0.5 text-[9px]">
                  <li>এই আবেদন সাময়িক। আগামী ২৪শে জুন ২০২৬ তারিখে প্রকাশিতব্য সম্মিলিত মেধাতালিকার পর চূড়ান্ত ভর্তি নিশ্চিত করা হবে।</li>
                  <li>মেধাতালিকায় স্থানপ্রাপ্ত শিক্ষার্থীদের মূল কাগজপত্র ও ভর্তি ট্রান্সেকশন রসিদসহ ৩০শে জুনের মধ্যে কলেজ দপ্তরে উপস্থিত হতে হবে।</li>
                  <li>যেকোনো ত্রুটিপূর্ণ বা অসত্য তথ্যের জন্য আবেদন প্রক্রিয়াকরণ বাতিল করার সম্পূর্ণ অধিকার কলেজ কাউন্সিল সংরক্ষণ করে।</li>
                </ol>
              </div>
            </div>

            {/* Download/Reset actions */}
            <div className="flex gap-3 justify-end items-center no-print pb-6">
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({ studentName: '', parentName: '', sscSchool: '', sscRoll: '', sscRegistration: '', phone: '', email: '', address: '' });
                }}
                className="px-4 py-2 text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                নতুন আবেদন করুন
              </button>
              <button
                onClick={printSlip}
                className="px-5 py-2 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>রসিদ প্রিন্ট করুন</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
