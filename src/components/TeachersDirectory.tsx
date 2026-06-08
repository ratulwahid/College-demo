import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Search, SlidersHorizontal, Award, Calendar } from 'lucide-react';
import { Teacher } from '../types';

interface TeachersDirectoryProps {
  teachers: Teacher[];
}

export default function TeachersDirectory({ teachers }: TeachersDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<'All' | 'Science' | 'Humanities' | 'Business Studies' | 'General'>('All');

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.nameEn && teacher.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (teacher.designationEn && teacher.designationEn.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesDept = selectedDept === 'All' || teacher.department === selectedDept;
    
    return matchesSearch && matchesDept;
  });

  const departmentTranslate = (dept: string) => {
    switch(dept) {
      case 'Science': return 'বিজ্ঞান শাখা';
      case 'Humanities': return 'মানবিক শাখা';
      case 'Business Studies': return 'ব্যবসায় শিক্ষা শাখা';
      case 'General': return 'সাধারণ প্রশাসন';
      default: return 'অন্যান্য';
    }
  };

  const departmentBadgeColor = (dept: string) => {
    switch(dept) {
      case 'Science': return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'Humanities': return 'bg-sky-50 text-sky-800 border-sky-100';
      case 'Business Studies': return 'bg-amber-50 text-amber-800 border-amber-100';
      case 'General': return 'bg-rose-50 text-rose-800 border-rose-100';
      default: return 'bg-slate-50 text-slate-800 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Page Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">শিক্ষক ফোরাম ও ডিরেক্টরি</h1>
        <p className="text-slate-500 text-xs md:text-sm">
          আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের দক্ষ, অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক-শিক্ষিকাদের তালিকা।
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="শিক্ষকের নাম বা পদবী লিখুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 transition-all bg-slate-50"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto items-center">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-1 hidden sm:block" />
          {[
            { id: 'All', label: 'সকল শাখা' },
            { id: 'Science', label: 'বিজ্ঞান' },
            { id: 'Humanities', label: 'মানবিক' },
            { id: 'Business Studies', label: 'ব্যবসায় শিক্ষা' },
            { id: 'General', label: 'প্রশাসন' }
          ].map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id as any)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                selectedDept === dept.id 
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTeachers.map((teacher, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              key={teacher.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Profile Card Header with color strip */}
              <div>
                <div className={`h-2.5 bg-gradient-to-r ${
                  teacher.department === 'Science' ? 'from-emerald-800 to-teal-700' :
                  teacher.department === 'Humanities' ? 'from-sky-700 to-indigo-600' :
                  teacher.department === 'Business Studies' ? 'from-amber-600 to-yellow-500' :
                  'from-rose-800 to-rose-600'
                }`} />
                
                <div className="p-6 pb-2 space-y-4">
                  <div className="flex gap-4 items-start">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-emerald-800/20 transition-all shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 select-none">
                      <span className={`inline-block px-2 py-0.5 border rounded-md text-[10px] font-semibold ${departmentBadgeColor(teacher.department)}`}>
                        {departmentTranslate(teacher.department)}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-900 transition-colors">{teacher.name}</h3>
                      <p className="text-slate-500 font-mono text-[10px]">{teacher.nameEn}</p>
                    </div>
                  </div>
                  
                  {/* Designation */}
                  <div className="bg-slate-50 border border-slate-100/60 rounded-lg p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-950">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>{teacher.designation}</span>
                    </div>
                    {teacher.designationEn && (
                      <p className="text-[10px] text-slate-400 font-mono pl-5">{teacher.designationEn}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="p-6 pt-2 border-t border-slate-50 space-y-3 bg-slate-50/40">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 hover:text-emerald-800 transition-colors">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{teacher.email}</span>
                  </a>
                  <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 hover:text-emerald-800 transition-colors font-mono">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{teacher.phone}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100/80 pt-2 bg-transparent">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>আইডি: {teacher.id}</span>
                  </span>
                  <span>যোগদান: {teacher.joiningDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredTeachers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700 text-base">কোনো শিক্ষক খুঁজে পাওয়া যায়নি</h4>
            <p className="text-xs text-slate-500 mt-1">অনুগ্রহ করে ভিন্ন কোনো নাম বা সার্চ কুয়েরি দিয়ে পুনরায় চেষ্টা করুন।</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
