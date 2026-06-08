import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, FileText, Image as ImageIcon, Plus, Trash2, 
  Search, Calculator, CalendarClock, Settings, LogOut, CheckCircle2, 
  AlertTriangle, UploadCloud, Edit3, Save, Compass, UserCheck, Shield
} from 'lucide-react';
import { Notice, Teacher, Student, StudentResult, ScoreDetail } from '../types';

interface DashboardAdminProps {
  notices: Notice[];
  teachers: Teacher[];
  students: Student[];
  results: StudentResult[];
  onAddNotice: (notice: Notice) => void;
  onAddTeacher: (teacher: Teacher) => void;
  onAddStudent: (student: Student) => void;
  onUpdateResult: (result: StudentResult) => void;
  onLogout: () => void;
}

export default function DashboardAdmin({ 
  notices, teachers, students, results,
  onAddNotice, onAddTeacher, onAddStudent, onUpdateResult, onLogout
}: DashboardAdminProps) {
  
  const [activeMenu, setActiveMenu] = useState<
    'overview' | 'manage-notices' | 'manage-teachers' | 'manage-students' | 'manage-results' | 'settings'
  >('overview');

  const [bannerAlert, setBannerAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // States for compiling/adding notice
  const [newNotice, setNewNotice] = useState({
    title: '',
    titleEn: '',
    category: 'academic' as any,
    content: '',
    isPin: false
  });

  // States for adding teacher
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    nameEn: '',
    designation: '',
    designationEn: '',
    department: 'Science' as any,
    email: '',
    phone: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80'
  });

  // States for adding student
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    classRoll: '',
    department: 'Science' as any,
    parentsName: '',
    phone: '',
    email: ''
  });

  // States for managing / entering marks and calculating GPA
  const [targetStudentId, setTargetStudentId] = useState('');
  const [selectedStudentForMarks, setSelectedStudentForMarks] = useState<Student | null>(null);
  
  // Custom interactive marks worksheet
  const [subjectScores, setSubjectScores] = useState<{ name: string; marks: number }[]>([
    { name: 'বাংলা ১ম পত্র', marks: 80 },
    { name: 'ইংরেজি ১ম পত্র', marks: 80 },
    { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 80 },
    { name: 'পদার্থবিজ্ঞান / ইতিহাস / হিসাববিজ্ঞান', marks: 80 },
    { name: 'রসায়ন / পৌরনীতি / ব্যবসায় সংগঠন', marks: 80 },
    { name: 'উচ্চতর গণিত / যুক্তিবিদ্যা / ফিন্যান্স', marks: 80 }
  ]);

  const triggerAlert = (type: 'success' | 'error', text: string) => {
    setBannerAlert({ type, message: text });
    setTimeout(() => {
      setBannerAlert(null);
    }, 4000);
  };

  // Submission handler for Notice
  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) {
      triggerAlert('error', 'দয়া করে নোটিশের শিরোনাম ও বিস্তারিত বিবরণ পূরণ করুন।');
      return;
    }
    const noticeObj: Notice = {
      id: 'N-' + Math.floor(106 + Math.random() * 900),
      title: newNotice.title,
      titleEn: newNotice.titleEn || undefined,
      date: new Date().toISOString().split('T')[0],
      category: newNotice.category,
      pdfUrl: '#',
      isPin: newNotice.isPin,
      content: newNotice.content
    };
    onAddNotice(noticeObj);
    triggerAlert('success', 'নতুন নোটিশটি সফলভাবে ডিজিটাল বোডে আপলোড করা হয়েছে!');
    setNewNotice({ title: '', titleEn: '', category: 'academic', content: '', isPin: false });
  };

  // Submission handler for Teacher
  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.designation || !newTeacher.phone) {
      triggerAlert('error', 'দয়া করে শিক্ষকের পুরো নাম, পদবী ও মোবাইল নম্বর দিন।');
      return;
    }
    const teacherObj: Teacher = {
      id: 'T-' + Math.floor(10 + Math.random() * 90),
      name: newTeacher.name,
      nameEn: newTeacher.nameEn || undefined,
      designation: newTeacher.designation,
      designationEn: newTeacher.designationEn || undefined,
      department: newTeacher.department,
      email: newTeacher.email || 'teacher.' + Math.floor(100 + Math.random() * 800) + '@asgdc.edu.bd',
      phone: newTeacher.phone,
      image: newTeacher.image,
      joiningDate: new Date().toISOString().split('T')[0]
    };
    onAddTeacher(teacherObj);
    triggerAlert('success', `শিক্ষক ${newTeacher.name} মহোদয়ের প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে!`);
    setNewTeacher({ name: '', nameEn: '', designation: '', designationEn: '', department: 'Science', email: '', phone: '', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80' });
  };

  // Submission handler for Student
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.id || !newStudent.name || !newStudent.classRoll) {
      triggerAlert('error', 'দয়া করে শিক্ষার্থীর আইডি নম্বর, পূর্ণ নাম ও রোল লিখুন।');
      return;
    }
    const studentObj: Student = {
      id: newStudent.id,
      name: newStudent.name,
      classRoll: newStudent.classRoll,
      department: newStudent.department,
      parentsName: newStudent.parentsName || 'মো: জহিরুল ইসলাম',
      phone: newStudent.phone || '০১৭১১-২২৩৩৪৪',
      email: newStudent.email || 'student@gmail.com',
      status: 'Active',
      session: '২০২৫-২০২৬'
    };
    onAddStudent(studentObj);
    triggerAlert('success', `নতুন শিক্ষার্থী ${newStudent.name} সফলভাবে তথ্যভুক্ত হয়েছে!`);
    setNewStudent({ id: '', name: '', classRoll: '', department: 'Science', parentsName: '', phone: '', email: '' });
  };

  // Helper to calculate Grade and GPA points from single score
  const getGPDetail = (marks: number): { grade: string; gp: number } => {
    if (marks >= 80) return { grade: 'A+', gp: 5.0 };
    if (marks >= 70) return { grade: 'A', gp: 4.0 };
    if (marks >= 60) return { grade: 'A-', gp: 3.5 };
    if (marks >= 50) return { grade: 'B', gp: 3.0 };
    if (marks >= 40) return { grade: 'C', gp: 2.0 };
    if (marks >= 33) return { grade: 'D', gp: 1.0 };
    return { grade: 'F', gp: 0.0 };
  };

  // Marks Search
  const searchStudentForMarks = () => {
    const student = students.find(st => st.id === targetStudentId.trim());
    if (student) {
      setSelectedStudentForMarks(student);
      
      // Update template subjects based on department
      const scienceSubjects = [
        { name: 'বাংলা ১ম পত্র', marks: 80 },
        { name: 'ইংরেজি ১ম পত্র', marks: 80 },
        { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 80 },
        { name: 'পদার্থবিজ্ঞান', marks: 80 },
        { name: 'রসায়ন', marks: 80 },
        { name: 'উচ্চতর গণিত', marks: 80 }
      ];
      const artsSubjects = [
        { name: 'বাংলা ১ম পত্র', marks: 80 },
        { name: 'ইংরেজি ১ম পত্র', marks: 80 },
        { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 80 },
        { name: 'ইতিহাস', marks: 80 },
        { name: 'পৌরনীতি ও সুশাসন', marks: 80 },
        { name: 'যুক্তিবিদ্যা', marks: 80 }
      ];
      const commerceSubjects = [
        { name: 'বাংলা ১ম পত্র', marks: 80 },
        { name: 'ইংরেজি ১ম পত্র', marks: 80 },
        { name: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 80 },
        { name: 'হিসাববিজ্ঞান', marks: 80 },
        { name: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা', marks: 80 },
        { name: 'ফিন্যান্স ও ব্যাংকিং', marks: 80 }
      ];

      if (student.department === 'Science') setSubjectScores(scienceSubjects);
      else if (student.department === 'Humanities') setSubjectScores(artsSubjects);
      else setSubjectScores(commerceSubjects);

      triggerAlert('success', `শিক্ষার্থী ${student.name} কে খুঁজে পাওয়া গিয়েছে। মার্ক ফিল্ডগুলো এন্ট্রি করুন।`);
    } else {
      setSelectedStudentForMarks(null);
      triggerAlert('error', `রোল নম্বর বা আইডির সাথে কোনো শিক্ষার্থী মেলেনি!`);
    }
  };

  // Complete Compile and update GPA calculation
  const handleMarksCompileAndSave = () => {
    if (!selectedStudentForMarks) return;

    let totalGP = 0;
    const scoredDetails: ScoreDetail[] = subjectScores.map((sub) => {
      const { grade, gp } = getGPDetail(sub.marks);
      totalGP += gp;
      return {
        subjectName: sub.name,
        marks: sub.marks,
        grade,
        gp
      };
    });

    const calculatedGPA = totalGP / subjectScores.length;

    const resultObj: StudentResult = {
      studentId: selectedStudentForMarks.id,
      studentName: selectedStudentForMarks.name,
      session: selectedStudentForMarks.session,
      department: selectedStudentForMarks.department,
      semester: '১ম সেমিস্টার',
      examName: 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
      gpa: Math.round(calculatedGPA * 100) / 100,
      subjects: scoredDetails
    };

    onUpdateResult(resultObj);
    triggerAlert('success', `শিক্ষার্থী ${selectedStudentForMarks.name} এর মার্কশিট সফলভাবে কম্পাইল সম্পন্ন করে সিস্টেমে যুক্ত করা হয়েছে! জিপিএ এসেছে: ${resultObj.gpa.toFixed(2)}`);
    setSelectedStudentForMarks(null);
    setTargetStudentId('');
  };

  return (
    <div className="bg-slate-50 min-h-screen rounded-2xl border border-slate-100 p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Top navbar panel for Admin branding */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 rounded-2xl text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-md overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(16,185,129,0.08),transparent_80%)]" />
        <div className="flex items-center gap-3.5 relative">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
            <Settings className="w-6 h-6 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider block">প্রসাশনিক ড্যাশবোর্ড কনসোল</span>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">এডমিন কন্ট্রোল সেন্টার  (Admin Node)</h2>
              <span className="px-2 py-0.5 bg-emerald-700 text-white rounded text-[8px] tracking-widest font-mono select-none">ROOT ACCESS</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4.5 py-2 bg-rose-900 border border-rose-950 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer relative transition-all"
        >
          <LogOut className="w-4 h-4 text-rose-300" />
          <span>লগআউট এডমিন</span>
        </button>
      </div>

      {/* Synchronized Action Alert Notifications */}
      <AnimatePresence>
        {bannerAlert && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`p-4 border rounded-xl font-medium text-xs flex gap-3 shadow-md ${
              bannerAlert.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
                : 'bg-rose-50 border-rose-100 text-rose-900'
            }`}
          >
            {bannerAlert.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
            )}
            <span>{bannerAlert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid: Control Menu and Content Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side menu */}
        <div className="lg:col-span-3 bg-white p-4.5 rounded-2xl border border-slate-100 shrink-0 shadow-sm space-y-1.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-2.5 mb-2.5">অ্যাডমিন নেভিগেশন</span>
          
          {[
            { id: 'overview', label: 'ড্যাশবোর্ড ওভারভিউ', icon: Building2 },
            { id: 'manage-notices', label: 'নতুন নোটিশ আপলোড', icon: FileText },
            { id: 'manage-teachers', label: 'শিক্ষক তথ্য এন্ট্রি', icon: UserCheck },
            { id: 'manage-students', label: 'মেধাবী ছাত্র-ছাত্রী রেজি:', icon: Users },
            { id: 'manage-results', label: 'রেজাল্ট এন্ট্রি (GPA)', icon: Calculator },
            { id: 'settings', label: 'প্যানেল কনফিগারেশন', icon: Settings }
          ].map((menu) => {
            const Icon = menu.icon;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id as any)}
                className={`w-full px-3 py-2.5 text-xs font-semibold rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                  activeMenu === menu.id 
                    ? 'bg-slate-900 text-white shadow' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${activeMenu === menu.id ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Working canvas panel */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-8 shadow-sm min-h-[500px]">
          
          {/* 1. OVERVIEW SCREEN */}
          {activeMenu === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">ড্যাশবোর্ড পরিচালনা নোড ও বিবরণী</h3>
                <p className="text-xs text-slate-500">মহাবিদ্যালয়ের চলমান ডাটাবেজের রিয়েল-টাইম পরিসংখ্যান অবলোকন করুন।</p>
              </div>

              {/* Counter grids */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100/60 flex flex-col justify-between h-28 space-y-1 select-none">
                  <Users className="w-6 h-6 text-emerald-900" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">মোট পরীক্ষার্থী</span>
                    <p className="text-2xl font-black font-mono text-slate-800">{students.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100/60 flex flex-col justify-between h-28 space-y-1 select-none">
                  <UserCheck className="w-6 h-6 text-amber-600" />
                  <div>
                    <span className="text-[10px] text-slate-405 text-slate-400 font-bold block">সম্মানিত শিক্ষক</span>
                    <p className="text-2xl font-black font-mono text-slate-800">{teachers.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-100/60 flex flex-col justify-between h-28 space-y-1 select-none">
                  <FileText className="w-6 h-6 text-sky-700" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">মোট নোটিশ</span>
                    <p className="text-2xl font-black font-mono text-slate-800">{notices.length}</p>
                  </div>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100/60 flex flex-col justify-between h-28 space-y-1 select-none">
                  <Calculator className="w-6 h-6 text-rose-700" />
                  <div>
                    <span className="text-[10px] text-slate-405 text-slate-400 font-bold block">রেকর্ডকৃত ফলাফল</span>
                    <p className="text-2xl font-black font-mono text-slate-800">{results.length}</p>
                  </div>
                </div>
              </div>

              {/* Sync check / Recent events */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider block">কম্পিউটার সিস্টেমের সাম্প্রতিক কার্যক্রম</h4>
                <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 text-xs text-slate-600">
                  <div className="p-3.5 flex justify-between items-center sm:gap-6">
                    <span className="font-semibold text-emerald-900">১ম বর্ষের অর্ধবার্ষিক পরীক্ষার ফলাফল ডাটাবেজ আপডেট সম্পন্ন।</span>
                    <span className="font-mono text-[10px] text-slate-400">২০২৬-০৬-০৮ সকাল ১০:২৭</span>
                  </div>
                  <div className="p-3.5 flex justify-between items-center sm:gap-6">
                    <span>শিক্ষক ড. আবু ইউসুফ মহোদয়ের ফোন নম্বর ডাটাবেজে হালনাগাদ করা হয়েছে।</span>
                    <span className="font-mono text-[10px] text-slate-400 flex items-center">২০২৬-০৬-০৭ রাত ০৮:১২</span>
                  </div>
                  <div className="p-3.5 flex justify-between items-center sm:gap-6">
                    <span>এইচএসসি দ্বাদশ শ্রেণীর অর্ধবার্ষিক পরীক্ষার বিজ্ঞপ্তির পিন করা হলো।</span>
                    <span className="font-mono text-[10px] text-slate-400">২০২৬-০৬-০৫ দুপুর ১২:০০</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. UPLOAD NOTICE SCREEN */}
          {activeMenu === 'manage-notices' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">ডিজিটাল বোর্ডে নতুন নোটিশ আপলোড</h3>
                <p className="text-xs text-slate-500">তাত্ক্ষণিকভাবে ওয়েবসাইটের নোটিশ বোর্ডে এন্ট্রি যুক্ত করুন।</p>
              </div>

              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">নোটিশের শিরোনাম (বাংলায়) <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: একাদশ শ্রেণীর ফলাফল ঘোষণা"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">নোটিশ ইংরেজী শিরোনাম (ঐচ্ছিক)</label>
                  <input 
                    type="text" 
                    placeholder="HSC Class Notice regarding..."
                    value={newNotice.titleEn}
                    onChange={(e) => setNewNotice({ ...newNotice, titleEn: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">নোটিশের শ্রেণীবিভাগ <span className="text-rose-500">*</span></label>
                    <select
                      value={newNotice.category}
                      onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    >
                      <option value="academic">একাডেমিক (Academic)</option>
                      <option value="admission">ভর্তি সংক্রান্ত (Admission)</option>
                      <option value="administrative">প্রসাশনিক (Administrative)</option>
                      <option value="exam">পরীক্ষা সংক্রান্ত (Exam)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-3.5">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={newNotice.isPin}
                        onChange={(e) => setNewNotice({ ...newNotice, isPin: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 accent-emerald-900"
                      />
                      নোটিশ বোর্ড পিন রাখুন (Pin on Top)
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">নোটিশের বিস্তারিত বার্তা বিবরণী <span className="text-rose-500">*</span></label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="সকল শিক্ষার্থীদের জানানো যাইতেছে যে..."
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>নোটিশ সংরক্ষণ ও সাবমিট</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. MANAGE TEACHERS SECTION */}
          {activeMenu === 'manage-teachers' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">নতুন শিক্ষকের প্রোফাইল সংযোজন</h3>
                <p className="text-xs text-slate-500">শিক্ষক গ্যালারি ডিরেক্টরিতে কর্মকর্তাদের তথ্য যুক্ত করুন।</p>
              </div>

              <form onSubmit={handleTeacherSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">শিক্ষকের পূর্ণ নাম (বাংলায়) <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: এস এম রফিকুল ইসলাম"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">শিক্ষকের নাম (ইংরেজিতে)</label>
                  <input 
                    type="text" 
                    placeholder="Md. Rafiqul Islam"
                    value={newTeacher.nameEn}
                    onChange={(e) => setNewTeacher({ ...newTeacher, nameEn: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">পদবী / পদবী নাম (যেমন: প্রভাষক) <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: প্রভাষক, সমাজবিজ্ঞান"
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">বিভাগ নির্বাচন <span className="text-rose-500">*</span></label>
                  <select
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="Science">বিজ্ঞান শাখা (Science)</option>
                    <option value="Humanities">মানবিক শাখা (Humanities)</option>
                    <option value="Business Studies">ব্যবসায় শিক্ষা শাখা (Business Studies)</option>
                    <option value="General">প্রশাসন ও অন্যান্য (General)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">যোগাযোগ ফোন নম্বর <span className="text-rose-500">*</span></label>
                  <input 
                    type="tel" 
                    required
                    placeholder="০১৭০০-XXXXXX"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ইমেইল এড্রেস</label>
                  <input 
                    type="email" 
                    placeholder="rafiqul@asgdc.edu.bd"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>শিক্ষকের প্রোফাইল মেক</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. MANAGE STUDENTS SECTION */}
          {activeMenu === 'manage-students' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">মেধাবী শিক্ষার্থীর রেজিষ্ট্রেশন ডাটা এন্ট্রি</h3>
                <p className="text-xs text-slate-500">সিস্টেম ব্যবহারের অনুমতি দিতে ছাত্র-ছাত্রীর প্রাথমিক অ্যাকাউন্ট তৈরি করুন।</p>
              </div>

              <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">শিক্ষার্থী রোল বা আইডি (Student ID) <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: ID: 202604"
                    value={newStudent.id}
                    onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">শিক্ষার্থীর পূর্ণ নাম <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: মো: আরিফুল ইসলাম"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">শ্রেণী রোল নম্বর <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: ১০৫"
                    value={newStudent.classRoll}
                    onChange={(e) => setNewStudent({ ...newStudent, classRoll: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">বিভাগ <span className="text-rose-500">*</span></label>
                  <select
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  >
                    <option value="Science">বিজ্ঞান শাখা (Science)</option>
                    <option value="Humanities">মানবিক শাখা (Humanities)</option>
                    <option value="Business Studies">ব্যবসায় শিক্ষা শাখা (Business Studies)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">পিতা / অভিভাবকের নাম</label>
                  <input 
                    type="text" 
                    placeholder="যেমন: মো: জহির হক"
                    value={newStudent.parentsName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentsName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">অভিভাবকের মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    placeholder="০১৭১১-২২৩৩৪৪"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 border border-emerald-950 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>শিক্ষার্থী সেভ করুন</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 5. MANAGE RESULTS (GPA AUTOMATED MARKS ENTRY CALCULATOR) */}
          {activeMenu === 'manage-results' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">পরীক্ষার ফলাফল এন্ট্রি ও কম্পাইল (GPA Calculator)</h3>
                <p className="text-xs text-slate-500">শিক্ষার্থীর পরীক্ষার প্রাপ্ত বিষয়ভিত্তিক মার্ক লিখুন, সিস্টেম স্বয়ংক্রিয়ভাবে জিপিএ হিসাব করবে।</p>
              </div>

              {/* Step 1: Query student */}
              {!selectedStudentForMarks ? (
                <div className="bg-slate-50 p-6 border border-slate-150 rounded-2xl flex flex-col sm:flex-row gap-4 items-end">
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">শিক্ষার্থীর রোল বা আইডি লিখুন</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="যেমন: 202601"
                        value={targetStudentId}
                        onChange={(e) => setTargetStudentId(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                      />
                    </div>
                  </div>
                  <button
                    onClick={searchStudentForMarks}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-950 text-white text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shrink-0 hover:bg-emerald-900 shadow-sm border border-emerald-950"
                  >
                    <Search className="w-4 h-4" />
                    <span>আইডি খুঁজুন</span>
                  </button>
                </div>
              ) : (
                /* Step 2: Live marks calculation sheet view */
                <div className="space-y-6 animate-fadeIn">
                  {/* Summary of matched student */}
                  <div className="p-4 bg-emerald-900 text-white rounded-xl flex items-center justify-between flex-wrap gap-4 select-none shadow">
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-400 font-extrabold block">নিবন্ধিত শিক্ষার্থী</span>
                      <h4 className="font-bold text-base leading-snug">{selectedStudentForMarks.name}</h4>
                      <p className="text-xs text-slate-300 font-mono">আইডি: {selectedStudentForMarks.id} | বিভাগ: {selectedStudentForMarks.department}</p>
                    </div>
                    <button
                      onClick={() => setSelectedStudentForMarks(null)}
                      className="text-xs text-slate-300 hover:text-white underline"
                    >
                      পরীক্ষার্থী পরিবর্তন করুন
                    </button>
                  </div>

                  {/* Marks input listing */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide block">বিষয়ভিত্তিক নম্বর তালিকা (তাত্ত্বিক ও ব্যবহারিকসহ)</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subjectScores.map((sub, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold text-slate-700 block truncate max-w-[150px]">{sub.name}</span>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              max="100"
                              min="0"
                              value={sub.marks}
                              onChange={(e) => {
                                const list = [...subjectScores];
                                list[idx].marks = parseInt(e.target.value) || 0;
                                setSubjectScores(list);
                              }}
                              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded text-center text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-emerald-800"
                            />
                            <span className="text-[10px] text-slate-400 font-bold">/১০০</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Compile & calculate preview triggers */}
                    <div className="p-5 bg-amber-50/50 border border-amber-100/60 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="space-y-0.5 text-xs text-slate-600">
                        <span className="font-bold text-slate-900">মার্কশীট কম্পাইলার রেডি।</span>
                        <p className="text-[11px] text-slate-500">সেভ বাটনে চাপ দিলে ডাটাবেজে রেজাল্ট কোড আপডেট হবে ও শিক্ষার্থী পোর্টাল থেকে দেখতে পারবে।</p>
                      </div>
                      <button
                        onClick={handleMarksCompileAndSave}
                        className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-950 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-2 shadow cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>কম্পাইল ও সিস্টেম সেভ</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. SETTINGS TAB */}
          {activeMenu === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">ড্যাশবোর্ড প্যানেল সেটিংস</h3>
                <p className="text-xs text-slate-500">মহাবিদ্যালয়ের ওয়েব সিস্টেমের প্রশাসনিক অ্যাক্সেস কনফিগারেশন।</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100/80 space-y-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Shield className="w-5 h-5 text-emerald-800" />
                  <h4 className="font-bold text-xs sm:text-sm">নিরাপত্তা নোড এবং নোটিফিকেশন সেটিংস</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  এটি একটি ভিজ্যুয়াল প্রোটোটাইপ ওয়েব কন্টেইনার প্যানেল। এই ড্যাশবোর্ডে করা যেকোনো পরিবর্তন (যেমন নোটিশ যুক্ত করা, রেজাল্ট কারেকশন, শিক্ষার্থী ডাটা সংযোজন) সম্পূর্ণ লোকাল রিয়্যাক্ট স্টেট বজায় রাখবে এবং ব্রাউজার ট্যাব সেশন রিসেট হওয়া পর্যন্ত সম্পূর্ণভাবে সচল থাকবে।
                </p>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setActiveMenu('overview')}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  ড্যাশবোর্ডে ফিরে যান
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
