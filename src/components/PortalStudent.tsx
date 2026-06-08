import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, User, Award, Calendar, Bell, Shield, BookOpen, Clock, Activity, CreditCard, CheckCircle, HelpCircle, Lock } from 'lucide-react';
import { Student, StudentResult, RoutineItem, Notice } from '../types';

interface PortalStudentProps {
  currentStudent: Student;
  currentResult: StudentResult | undefined;
  studentRoutine: RoutineItem[];
  notices: Notice[];
  onLogout: () => void;
}

export default function PortalStudent({ currentStudent, currentResult, studentRoutine, notices, onLogout }: PortalStudentProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'result' | 'routine' | 'notices' | 'academics'>('profile');

  // Academic static stats
  const attendancePercentage = 88;
  const courseRegistrationFees = '২৪০০/- (প্রদত্ত)';
  const examFees = '১২০০/- (মোট বকেয়া: ০.০০)';

  const deptTranslateEnToBn = (dept: string) => {
    switch (dept) {
      case 'Science': return 'বিজ্ঞান (Science)';
      case 'Humanities': return 'মানবিক (Humanities)';
      case 'Business Studies': return 'ব্যবসায় শিক্ষা (Business Studies)';
      default: return dept;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen rounded-2xl border border-slate-100 p-4 md:p-6 lg:p-8 space-y-6">
      {/* Portal Top Header with branding */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.1),transparent_60%)]" />
        <div className="flex items-center gap-4 relative">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <User className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">স্টুডেন্ট ডিজিটাল পোর্টাল</span>
            <h2 className="text-xl font-bold">{currentStudent.name}</h2>
            <p className="text-xs text-slate-300 font-mono">আইডি: {currentStudent.id} | {deptTranslateEnToBn(currentStudent.department)}</p>
          </div>
        </div>

        {/* Logout widget */}
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/25 text-white border border-white/20 hover:border-white/30 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer relative shrink-0"
        >
          <LogOut className="w-3.5 h-3.5 text-amber-400" />
          <span>লগআউট (Logout)</span>
        </button>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Portal Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 p-4 space-y-2 shrink-0 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-2.5 mb-2">মেনু অপশনসমূহ</span>
          
          {[
            { id: 'profile', label: 'শিক্ষার্থীর প্রোফাইল', icon: User },
            { id: 'result', label: 'পরীক্ষার রেজাল্ট', icon: Award },
            { id: 'routine', label: 'শ্রেণী রুটিন', icon: Calendar },
            { id: 'notices', label: 'ব্যক্তিগত নোটিশ', icon: Bell },
            { id: 'academics', label: 'একাডেমিক তথ্য', icon: BookOpen }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full px-3 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-emerald-900 border-l-4 border-l-amber-500 text-white' 
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Content Frame */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-slate-100 p-6 md:p-8 space-y-6 shadow-sm min-h-[400px]">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">শিক্ষার্থীর ব্যক্তিগত বিবরণী</h3>
                <p className="text-xs text-slate-500">অনলাইন ডাটাবেজে সংরক্ষিত আপনার অ্যাকাউন্টের সম্পূর্ণ বিবরণ।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100/60 grid grid-cols-2 gap-y-3.5 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">পূর্ণ নাম (বাংলায়)</span>
                      <span className="font-bold text-slate-800">{currentStudent.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">শ্রেণী রোল</span>
                      <span className="font-mono font-bold text-slate-800">{currentStudent.classRoll}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">নিবন্ধিত বিভাগ</span>
                      <span className="font-bold text-emerald-900">{deptTranslateEnToBn(currentStudent.department)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">শিক্ষা সেশন</span>
                      <span className="font-mono text-slate-800">{currentStudent.session}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100/60 grid grid-cols-2 gap-y-3.5 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">পিতা/অভিভাবকের নাম</span>
                      <span className="font-bold text-slate-800">{currentStudent.parentsName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">অ্যাকাউন্ট স্ট্যাটাস</span>
                      <span className="px-2 py-0.5 bg-emerald-150 bg-emerald-100 text-emerald-800 rounded font-semibold text-[9px] uppercase tracking-wide">
                        {currentStudent.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">যোগাযোগ মোবাইল</span>
                      <span className="font-mono">{currentStudent.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">ইমেইল এড্রেস</span>
                      <span className="font-mono truncate">{currentStudent.email}</span>
                    </div>
                  </div>
                </div>

                {/* Info and statistics widgets */}
                <div className="space-y-4">
                  {/* Attendance display stats card */}
                  <div className="p-4 bg-gradient-to-br from-emerald-900/5 to-emerald-950/5 border border-emerald-900/10 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">ডিজিটাল হাজিরা রেকর্ড (উপস্থিতি)</span>
                      <span className="px-2 py-0.5 bg-emerald-900 text-white text-[10px] font-bold rounded">ভাল</span>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-full border-4 border-emerald-900 flex items-center justify-center font-bold text-slate-800 scale-95 font-mono text-base bg-white shadow-sm shrink-0 duration-300">
                        {attendancePercentage}%
                      </div>
                      <div className="space-y-0.5 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700">নিয়মিত শ্রেণী উপস্থিতি আবশ্যক।</p>
                        <p className="text-[10px] leading-relaxed">৮০% এর নিচে উপস্থিতি থাকলে পরবর্তী চূড়ান্ত বোর্ড পরীক্ষায় অংশগ্রহণে বাধা সৃষ্টির বিধান রয়েছে।</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex gap-3.5 items-start text-xs text-slate-500">
                    <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">নিরাপত্তা ও সেটিংস পিন</h4>
                      <p className="text-[10px] leading-relaxed">আপনার স্টুডেন্ট পিন নম্বর পরিবর্তন অথবা কোনো ত্রুটিপূর্ণ শিক্ষার্থীর তথ্য সংশোধনে কলেজের প্রধান অফিস কক্ষে যোগাযোগ করুন।</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULT TAB */}
          {activeTab === 'result' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">পরীক্ষার ফলাফল তালিকা</h3>
                  <p className="text-xs text-slate-500">চলতি শিক্ষাবর্ষের অর্ধবার্ষিক সেমিস্টার পরীক্ষার নম্বর শিট।</p>
                </div>
                {currentResult && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">
                    মোট জিপিএ: {currentResult.gpa.toFixed(2)}
                  </span>
                )}
              </div>

              {currentResult ? (
                <div className="space-y-6">
                  {/* Results subject summary */}
                  <div className="overflow-x-auto border border-slate-100 rounded-xl">
                    <table className="w-full text-xs text-left text-slate-600 border-collapse min-w-[500px]">
                      <thead className="bg-slate-50 text-slate-800 border-b border-slate-100">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-bold border-r border-slate-100">বিষয় নাম (Subject Name)</th>
                          <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">সর্বোচ্চ নম্বর</th>
                          <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">প্রাপ্ত নম্বর</th>
                          <th scope="col" className="px-4 py-3 font-bold text-center border-r border-slate-100 w-28">প্রাপ্ত গ্রেড</th>
                          <th scope="col" className="px-4 py-3 font-bold text-center w-28">গ্রেড পয়েন্ট (GP)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentResult.subjects.map((sub, index) => (
                          <tr key={index} className="hover:bg-slate-50/10">
                            <td className="px-4 py-3.5 font-semibold text-slate-800 border-r border-slate-100">{sub.subjectName}</td>
                            <td className="px-4 py-3.5 text-center border-r border-slate-100 font-mono text-slate-400">১০০</td>
                            <td className="px-4 py-3.5 font-bold text-center border-r border-slate-100 font-mono text-emerald-950">{sub.marks}</td>
                            <td className="px-4 py-3.5 text-center border-r border-slate-100">
                              <span className={`px-2 py-0.5 text-[11px] font-extrabold rounded ${
                                sub.grade === 'A+' ? 'bg-emerald-50 text-emerald-800' :
                                sub.grade === 'A' ? 'bg-indigo-50 text-indigo-800' :
                                'bg-sky-50 text-sky-800'
                              }`}>
                                {sub.grade}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-bold text-center font-mono text-emerald-900">{sub.gp.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                  <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700 text-sm">কোনো রেজাল্ট ডাটা পাওয়া যায়নি</h4>
                  <p className="text-[11px] text-slate-505 mt-1">আপনার সেকশনের মূল্যায়ন শিটসমূহ এখনও চূড়ান্তভাবে পাবলিশ হয়নি।</p>
                </div>
              )}
            </div>
          )}

          {/* ROUTINE TAB */}
          {activeTab === 'routine' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">আপনার ব্যক্তিগত শ্রেণী সময়সূচী</h3>
                <p className="text-xs text-slate-500">আপনার শিক্ষা বিভাগের সাপ্তাহিক পিরিয়ড লিস্ট।</p>
              </div>

              {studentRoutine.length > 0 ? (
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-xs text-left text-slate-600 border-collapse min-w-[550px]">
                    <thead className="bg-slate-50 text-slate-800 border-b border-slate-100">
                      <tr>
                        <th className="px-4 py-3.5 font-bold border-r border-slate-100">জন (Day)</th>
                        <th className="px-3 py-3.5 font-semibold border-r border-slate-100">১০:০০ - ১০:৪৫</th>
                        <th className="px-3 py-3.5 font-semibold border-r border-slate-100">১০:৪৫ - ১১:৩০</th>
                        <th className="px-3 py-3.5 font-semibold border-r border-slate-100">১১:৩০ - ১২:১৫</th>
                        <th className="px-3 py-3.5 font-semibold border-r border-slate-100 bg-amber-50/20 text-center text-[10px] text-amber-800 w-24">রিসেস বিরতি</th>
                        <th className="px-3 py-3.5 font-semibold border-r border-slate-100 text-emerald-900">০১:০০ - ০১:৪৫</th>
                        <th className="px-3 py-3.5 font-semibold">০১:৪৫ - ০২:৩০</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentRoutine.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-100 bg-slate-50/10">{item.day.split(' ')[0]}</td>
                          <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period1}</td>
                          <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period2}</td>
                          <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period3}</td>
                          <td className="px-3 py-3.5 border-r border-slate-100 bg-amber-50/5 text-center text-[10px] uppercase font-bold text-amber-800">বিরতি</td>
                          <td className="px-3 py-3.5 border-r border-slate-100 text-emerald-950 font-bold">{item.period4}</td>
                          <td className="px-3 py-3.5 font-medium">{item.period5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="py-12 text-center text-xs text-slate-450 border border-dashed rounded-xl">শ্রেণী রুটিন লোড ব্যর্থ হয়েছে।</p>
              )}
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">ব্যক্তিগত পোর্টাল নোটিফিকেশন বিজ্ঞপ্তি</h3>
                <p className="text-xs text-slate-500">বিশেষ নোটিশ ও জরুরী নির্দেশনা সমূহ।</p>
              </div>

              <div className="space-y-4">
                {notices.slice(0, 3).map((note) => (
                  <div key={note.id} className="p-4 rounded-xl border border-slate-150 border-slate-100 bg-slate-50/50 flex gap-3.5 items-start">
                    <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                      <Bell className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold tracking-wider">{note.date}</span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{note.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed pt-1">{note.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACADEMICS TAB */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">একাডেমিক বুকলেট ও ফি বিবরণী</h3>
                <p className="text-xs text-slate-500">ডিজিটাল ট্রান্সেকশন ও কোর্স পাঠ্যসূচী বিবরণী।</p>
              </div>

              {/* Grid accounting ledgers and registered courses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Ledger widget */}
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <CreditCard className="w-4.5 h-4.5 text-emerald-805 text-emerald-800" />
                    বেতন ও পরীক্ষার ফি ট্রান্সেকশন খতিয়ান
                  </h4>
                  
                  <div className="space-y-3.5 text-xs text-slate-600">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span>০১. কোর্স সেমিস্টার ফি</span>
                      <span className="font-bold text-emerald-800">{courseRegistrationFees}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span>০২. অর্ধবার্ষিক পরীক্ষা ফি</span>
                      <span className="font-bold text-slate-700">{examFees}</span>
                    </div>
                    <div className="flex justify-between items-center pb-1">
                      <span>০৩. অন্যান্য বকেয়া জরিমানা</span>
                      <span className="font-bold text-rose-700">০.০০/-</span>
                    </div>
                  </div>
                </div>

                {/* Course catalog subjects list */}
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <BookOpen className="w-4.5 h-4.5 text-emerald-805 text-emerald-800" />
                    নিবন্ধিত পাঠ্যসূচী সূচীপত্র (Syllabus)
                  </h4>

                  <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                    <li>বাংলা ১ম ও ২য় পত্র (আবশ্যিক)</li>
                    <li>ইংরেজি ১ম ও ২য় পত্র (আবশ্যিক)</li>
                    <li>তথ্য ও যোগাযোগ প্রযুক্তি (ICT) (আবশ্যিক)</li>
                    {currentStudent.department === 'Science' ? (
                      <>
                        <li>পদার্থবিজ্ঞান (তাত্ত্বিক ও ল্যাব)</li>
                        <li>রসায়নবিজ্ঞান (তাত্ত্বিক ও ল্যাব)</li>
                        <li>উচ্চতর গণিত ও জীব বিজ্ঞান</li>
                      </>
                    ) : currentStudent.department === 'Humanities' ? (
                      <>
                        <li>ইসলামের ইতিহাস ও সংস্কৃতি</li>
                        <li>পৌরনীতি ও সুশাসন</li>
                        <li>যুক্তিবিদ্যা ও অর্থনীতি</li>
                      </>
                    ) : (
                      <>
                        <li>হিসাববিজ্ঞান</li>
                        <li>ব্যবসায় সংগঠন ও ব্যবস্থাপনা</li>
                        <li>ফিন্যান্স ও ব্যাংকিং</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
