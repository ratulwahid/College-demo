import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, Clock, FileText, Image as ImageIcon, 
  Users, MapPin, ChevronRight, Bookmark, ArrowRight, User, 
  ShieldAlert, Settings, Info, Menu, X, Landmark, Award, Star, ExternalLink, Sliders, Smartphone, CheckCircle, Calculator
} from 'lucide-react';

// Data and types imports
import { initialNotices, initialTeachers, initialStudents, initialResults, initialRoutines, initialGallery } from './data';
import { Notice, Teacher, Student, StudentResult, RoutineItem } from './types';

// Page components imports
import AboutCollege from './components/AboutCollege';
import TeachersDirectory from './components/TeachersDirectory';
import NoticeBoardView from './components/NoticeBoardView';
import GalleryView from './components/GalleryView';
import AdmissionView from './components/AdmissionView';
import RoutineView from './components/RoutineView';
import ResultSearchView from './components/ResultSearchView';
import PublicContact from './components/PublicContact';
import PortalStudent from './components/PortalStudent';
import DashboardAdmin from './components/DashboardAdmin';

export default function App() {
  // Global mutable states to simulate synced backend
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [results, setResults] = useState<StudentResult[]>(initialResults);
  const [routines] = useState<RoutineItem[]>(initialRoutines);
  const [gallery] = useState(initialGallery);

  // Router simulator 'activeSection'
  const [activeSection, setActiveSection] = useState<
    'home' | 'about' | 'teachers' | 'notices' | 'gallery' | 'admission' | 'routine' | 'result-search' | 'contact' | 'student-login'
  >('home');

  // Role Simulator state ('public' | 'student' | 'admin') for the visual prototype switcher
  const [currentViewMode, setCurrentViewMode] = useState<'public' | 'student' | 'admin'>('public');

  // Student portal authentication states
  const [studentLoginId, setStudentLoginId] = useState('');
  const [studentLoginPIN, setStudentLoginPIN] = useState('');
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [loginError, setLoginError] = useState('');

  // Mobile menu control toggles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switcherMinimized, setSwitcherMinimized] = useState(false);

  // Administrative stats
  const totalStudentsCount = students.length;
  const totalFacultyCount = teachers.length;

  // Sync callbacks from administer module
  const handleAddNotice = (notice: Notice) => {
    setNotices(prev => [notice, ...prev]);
  };

  const handleAddTeacher = (teacher: Teacher) => {
    setTeachers(prev => [teacher, ...prev]);
  };

  const handleAddStudent = (student: Student) => {
    setStudents(prev => [student, ...prev]);
  };

  const handleUpdateResult = (res: StudentResult) => {
    setResults(prev => {
      const idx = prev.findIndex(r => r.studentId === res.studentId);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = res;
        return copy;
      }
      return [res, ...prev];
    });
  };

  // Student login auth simulator
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = students.find(s => s.id === studentLoginId.trim());
    if (matched) {
      setLoggedInStudent(matched);
      setLoginError('');
      setCurrentViewMode('student');
    } else {
      setLoginError('আইডি অমিল! ডেমো আইডি ব্যবহার করুন: 202601, 202602, 202603');
    }
  };

  // Direct prototype role-switching triggers
  const forceLoginAsDemoStudent = () => {
    // Force logs in student roll 101 - Tanvir
    setLoggedInStudent(students[0]);
    setCurrentViewMode('student');
    setActiveSection('home');
  };

  const forceLoginAsAdmin = () => {
    setCurrentViewMode('admin');
    setActiveSection('home');
  };

  const forceLogoutAll = () => {
    setLoggedInStudent(null);
    setCurrentViewMode('public');
    setActiveSection('home');
    setStudentLoginId('');
    setStudentLoginPIN('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 selection:bg-emerald-900 selection:text-amber-500">
      
      {/* ========================================== */}
      {/* FLOATING PROTOTYPE SWITCHER BANNER        */}
      {/* ========================================== */}
      <div className="bg-slate-900 text-white font-sans text-xs border-b border-amber-500/30 no-print sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 select-none">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce shrink-0" />
            <span className="font-extrabold text-[10px] text-amber-500 tracking-wider">UX PROTOTYPE CONTROL PANEL</span>
            {!switcherMinimized && (
              <span className="hidden md:inline text-slate-400">| রিভিউ কমিটির জন্য সরাসরি নেভিগেশন অ্যাক্সেস মডিউল:</span>
            )}
          </div>

          {!switcherMinimized ? (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Public site views */}
              <button
                onClick={() => {
                  setCurrentViewMode('public');
                  setActiveSection('home');
                }}
                className={`px-2.5 py-1 rounded font-bold cursor-pointer transition ${
                  currentViewMode === 'public' 
                    ? 'bg-emerald-900 text-amber-400 border border-emerald-950' 
                    : 'bg-slate-800 text-slate-300 hover:text-white border border-transparent'
                }`}
              >
                🌐 পাবলিক ওয়েবসাইট
              </button>

              {/* Student Workspace */}
              <button
                onClick={forceLoginAsDemoStudent}
                className={`px-2.5 py-1 rounded font-bold cursor-pointer transition ${
                  currentViewMode === 'student' 
                    ? 'bg-emerald-900 text-amber-400 border border-emerald-950' 
                    : 'bg-slate-800 text-teal-300 hover:text-white border border-transparent'
                }`}
              >
                👨‍🎓 স্টুডেন্ট পোর্টাল (লগইন বাইপাস)
              </button>

              {/* Admin Panel */}
              <button
                onClick={forceLoginAsAdmin}
                className={`px-2.5 py-1 rounded font-bold cursor-pointer transition ${
                  currentViewMode === 'admin' 
                    ? 'bg-emerald-900 text-amber-400 border border-emerald-950' 
                    : 'bg-slate-800 text-amber-400 hover:text-white border border-transparent'
                }`}
              >
                ⚙️ অ্যাডমিন প্যানেল এন্ট্রি
              </button>

              <button 
                onClick={() => setSwitcherMinimized(true)} 
                className="text-[10px] text-slate-400 hover:text-white ml-2 underline cursor-pointer"
              >
                লুকান
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setSwitcherMinimized(false)}
              className="px-2.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-bold transition cursor-pointer"
            >
              কন্ট্রোল প্যানেল দেখান ➕
            </button>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. PUBLIC WEBSITE APPLICATION INTERFACE    */}
      {/* ========================================== */}
      {currentViewMode === 'public' && (
        <>
          {/* Top Contact Bar */}
          <div className="bg-primary text-white font-sans text-[11px] py-2 border-b-2 border-accent leading-normal no-print">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>ঝিনাইগাতী, শেরপুর, বাংলাদেশ | হেল্পলাইন: ০১৭৫১-১২৩৪৫৬</span>
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-slate-300">শিক্ষাবর্ষ: ২০২৬-২০২৭</span>
                <button
                  onClick={() => setActiveSection('student-login')}
                  className="px-2.5 py-0.5 bg-accent text-primary hover:bg-white font-black rounded text-[10px] uppercase cursor-pointer transition-colors"
                >
                  স্টুডেন্ট লগইন 🔒
                </button>
              </div>
            </div>
          </div>

          {/* Main Public college header branding */}
          <header className="bg-white border-b-4 border-accent shadow-sm sticky top-[33px] z-45 no-print">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              
              {/* Logo / Brand Name */}
              <div 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-md border-2 border-accent/25">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-primary transition-colors">
                    আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ
                  </h1>
                  <p className="text-[10px] md:text-xs text-primary font-bold font-sans italic flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Jhenaigati, Sherpur, Bangladesh.
                  </p>
                </div>
              </div>

              {/* Desktop Public Navigation link bar */}
              <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700">
                {[
                  { id: 'home', label: 'প্রচ্ছদ' },
                  { id: 'about', label: 'আমাদের পরিচিতি' },
                  { id: 'teachers', label: 'শিক্ষকমণ্ডলী' },
                  { id: 'notices', label: 'নোটিশ বোর্ড' },
                  { id: 'gallery', label: 'গ্যালারি' },
                  { id: 'admission', label: 'ভর্তি তথ্য' },
                  { id: 'routine', label: 'শ্রেণী রুটিন' },
                  { id: 'result-search', label: 'রেজাল্ট সার্চ' },
                  { id: 'contact', label: 'যোগাযোগ' }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActiveSection(link.id as any)}
                    className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                      activeSection === link.id 
                        ? 'bg-primary text-accent font-black shadow-sm' 
                        : 'hover:bg-slate-50 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-primary bg-slate-50 rounded-lg hover:text-slate-900 cursor-pointer border border-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 animate-pulse" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden border-t-2 border-accent bg-white shadow-inner"
                >
                  <div className="flex flex-col p-4 gap-1 text-xs font-semibold text-slate-700">
                    {[
                      { id: 'home', label: 'প্রচ্ছদ' },
                      { id: 'about', label: 'আমাদের পরিচিতি' },
                      { id: 'teachers', label: 'শিক্ষকমণ্ডলী' },
                      { id: 'notices', label: 'নোটিশ বোর্ড' },
                      { id: 'gallery', label: 'গ্যালারি' },
                      { id: 'admission', label: 'ভর্তি তথ্য' },
                      { id: 'routine', label: 'শ্রেণী রুটিন' },
                      { id: 'result-search', label: 'রেজাল্ট সার্চ' },
                      { id: 'contact', label: 'যোগাযোগ' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          setActiveSection(link.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 rounded-lg text-left cursor-pointer transition ${
                          activeSection === link.id 
                            ? 'bg-primary text-accent font-black' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* ========================================== */}
          {/* PUBLIC SITE VIEWPORTS SWITCHING ROUTINE    */}
          {/* ========================================== */}
          <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
            
            {/* 1. PUBLIC HOME PAGE VIEW */}
            {activeSection === 'home' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn pb-12 items-stretch font-sans">
                
                {/* A. Founder Tribute and Hero Banner Bento Box */}
                <div id="bento-founder" className="col-span-12 md:col-span-8 bg-stone-900 rounded-3xl relative overflow-hidden shadow-lg border border-stone-800 flex flex-col justify-end min-h-[420px] group">
                  {/* Backdrop campus/founder banner photo */}
                  <div className="absolute inset-0 bg-cover bg-center brightness-[0.35] group-hover:scale-102 transition-transform duration-700" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80")' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="relative p-6 md:p-10 text-white z-10 flex flex-col md:flex-row gap-6 items-end">
                    <img 
                      src="https://75bangladesh.com/wp-content/uploads/2025/03/IMG_20250308_004926_600_x_315_pixel.jpg" 
                      className="w-24 h-24 object-cover rounded-2xl border-2 border-accent shadow-md shrink-0 bg-stone-800"
                      alt="Founder Alhaj Sharif Uddin Sarkar"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="bg-accent text-primary text-[10px] font-extrabold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">
                        প্রতিষ্ঠাতা মেমোরিয়াল অ্যান্ড ট্রিবিউট
                      </span>
                      <h2 className="text-xl md:text-2xl font-black mb-1.5 text-white">মরহুম আলহাজ্ব শরিফউদ্দিন সরকার (১৯৪৮ - ২০২৪)</h2>
                      <p className="text-stone-200 leading-relaxed text-xs font-light">
                        শেরপুরের ঝিনাইগাতীর সর্বজন শ্রদ্ধেয় ও সততা-নেতৃত্বের অগ্রদূত। সমাজসেবক আলহাজ্ব শরিফউদ্দিন সরকারের স্মৃতির প্রতি শ্রদ্ধা জানিয়ে ঝিনাইগাতী থানা মোড়ে এই কলেজটি সুশিক্ষা বিস্তারে প্রতিষ্ঠিত হয়।
                      </p>
                      <button
                        onClick={() => setActiveSection('about')}
                        className="mt-3.5 text-xs text-accent font-bold hover:underline inline-flex items-center gap-1 cursor-pointer transition-all"
                      >
                        মরহুমের জীবনবৃত্তান্ত ও আমাদের গৌরবময় ইতিহাস পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* B. Key Statistics Counter Bento Box */}
                <div id="bento-stats" className="col-span-12 md:col-span-4 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between min-h-[420px]">
                  <div>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">REAL-TIME DASHBOARD</span>
                    <h3 className="text-base font-black text-slate-900 leading-snug">ঝিনাইগাতীর শ্রেষ্ঠ বিদ্যাপীঠের অর্জন</h3>
                    <p className="text-[11px] text-stone-500">সুশৃঙ্খল পাঠদান ও পরিচ্ছন্ন পাহাড়ি প্রকৃতির মনোরম ক্যাম্পাস।</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 my-4">
                    <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-100 text-center hover:scale-102 transition-transform">
                      <Users className="w-5 h-5 text-primary mx-auto mb-1.5" />
                      <p className="text-xl font-bold text-primary font-mono">{totalStudentsCount + 550}+</p>
                      <p className="text-[9px] text-stone-400 font-extrabold uppercase">শিক্ষার্থী সংখ্যা</p>
                    </div>
                    <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-100 text-center hover:scale-102 transition-transform">
                      <GraduationCap className="w-5 h-5 text-accent mx-auto mb-1.5" />
                      <p className="text-xl font-bold text-primary font-mono">{totalFacultyCount + 12}+</p>
                      <p className="text-[9px] text-stone-400 font-extrabold uppercase">অভিজ্ঞ শিক্ষক</p>
                    </div>
                    <div className="p-3 bg-stone-50/70 rounded-2xl border border-stone-100 text-center hover:scale-102 transition-transform">
                      <BookOpen className="w-5 h-5 text-primary-light mx-auto mb-1.5" />
                      <p className="text-lg font-bold text-primary">৩টি শাখা</p>
                      <p className="text-[9px] text-stone-400 font-extrabold uppercase">শিক্ষা বিভাগ</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center hover:scale-102 transition-transform">
                      <Award className="w-5 h-5 text-emerald-800 mx-auto mb-1.5" />
                      <p className="text-lg font-extrabold text-[#1B4332] font-mono">৯৬.৪%</p>
                      <p className="text-[9px] text-emerald-800 font-extrabold uppercase">পাছের হার</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                    <span>HSC Academic Records</span>
                    <span className="font-bold text-primary">২০২৫ সমাবর্তন ডাটা</span>
                  </div>
                </div>

                {/* C. Latest Notices board Bento Box */}
                <div id="bento-notices" className="col-span-12 md:col-span-5 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-[360px]">
                  <div className="bg-primary px-5 py-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      <h3 className="text-xs font-black uppercase tracking-wider">জরুরি অফিশিয়াল নোটিশ বোর্ড</h3>
                    </div>
                    <button 
                      onClick={() => setActiveSection('notices')}
                      className="text-[10px] text-accent hover:underline font-bold transition-all cursor-pointer"
                    >
                      সকল নোটিশ →
                    </button>
                  </div>
                  
                  <div className="flex-grow p-4 space-y-3 flex flex-col justify-center">
                    {notices.slice(0, 3).map((note) => (
                      <div 
                        key={note.id}
                        onClick={() => setActiveSection('notices')}
                        className={`flex items-start gap-3 p-3 hover:bg-stone-50 rounded-xl cursor-pointer border-l-4 transition-all ${
                          note.isPin ? 'border-accent bg-amber-500/5' : 'border-slate-200 bg-stone-50/20'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${note.isPin ? 'text-accent fill-accent' : 'text-stone-300'}`} />
                        <div className="truncate">
                          <p className="text-xs text-stone-850 font-bold truncate leading-snug text-slate-800">{note.title}</p>
                          <span className="text-[9px] text-stone-400 font-mono flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3 text-stone-300" /> {note.date} | {note.category === 'academic' ? 'একাডেমিক' : 'পরীক্ষা'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 bg-stone-50 text-center border-t border-stone-100">
                    <span className="text-[10px] text-stone-500 font-medium">ডিজিটাল ইনফরমেশন সেল সেশন ২০২৬-২৭</span>
                  </div>
                </div>

                {/* D. Acting Principal's welcome Bento Box */}
                <div id="bento-principal" className="col-span-12 md:col-span-3 bg-stone-100 rounded-3xl border border-stone-200 shadow-inner p-5 flex flex-col items-center text-center justify-between min-h-[360px]">
                  <div className="space-y-3">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-md mx-auto overflow-hidden bg-stone-300 relative">
                      <img 
                        src="https://lh3.googleusercontent.com/d/13oActHtvjX-qpcvPwoBfUQbhftS10vFp" 
                        alt="ভারপ্রাপ্ত অধ্যক্ষ: শ্রাবণ ওয়াহিদ রাতুল" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-primary leading-tight">ভারপ্রাপ্ত অধ্যক্ষ: শ্রাবণ ওয়াহিদ রাতুল</h4>
                    </div>
                    <p className="text-[10.5px] text-stone-605 leading-relaxed italic text-stone-600">
                      "আসসালামু আলাইকুম। আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ পরিবারে স্বাগতম। সৎ জীবনাদর্শ স্থাপন ও আধুনিক সুশিক্ষা প্রদানে আমরা প্রতিশ্রুতিবদ্ধ।"
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setActiveSection('about')}
                    className="text-[10px] font-bold text-primary hover:text-accent hover:underline cursor-pointer pt-3 self-center"
                  >
                    অধ্যক্ষের সম্পূর্ণ বার্তা দেখুন →
                  </button>
                </div>

                {/* E. Results Direct Bypass / Quick Portal Look up Bento Box */}
                <div id="bento-results" className="col-span-12 md:col-span-4 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between min-h-[360px]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-primary flex items-center justify-center border border-emerald-150">
                        <Calculator className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-xs sm:text-sm">দ্রুত ডিজিটাল গ্রেডশীট সার্চ</h3>
                        <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wide block">Domestic Result Portal</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">শিক্ষার্থী আইডি (Student ID)</label>
                        <input 
                          type="text" 
                          placeholder="যেমন: 202601" 
                          value={studentLoginId}
                          onChange={(e) => setStudentLoginId(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-accent outline-none bg-stone-50 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">সিকিউরিটি পিন (Security PIN)</label>
                        <input 
                          type="password" 
                          placeholder="••••••" 
                          value={studentLoginPIN}
                          onChange={(e) => setStudentLoginPIN(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-accent outline-none bg-stone-50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={handleStudentLoginSubmit}
                      className="w-full bg-primary text-white hover:bg-stone-850 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md bg-stone-904 hover:bg-stone-950"
                    >
                      <span>পোর্টাল লগইন করুন</span>
                      <ArrowRight className="w-3.5 h-3.5 text-accent" />
                    </button>
                    <button 
                      onClick={() => setActiveSection('result-search')}
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-1 px-4 rounded-lg text-[9px] font-bold transition-all text-center cursor-pointer"
                    >
                      গ্রেডশীট ডাউনলোডার সরাসরি প্রবেশ →
                    </button>
                  </div>
                </div>

                {/* F. High-contrast academic disciplines grid wrapper */}
                <div id="bento-disciplines" className="col-span-12 border-t-2 border-stone-200 pt-8 mt-4">
                  <div className="text-center space-y-1 mb-8">
                    <span className="inline-block bg-primary/10 text-primary uppercase text-[10px] font-black px-3 py-1 rounded-full">Disciplines and Courses</span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">পঠিত একাডেমিক শাখাসমূহ</h3>
                    <p className="text-stone-500 text-xs max-w-xl mx-auto">
                      উচ্চ মাধ্যমিক স্তরে সুপ্রশিক্ষিত শিক্ষকদের ত্বত্ত্বাবধানে পাঠক্রম সম্পন্ন করা হয়।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition text-center space-y-3.5">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm">বিজ্ঞান শাখা (Science)</h4>
                        <p className="text-stone-500 text-[11px] leading-relaxed mt-1">পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও উচ্চতর ল্যাবভিত্তিক ব্যবহারিক চর্চা সম্পন্ন করা হয়।</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition text-center space-y-3.5">
                      <div className="w-12 h-12 bg-sky-50 text-sky-800 rounded-xl flex items-center justify-center mx-auto shadow-inner border border-sky-100">
                        <BookOpen className="w-6 h-6 text-sky-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm">মানবিক শাখা (Arts)</h4>
                        <p className="text-stone-500 text-[11px] leading-relaxed mt-1">ইতিহাস, পৌরনীতি ও সমাজবিদ্যা ক্লাসের মাধ্যমে মূল্যবোধের গুণমান সম্পন্ন ছাত্রছাত্রী তৈরি।</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition text-center space-y-3.5">
                      <div className="w-12 h-12 bg-amber-50 text-amber-805 rounded-xl flex items-center justify-center mx-auto shadow-inner border border-amber-100">
                        <Award className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm">ব্যবসায় শিক্ষা (Commerce)</h4>
                        <p className="text-stone-500 text-[11px] leading-relaxed mt-1">হিসাববিজ্ঞান ও ব্যবসায় পরিচালনার আধুনিক ব্যবহারিক কর্পোরেট পাঠ্যসূচী শিক্ষাদান।</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* G. Clean Admission Caller action block */}
                <div id="bento-admission-banner" className="col-span-12 bg-primary text-white rounded-3xl p-8 relative overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.15),transparent_50%)]" />
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="px-3 py-1 bg-accent text-primary text-[10px] font-extrabold uppercase rounded-full tracking-widest block max-w-max mx-auto md:mx-0">
                        ভর্তি চলছে ২০২৬-২০২৭
                      </span>
                      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">একাদশ শ্রেণীতে ভর্তি ও অনলাইন আবেদন চলছে</h2>
                      <p className="text-stone-200 text-xs max-w-xl">
                        মেধাবী শিক্ষার্থীদের জন্য চমৎকার পাহাড়ি মনোরম প্রাকৃতিক নির্ঝর পরিবেশে সেশন জটমুক্ত পাঠক্রম সম্পন্ন করুন। দ্রুত ভর্তি ফরম পূরণ সম্পন্ন করার অনুরোধ করা যাচ্ছে।
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveSection('admission')}
                      className="px-6 py-3 bg-accent hover:bg-white text-primary hover:text-primary font-black text-xs rounded-xl transition cursor-pointer shrink-0 shadow-md transform hover:scale-103 duration-200"
                    >
                      অনলাইন আবেদন ফরম →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 2. ABOUT COLLEGE VIEW */}
            {activeSection === 'about' && <AboutCollege />}

            {/* 3. TEACHERS PAGE VIEW */}
            {activeSection === 'teachers' && <TeachersDirectory teachers={teachers} />}

            {/* 4. NOTICE BOARD VIEW */}
            {activeSection === 'notices' && <NoticeBoardView notices={notices} />}

            {/* 5. GALLERY VIEW */}
            {activeSection === 'gallery' && <GalleryView gallery={gallery} />}

            {/* 6. ADMISSION PAGE VIEW */}
            {activeSection === 'admission' && <AdmissionView />}

            {/* 7. ROUTINE PAGE VIEW */}
            {activeSection === 'routine' && <RoutineView routines={routines} />}

            {/* 8. RESULT SEARCH VIEW */}
            {activeSection === 'result-search' && <ResultSearchView results={results} />}

            {/* 9. CONTACT PAGE VIEW */}
            {activeSection === 'contact' && <PublicContact />}

            {/* 10. STUDENT LOGIN PAGE SCREEN */}
            {activeSection === 'student-login' && (
              <div className="max-w-md mx-auto py-8">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
                  <div className="bg-emerald-950 text-white text-center p-6 space-y-2 relative">
                    <User className="w-10 h-10 text-amber-500 mx-auto" />
                    <h2 className="text-lg font-bold">শিক্ষার্থী স্টুডেন্ট পোর্টাল</h2>
                    <p className="text-xs text-slate-305 text-slate-300 font-mono">ঝিনাইগাতী, শেরপুর, বাংলাদেশ</p>
                  </div>

                  <div className="p-6 md:p-8 space-y-6">
                    {loginError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-900 text-xs rounded-lg flex items-center gap-2 font-medium">
                        <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <form onSubmit={handleStudentLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">স্টুডেন্ট আইডি (Student ID) <span className="text-rose-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          placeholder="যেমন: 202601"
                          value={studentLoginId}
                          onChange={(e) => setStudentLoginId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                        <span className="text-[10px] text-slate-400 font-medium block mt-1.5">পরীক্ষামূলক ডেমো আইডি ব্যবহার করুন: 202601, 202602, 202603</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">সিকিউরিটি পিন (Security PIN)</label>
                        <input 
                          type="password" 
                          placeholder="••••••"
                          value={studentLoginPIN}
                          onChange={(e) => setStudentLoginPIN(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                        />
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">পাসওয়ার্ড ভুলে গেলে আইসিটি বিভাগে যোগাযোগ করুন।</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-950 text-white hover:bg-emerald-900 font-bold text-xs rounded-xl shadow border border-emerald-950 transition cursor-pointer"
                      >
                        পোর্টালে প্রবেশ করুন
                      </button>
                    </form>

                    <div className="pt-2 border-t border-slate-50 select-none text-[9px] text-slate-450 leading-relaxed text-slate-400">
                      <strong>সিকিউরিটি প্রটোকল:</strong> আইডি গোপন রাখতে লগইন সেশন ১ ঘণ্টা অব্দি অ্যাক্টিভ থাকে। অযথা অন্য রোল আইডিতে ভুল প্রবেশের চেষ্টা রেকর্ডভুক্ত হতে পারে।
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>

          {/* ========================================== */}
          {/* COMPREHENSIVE PUBLIC FOOTER                */}
          {/* ========================================== */}
          <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-8 mt-16 no-print">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
              
              {/* Box 1: Short summary */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-8 h-8 text-amber-500" />
                  <h3 className="font-bold text-base text-white">আলহাজ্ব শরিফউদ্দিন সরকার কলেজ</h3>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">
                  সমাজসেবক আলহাজ্ব শরিফউদ্দিন সরকার মহোদয়ের স্মৃতির কল্যাণে ও সুশিক্ষার আলো বিতরণের মহান উদ্দ্যেশে প্রতিষ্ঠিত ঝিনাইগাতী থানা রোড মোড়ে অবস্থিত কলেজের অনলাইন তথ্য কোষ।
                </p>
                <p className="text-[10px] text-slate-500">ঝিনাইগাতী, শেরপুর, বাংলাদেশ।</p>
              </div>

              {/* Box 2: Quick Links */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">দ্রুত নেভিগেশন লিংক</h4>
                <div className="flex flex-col gap-2.5 text-slate-300">
                  <button onClick={() => setActiveSection('about')} className="text-left hover:text-white cursor-pointer transition">পরিচিতি ও ইতিহাস</button>
                  <button onClick={() => setActiveSection('teachers')} className="text-left hover:text-white cursor-pointer transition">শিক্ষক ফোরাম</button>
                  <button onClick={() => setActiveSection('notices')} className="text-left hover:text-white cursor-pointer transition">ডিজিটাল নোটিশ বোর্ড</button>
                  <button onClick={() => setActiveSection('admission')} className="text-left hover:text-white cursor-pointer transition">অনলাইন অ্যাডমিশন</button>
                  <button onClick={() => setActiveSection('routine')} className="text-left hover:text-white cursor-pointer transition">শ্রেণী রুটিন ২০২৬</button>
                </div>
              </div>

              {/* Box 3: Technical external links */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-teal-400 uppercase tracking-wider">রিসোর্স ও পোর্টাল</h4>
                <div className="flex flex-col gap-2.5 text-slate-300">
                  <a href="https://bangladesh.gov.bd" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">জাতীয় উপধারা <ExternalLink className="w-3 h-3" /></a>
                  <a href="https://www.dhakaeducationboard.gov.bd" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">ঢাকা শিক্ষাবোর্ড <ExternalLink className="w-3 h-3" /></a>
                  <a href="http://educationboardresults.gov.bd" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">জাতীয় রেজাল্ট সার্ভার <ExternalLink className="w-3 h-3" /></a>
                  <button onClick={() => setActiveSection('result-search')} className="text-left hover:text-white cursor-pointer transition">ডমেস্টিক গ্রেডশীট ডাউনলোডার</button>
                  <button onClick={() => setActiveSection('student-login')} className="text-left hover:text-teal-400 cursor-pointer transition">শিক্ষার্থী লগইন এরিয়া</button>
                </div>
              </div>

              {/* Box 4: Contact Helpdesk */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-yellow-500 uppercase tracking-wider text-amber-500">জরুরি যোগাযোগ সেল</h4>
                <p className="text-slate-450 text-slate-400 leading-relaxed">
                  পরীক্ষা, ভর্তি বা আইডি সংক্রান্ত কারিগরি ফিডব্যাকের জন্য আইসিটি সেক্রটেরিয়া হেল্পলাইনে যোগাযোগ করুন।
                </p>
                <div className="font-mono space-y-1 text-slate-300 font-semibold block uppercase">
                  <p>ফোন: ০১৭৫১-১২৩৪৫৬</p>
                  <p className="truncate">মেইল: helpdesk@asgdc.edu.bd</p>
                </div>
              </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-6 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© ২০২৬ আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজ। ঝিনাইগাতী, শেরপুর, বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
              <div className="flex gap-4">
                <span>কারিগরী সহায়তায়: কলেজ আইসিটি ইনফরমেশন সেল (IIC)</span>
                <span>|</span>
                <span className="cursor-pointer hover:text-slate-300" onClick={forceLoginAsAdmin}>সিস্টেম কনসোল</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* ========================================== */}
      {/* 2. STUDENT PORTAL WORKSPACE CONTAINER      */}
      {/* ========================================== */}
      {currentViewMode === 'student' && loggedInStudent && (
        <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
          <PortalStudent 
            currentStudent={loggedInStudent}
            currentResult={results.find(r => r.studentId === loggedInStudent.id)}
            studentRoutine={routines.filter(r => r.department === loggedInStudent.department)}
            notices={notices}
            onLogout={forceLogoutAll}
          />
        </div>
      )}

      {/* ========================================== */}
      {/* 3. ADMINISTRATION DASHBOARD CONTAINER      */}
      {/* ========================================== */}
      {currentViewMode === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
          <DashboardAdmin 
            notices={notices}
            teachers={teachers}
            students={students}
            results={results}
            onAddNotice={handleAddNotice}
            onAddTeacher={handleAddTeacher}
            onAddStudent={handleAddStudent}
            onUpdateResult={handleUpdateResult}
            onLogout={forceLogoutAll}
          />
        </div>
      )}

    </div>
  );
}
