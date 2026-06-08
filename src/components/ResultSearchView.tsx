import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Printer, Shield, CheckCircle2, AlertTriangle, RefreshCw, Smartphone, HelpCircle, GraduationCap } from 'lucide-react';
import { StudentResult } from '../types';

interface ResultSearchViewProps {
  results: StudentResult[];
}

export default function ResultSearchView({ results }: ResultSearchViewProps) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundResult, setFoundResult] = useState<StudentResult | null>(null);
  const [errorText, setErrorText] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) {
      setErrorText('দয়া করে সঠিক স্টুডেন্ট আইডি দিন।');
      return;
    }
    setErrorText('');
    
    // Find result locally
    const matched = results.find(
      (res) => res.studentId === studentId.trim()
    );

    if (matched) {
      setFoundResult(matched);
      setSearched(true);
    } else {
      setFoundResult(null);
      setSearched(true);
      setErrorText('অনুগ্রহ করে সঠিক আইডি দিন। ডেমো আইডি ব্যবহার করতে পারেন: 202601, 202602, 202603');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setStudentId('');
    setPassword('');
    setFoundResult(null);
    setSearched(false);
    setErrorText('');
  };

  return (
    <div className="space-y-8 py-6">
      {/* Page header */}
      <div className="text-center md:text-left space-y-2 no-print">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">অনলাইন ফলাফল অনুসন্ধান পোর্টাল</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের সেমিস্টার পরীক্ষা ও চূড়ান্ত নির্বাচনী পরীক্ষার একাডেমিক গ্রেড শিট অর্জন করুন।
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!foundResult ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            key="login-form"
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-lg mx-auto no-print"
          >
            {/* Banner strip */}
            <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white p-6 text-center space-y-1 relative">
              <GraduationCap className="w-8 h-8 text-amber-500 mx-auto" />
              <h2 className="text-lg font-bold">একাডেমিক ফলাফল ও মূল্যায়ন শিট</h2>
              <p className="text-xs text-slate-300">শিক্ষার্থী ট্র্যাকিং সেশন: ২০২৫-২০২৬</p>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {errorText && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-900 text-xs rounded-lg flex gap-2 font-medium">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-700 shrink-0 mt-0.5" />
                  <span>{errorText}</span>
                </div>
              )}

              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">স্টুডেন্ট আইডি নম্বর (Student ID) <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: 202601 বা 202602"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 select-none">ডেমো আইডি: 202601, 202602, 202603 (ব্যবহার করুন)</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1"> পাসওয়ার্ড / গোপন পিন (Security PIN)</label>
                  <input 
                    type="password" 
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  ফলাফল অনুসন্ধান করুন
                </button>
              </form>

              {/* Security advice */}
              <div className="border-t border-slate-100 pt-4 flex gap-3 items-start text-[10px] text-slate-500">
                <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>নিরাপত্তা নোটিশ:</strong> ছাত্র-ছাত্রীদের রেজাল্ট তথ্য অত্যন্ত সংবেদনশীল। অসদুপায় ও বেআইনি উদ্দেশ্যে রেজাল্ট দেখার চেষ্টা শাস্তিযোগ্য অপরাধ। যেকোনো পাসওয়ার্ড বা পিন সমস্যায় দয়া করে হেল্প ডেস্কে বা কলেজ আইসিটি সেলে সরাসরি যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            key="result-display"
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Quick Actions at the top */}
            <div className="flex gap-3 justify-between items-center no-print">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center gap-1 font-sans"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>নতুন অনুসন্ধান করুন</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4.5 py-2 bg-emerald-955 text-white hover:bg-emerald-950 bg-emerald-950 text-xs font-bold rounded-lg shadow-sm font-sans flex items-center gap-1.5 cursor-pointer border border-emerald-950"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>ফলাফল পত্র প্রিন্ট</span>
              </button>
            </div>

            {/* Print Friendly Grade sheet */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-md relative print-card">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-slate-400 border-l border-b border-slate-100 no-print">
                অফিসিয়াল কপি (ডিজিটাল)
              </div>

              {/* Official Academic Board college banner */}
              <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1.5">
                <GraduationCap className="w-11 h-11 text-emerald-900 mx-auto" />
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ</h1>
                <p className="text-xs text-slate-500 font-normal">ঝিনাইগাতী, শেরপুর, বাংলাদেশ | জিপিও এস্টাব্লিশড ৪১৩০</p>
                <h3 className="text-md font-bold text-slate-800 pt-1">একাডেমিক ট্রান্সক্রিপ্ট ও গ্রেড মূল্যায়ন পত্র</h3>
                <span className="inline-block px-3 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-100 text-[10px] font-bold rounded-full">
                  {foundResult.examName} ({foundResult.semester})
                </span>
              </div>

              {/* Student Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-600 py-2 border-b border-slate-100">
                <div className="grid grid-cols-2 gap-2 border-b sm:border-b-0 pb-2 sm:pb-0 border-slate-50">
                  <span className="text-slate-400 font-semibold text-[10px] uppercase">শিক্ষার্থীর নাম:</span>
                  <span className="font-bold text-slate-900">{foundResult.studentName}</span>
                  
                  <span className="text-slate-400 font-semibold text-[10px] uppercase">স্টুডেন্ট আইডি:</span>
                  <span className="font-mono font-bold text-slate-905">{foundResult.studentId}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-400 font-semibold text-[10px] uppercase">শিক্ষা শাখা (Dept):</span>
                  <span className="font-bold text-slate-908 text-slate-800">
                    {foundResult.department === 'Science' ? 'বিজ্ঞান (Science)' : foundResult.department === 'Humanities' ? 'মানবিক (Humanities)' : 'ব্যবসায় শিক্ষা (Business)'}
                  </span>
                  
                  <span className="text-slate-400 font-semibold text-[10px] uppercase">শিক্ষা সেশন:</span>
                  <span className="font-mono">{foundResult.session}</span>
                </div>
              </div>

              {/* GPA Display Circle Banner */}
              <div className="bg-gradient-to-br from-emerald-50/20 to-lime-50/10 p-5 rounded-xl border border-emerald-100/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">সর্বমোট গ্রেড পয়েন্ট</span>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">উচ্চ মাধ্যমিক শ্রেণী প্রথম বর্ষ মূল্যায়ন</h4>
                  <p className="text-xs text-slate-500">সকল তাত্ত্বিক ও ব্যবহারিক মূল্যায়নসহ চূড়ান্ত কৃতিত্ব জিপিএ।</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-center">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase">GPA</span>
                    <p className="text-2xl font-black text-emerald-900 font-mono tracking-wider">{foundResult.gpa.toFixed(2)}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-200" />
                  <div className="text-center">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase">গ্রেড</span>
                    <p className="text-2xl font-black text-amber-600 font-mono">
                      {foundResult.gpa >= 5.0 ? 'A+' : foundResult.gpa >= 4.0 ? 'A' : foundResult.gpa >= 3.5 ? 'A-' : foundResult.gpa >= 3.0 ? 'B' : 'F'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject-wise Marks Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-700 bg-slate-50 px-2 py-0.5 rounded leading-normal">বিষয়ভিত্তিক নম্বর বিবরণী</h4>
                <div className="overflow-x-auto border border-slate-100 rounded-lg">
                  <table className="w-full text-xs text-left text-slate-600 border-collapse min-w-[500px]">
                    <thead className="bg-slate-50 text-slate-800 border-b border-slate-100 select-none">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-bold border-r border-slate-100">বিষয় কোড ও নাম (Subject)</th>
                        <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">সর্বোচ্চ নম্বর</th>
                        <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">প্রাপ্ত নম্বর</th>
                        <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">প্রাপ্ত লেটার গ্রেড</th>
                        <th scope="col" className="px-4 py-3 font-bold text-center w-28">গ্রেড পয়েন্ট (GP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {foundResult.subjects.map((sub, index) => (
                        <tr key={index} className="hover:bg-slate-50/30">
                          <td className="px-4 py-3 font-semibold text-slate-900 border-r border-slate-100">{sub.subjectName}</td>
                          <td className="px-4 py-3 text-center border-r border-slate-100 font-mono text-slate-400">১০০</td>
                          <td className="px-4 py-3 font-bold text-center border-r border-slate-100 font-mono text-slate-800">{sub.marks}</td>
                          <td className="px-4 py-3 text-center border-r border-slate-100">
                            <span className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                              sub.grade === 'A+' ? 'bg-emerald-50 text-emerald-800' :
                              sub.grade === 'A' ? 'bg-indigo-50 text-indigo-800' :
                              sub.grade === 'A-' ? 'bg-sky-50 text-sky-800' :
                              'bg-rose-50 text-rose-800'
                            }`}>
                              {sub.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold text-center font-mono text-emerald-900">{sub.gp.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Official stamp columns */}
              <div className="grid grid-cols-3 pt-12 text-center text-[10px] text-slate-500 font-semibold gap-4 leading-none select-none">
                <div>
                  <div className="h-[1px] bg-slate-205 bg-slate-300 w-28 mx-auto mb-2" />
                  <span>তৈরীকারী সহকারী</span>
                </div>
                <div>
                  <div className="h-[1px] bg-slate-205 bg-slate-300 w-28 mx-auto mb-2" />
                  <span>পরীক্ষা নিয়ন্ত্রক</span>
                </div>
                <div>
                  <div className="h-[1px] bg-slate-205 bg-slate-250 w-28 mx-auto mb-2" />
                  <span className="font-bold text-slate-750 text-slate-800">অধ্যক্ষ মহোদয়</span>
                  <p className="text-[8px] text-slate-400 mt-0.5">ভারপ্রাপ্ত, এএসজিডিসি</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
