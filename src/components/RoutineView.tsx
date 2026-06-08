import { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarRange, Download, Clock, BookOpen, Check, FileText } from 'lucide-react';
import { RoutineItem } from '../types';

interface RoutineViewProps {
  routines: RoutineItem[];
}

export default function RoutineView({ routines }: RoutineViewProps) {
  const [selectedDept, setSelectedDept] = useState<'Science' | 'Humanities' | 'Business Studies'>('Science');
  const [selectedYear, setSelectedYear] = useState<'1st Year' | '2nd Year'>('1st Year');
  const [downloading, setDownloading] = useState(false);

  // Filter routine items
  const filteredRoutines = routines.filter(
    (item) => item.department === selectedDept && item.year === selectedYear
  );

  const startDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`রুটিন ডাউনলোড সফল হয়েছে: class_${selectedDept}_${selectedYear.replace(' ', '_')}_routine.pdf`);
    }, 1500);
  };

  const periodTimes = [
    { name: '১ম পিরিয়ড', time: '১০:০০ - ১০:৪৫ AM' },
    { name: '২য় পিরিয়ড', time: '১০:৪৫ - ১১:৩০ AM' },
    { name: '৩য় পিরিয়ড', time: '১১:৩০ - ১২:১৫ PM' },
    { name: 'মধ্যাহ্ন বিরতি (Recess)', time: '১২:১৫ - ০১:০০ PM' },
    { name: '৪র্থ পিরিয়ড', time: '০১:০০ - ০১:৪৫ PM' },
    { name: '৫ম পিরিয়ড', time: '০১:৪৫ - ০২:৩০ PM' }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">শ্রেণী ক্লাস রুটিন ২০২৬</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          উচ্চ মাধ্যমিক একাদশ ও দ্বাদশ শ্রেণীর সর্বশেষ হালনাগাদকৃত ক্লাসের সময়সূচী এবং পরীক্ষার রুটিন।
        </p>
      </div>

      {/* Selector controls */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4 justify-between items-center sm:shrink-0">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Dept filter */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">শাখা নির্বাচন</span>
            <div className="inline-flex border border-slate-200 p-1 bg-slate-50 rounded-lg">
              {['Science', 'Humanities', 'Business Studies'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedDept === dept 
                      ? 'bg-emerald-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {dept === 'Science' ? 'বিজ্ঞান' : dept === 'Humanities' ? 'মানবিক' : 'ব্যবসায় শিক্ষা'}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">বর্ষ নির্বাচন</span>
            <div className="inline-flex border border-slate-200 p-1 bg-slate-50 rounded-lg">
              {['1st Year', '2nd Year'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedYear === year 
                      ? 'bg-emerald-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {year === '1st Year' ? '১ম বর্ষ (XI)' : '২য় বর্ষ (XII)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={startDownload}
          disabled={downloading}
          className="w-full sm:w-auto px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm border border-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:border-slate-300 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <>
              <Check className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>ডাউনলোড হচ্ছে...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>রুটিন PDF ডাউনলোড</span>
            </>
          )}
        </button>
      </div>

      {/* Routine Grid Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Class Timings Help Column */}
        <div className="lg:col-span-4 bg-emerald-950 text-white p-6 rounded-2xl shadow-sm border border-emerald-900 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 border-b border-emerald-900 pb-3">
            <Clock className="w-5 h-5" />
            <h3 className="text-base font-bold">পিরিয়ড ও সময়সূচী</h3>
          </div>
          
          <div className="space-y-4">
            {periodTimes.map((item, id) => (
              <div key={id} className={`flex justify-between items-center text-xs pb-2 border-b border-emerald-900/40 ${
                item.name.includes('বিরতি') ? 'text-amber-400 font-medium' : 'text-slate-200'
              }`}>
                <span>{item.name}</span>
                <span className="font-mono">{item.time}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 bg-emerald-900/30 p-3 border border-emerald-900/50 rounded-lg text-[10px] text-slate-300 leading-relaxed">
            <span className="font-semibold text-white block mb-0.5">রুটিন নির্দেশনা:</span>
            * কোনো ক্লাস বাতিল বা যুক্তিসঙ্গত কারণে পরিবর্তিত হলে তাৎক্ষণিক নোটিশ বোর্ডে ও স্টুডেন্ট পোর্টালের নোটিফিকেশনে আপডেট জানানো হবে। কোনো শিক্ষকের অনুপস্থিতিতে প্রক্সি পিরিয়ড ব্যবস্থা চালু থাকবে।
          </div>
        </div>

        {/* Timetable schedule block styled as an office document sheet */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <CalendarRange className="w-5 h-5 text-emerald-800" />
            <h3 className="text-lg font-bold text-slate-900">
              {selectedYear === '1st Year' ? '১ম বর্ষ (ক্লাস-XI)' : '২য় বর্ষ (ক্লাস-XII)'} - {selectedDept === 'Science' ? 'বিজ্ঞান শাখা' : selectedDept === 'Humanities' ? 'মানবিক শাখা' : 'ব্যবসায় শিক্ষা শাখা'} রুটিন
            </h3>
          </div>

          {filteredRoutines.length > 0 ? (
            <div className="overflow-x-auto border border-slate-100 rounded-xl max-w-full">
              <table className="w-full text-xs text-left text-slate-600 border-collapse min-w-[600px]">
                <thead className="bg-slate-50 text-slate-800 border-b border-slate-100 select-none">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold border-r border-slate-100 w-32">বার (Day)</th>
                    <th scope="col" className="px-3 py-3 font-semibold border-r border-slate-100">১০:০০ - ১০:৪৫</th>
                    <th scope="col" className="px-3 py-3 font-semibold border-r border-slate-100">১০:৪৫ - ১১:৩০</th>
                    <th scope="col" className="px-3 py-3 font-semibold border-r border-slate-100">১১:৩০ - ১২:১৫</th>
                    <th scope="col" className="px-3 py-3 font-semibold border-r border-slate-100 bg-amber-50/25 text-amber-800 text-center text-[10px]">১২:১৫-০১:০০</th>
                    <th scope="col" className="px-3 py-3 font-semibold border-r border-slate-100 text-emerald-900 font-bold">০১:০০ - ০১:৪৫</th>
                    <th scope="col" className="px-3 py-3 font-semibold">০১:৪৫ - ০২:৩০</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRoutines.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-slate-900 border-r border-slate-100 bg-slate-50/20">{item.day}</td>
                      <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period1 || 'ফ্রি পিরিয়ড'}</td>
                      <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period2 || 'ফ্রি পিরিয়ড'}</td>
                      <td className="px-3 py-3.5 border-r border-slate-100 font-medium">{item.period3 || 'ফ্রি পিরিয়ড'}</td>
                      <td className="px-3 py-3.5 border-r border-slate-100 bg-amber-50/15 text-center text-[10px] text-amber-800 font-semibold select-none">মধ্যাহ্ন বিরতি (Recess)</td>
                      <td className="px-3 py-3.5 border-r border-slate-100 text-emerald-950 font-bold">{item.period4 || 'ফ্রি পিরিয়ড'}</td>
                      <td className="px-3 py-3.5 font-medium">{item.period5 || 'ফ্রি পিরিয়ড'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h4 className="font-bold text-slate-700 text-sm">রুটিন ডাটা পাওয়া যায়নি</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                ২য় বর্ষের রুটিন লোড করতে কলেজের অফিসিয়াল একাডেমিক রুটিন পিডিএফ ডাইনলোড করুন অথবা নোটিশ বোর্ড চেক করুন।
              </p>
            </div>
          )}

          {/* Routine PDF Preview box */}
          <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-100 text-rose-800 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">২০২৬ মেয়াদী শিক্ষাবর্ষের আনুষ্ঠানিক রুটিন.pdf</h4>
                <p className="text-[10px] text-slate-500">ফাইলের আকার: ২.৪ MB | সর্বশেষ আপডেট: ১০ই মে, ২০২৬</p>
              </div>
            </div>
            <button
              onClick={startDownload}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-lg transition-all cursor-pointer"
            >
              ডাউনলোড করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
