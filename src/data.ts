import { Notice, Teacher, Student, StudentResult, RoutineItem, GalleryItem } from './types';

export const initialNotices: Notice[] = [
  {
    id: 'N-101',
    title: '২০২৬ শিক্ষাবর্ষের একাদশ শ্রেণীর অর্ধবার্ষিক পরীক্ষার চূড়ান্ত সময়সূচী প্রকাশ',
    titleEn: 'Final Schedule of Half-Yearly Exam for XI Class - Session 2026',
    date: '২০২৬-০৬-০৫',
    category: 'exam',
    pdfUrl: '#',
    isPin: true,
    content: 'এতদ্বারা আলহাজ্ব শরিফউদ্দিন সরকার ডিগ্রী কলেজের দ্বাদশ শ্রেণীর সকল শিক্ষার্থীদের জানানো যাচ্ছে যে, আগামী ১৫ই জুন ২০২৬ তারিখ থেকে আপনাদের অর্ধবার্ষিক পরীক্ষা শুরু হতে যাচ্ছে। পরীক্ষার বিস্তারিত সময়সূচি কলেজের নোটিশ বোর্ড এবং অফিস থেকে সংগ্রহ করা যাবে। সকল শিক্ষার্থীকে নির্ধারিত পোশাকে প্রবেশপত্রসহ যথাসময়ে পরীক্ষা কক্ষে উপস্থিত থাকার নির্দেশ দেওয়া হলো।'
  },
  {
    id: 'N-102',
    title: 'একাদশ শ্রেণীতে ভর্তি ও মূল কাগজপত্রাদি জমা দেওয়া সংক্রান্ত নির্দেশনা',
    titleEn: 'Admission & Documents Submission Guidelines for Class XI',
    date: '২০২৬-০৬-০১',
    category: 'admission',
    pdfUrl: '#',
    isPin: true,
    content: '২০২৬-২০২৭ শিক্ষাবর্ষে একাদশ শ্রেণীতে ভর্তির জন্য মনোনীত সকল শিক্ষার্থীদের আগামী ২০শে জুনের মধ্যে মূল একাডেমিক ট্রান্সক্রিপ্ট, দুই কপি পাসপোর্ট সাইজের ছবি এবং প্রশংসাপত্র কলেজ কার্যালয়ে জমা দেয়ার জন্য নির্দেশ প্রদান করা হলো। ভর্তি ফি কলেজের অফিশিয়াল বিকাশ অথবা রকেট মারফত সম্পন্ন করে রসিদটি সাথে আনতে হবে।'
  },
  {
    id: 'N-103',
    title: 'গ্রীষ্মকালীন অবকাশ ও পবিত্র ঈদুল আজহা উপলক্ষে কলেজ বন্ধের বিজ্ঞপ্তি',
    titleEn: 'Notice regarding Summer Vacation & Holy Eid-ul-Adha Holiday',
    date: '২০২৬-০৫-২৮',
    category: 'administrative',
    pdfUrl: '#',
    isPin: false,
    content: 'আসন্ন গ্রীষ্মকালীন ছুটি ও পবিত্র ঈদুল আজহা উপলক্ষে আগামী ১২ই জুন ২০২৬ থেকে ২২শে জুন ২০২৬ তারিখ পর্যন্ত কলেজের সকল ক্লাস ও দাপ্তরিক কাজ বন্ধ থাকবে। আগামী ২৩শে জুন ২০২৬ তারিখ থেকে যথারীতি নিয়মিত ক্লাসসমূহ ও বিশ্ববিদ্যালয়ের সকল কার্যক্রম পরিচালিত হবে।'
  },
  {
    id: 'N-104',
    title: 'উচ্চ মাধ্যমিক সার্টিফিকেট (HSC) নির্বাচনী পরীক্ষার ফলাফল প্রকাশ',
    titleEn: 'HSC Pre-Test Examination Result Publication 2026',
    date: '২০২৬-০৫-২৫',
    category: 'exam',
    pdfUrl: '#',
    isPin: false,
    content: '২০২৬ সালের এইচএসসি মানবিক, বিজ্ঞান ও ব্যবসায় শিক্ষা শাখার শিক্ষার্থীদের নির্বাচনী পরীক্ষার ফলাফল প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে তাদের স্টুডেন্ট পোর্টাল বা কলেজের ওয়েবসাইট থেকে ফলাফল দেখতে বলা হচ্ছে। কোনো অভিযোগ থাকলে আগামী ০৭ দিনের মধ্যে যোগাযোগ করতে হবে।'
  },
  {
    id: 'N-105',
    title: 'ডেঙ্গু প্রতিরোধ ও কলেজ ক্যাম্পাস পরিচ্ছন্নতা কর্মসূচি পালন',
    titleEn: 'Anti-Dengue Awareness and Clean Campus Campaign',
    date: '২০২৬-০৫-২০',
    category: 'academic',
    pdfUrl: '#',
    isPin: false,
    content: 'বর্ষা মরসুমে ডেঙ্গুজ্বর প্রতিরোধে আমাদের কলেজের স্কাউট দল ও সমাজসেবা ফোরামের পক্ষ থেকে আগামীকাল সকাল ১০টায় কলেজ চত্বরে এক মশক নিধন ও পরিচ্ছন্নতা অভিযান পরিচালিত হবে। কলেজের সকল ছাত্র-ছাত্রী ও শিক্ষক মহোদয়কে অংশগ্রহণ করার জন্য সবিনয় অনুরোধ জানানো হলো।'
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 'T-01',
    name: 'শ্রাবণ ওয়াহিদ রাতুল',
    nameEn: 'Srabon Wahid Ratul',
    designation: 'অধ্যক্ষ (ভারপ্রাপ্ত)',
    designationEn: 'Principal (Acting)',
    department: 'General',
    email: 'principal.asgdc@gmail.com',
    phone: '০১৭৫১-১২৩৪৫৬',
    image: 'https://lh3.googleusercontent.com/d/13oActHtvjX-qpcvPwoBfUQbhftS10vFp',
    joiningDate: '২০১২-০৩-১৫'
  },
  {
    id: 'T-02',
    name: 'ড. মো: আবু ইউসুফ',
    nameEn: 'Dr. Md. Abu Yusuf',
    designation: 'সহকারী অধ্যাপক, পদার্থবিজ্ঞান',
    designationEn: 'Assistant Professor, Physics',
    department: 'Science',
    email: 'yusuf.physics@asgdc.edu.bd',
    phone: '০১৭১২-৩৪৫৬৭৮',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300&q=80',
    joiningDate: '২০১৫-০৮-১০'
  },
  {
    id: 'T-03',
    name: 'নাসরিন জাহান ইতি',
    nameEn: 'Nasrin Jahan Iti',
    designation: 'প্রভাষক, ইংরেজি বিভাগ',
    designationEn: 'Lecturer, Department of English',
    department: 'Humanities',
    email: 'nasrin.eng@asgdc.edu.bd',
    phone: '০১৮২৩-৪৫৬৭৮৯',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80',
    joiningDate: '২০১৮-০২-০১'
  },
  {
    id: 'T-04',
    name: 'একেএম শরিফুল ইসলাম',
    nameEn: 'AKM Shariful Islam',
    designation: 'প্রভাষক, রসায়ন বিভাগ',
    designationEn: 'Lecturer, Department of Chemistry',
    department: 'Science',
    email: 'shariful.chem@asgdc.edu.bd',
    phone: '০১৯১১-২৩৪৫৬৭',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80',
    joiningDate: '২০২০-১০-১০'
  },
  {
    id: 'T-05',
    name: 'মোছা: রাবেয়া খাতুন',
    nameEn: 'Mst. Rabeya Khatun',
    designation: 'সহকারী অধ্যাপক, হিসাববিজ্ঞান',
    designationEn: 'Assistant Professor, Accounting',
    department: 'Business Studies',
    email: 'rabeya.acc@asgdc.edu.bd',
    phone: '০১৫৫২-৩৪৫৬৭৮',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80',
    joiningDate: '২০১৪-০৬-২০'
  },
  {
    id: 'T-06',
    name: 'মো: আল আমিন সরকার',
    nameEn: 'Md. Al Amin Sarkar',
    designation: 'প্রভাষক, তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
    designationEn: 'Lecturer, Information & Communication Technology',
    department: 'Science',
    email: 'alamin.ict@asgdc.edu.bd',
    phone: '০১৭২২-৪৫৬১২৩',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80',
    joiningDate: '২০২২-০১-১৫'
  }
];

export const initialStudents: Student[] = [
  {
    id: '202601',
    name: 'আহমেদ তানভীর',
    classRoll: '১০১',
    department: 'Science',
    session: '২০২৫-২০২৬',
    parentsName: 'মো: জহিরুল ইসলাম',
    phone: '০১৭১১-২২৩৩৪৪',
    email: 'tanvir@gmail.com',
    status: 'Active'
  },
  {
    id: '202602',
    name: 'তাজমিন নাহার',
    classRoll: '২০২',
    department: 'Humanities',
    session: '২০২৫-২০২৬',
    parentsName: 'মো: শহিদুল হক',
    phone: '০১৭১১-২২৩৩৪৫',
    email: 'tajmin@gmail.com',
    status: 'Active'
  },
  {
    id: '202603',
    name: 'মো: তাসনিম রহমান',
    classRoll: '৩০১',
    department: 'Business Studies',
    session: '২০২৫-২০২৬',
    parentsName: 'মো: লুৎফর রহমান',
    phone: '০১৭১১-২২৩৩৪৬',
    email: 'tasnim@gmail.com',
    status: 'Active'
  }
];

export const initialResults: StudentResult[] = [
  {
    studentId: '202601',
    studentName: 'আহমেদ তানভীর',
    session: '২০২৫-২০২৬',
    department: 'Science',
    semester: '১ম সেমিস্টার',
    examName: 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
    gpa: 4.83,
    subjects: [
      { subjectName: 'বাংলা ১ম পত্র', marks: 82, grade: 'A+', gp: 5.0 },
      { subjectName: 'ইংরেজি ১ম পত্র', marks: 76, grade: 'A', gp: 4.0 },
      { subjectName: 'পদার্থবিজ্ঞান', marks: 85, grade: 'A+', gp: 5.0 },
      { subjectName: 'রসায়ন', marks: 81, grade: 'A+', gp: 5.0 },
      { subjectName: 'উচ্চতর গণিত', marks: 88, grade: 'A+', gp: 5.0 },
      { subjectName: 'তথ্য ও যোগাযোগ প্রযুক্তি', addressLine: 'ICT', marks: 80, grade: 'A+', gp: 5.0 } as any
    ]
  },
  {
    studentId: '202602',
    studentName: 'তাজমিন নাহার',
    session: '২০২৫-২০২৬',
    department: 'Humanities',
    semester: '১ম সেমিস্টার',
    examName: 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
    gpa: 4.50,
    subjects: [
      { subjectName: 'বাংলা ১ম পত্র', marks: 80, grade: 'A+', gp: 5.0 },
      { subjectName: 'ইংরেজি ১ম পত্র', marks: 70, grade: 'A-', gp: 3.5 },
      { subjectName: 'ইতিহাস', marks: 78, grade: 'A', gp: 4.0 },
      { subjectName: 'পৌরনীতি ও সুশাসন', marks: 84, grade: 'A+', gp: 5.0 },
      { subjectName: 'যুক্তিবিদ্যা', marks: 82, grade: 'A+', gp: 5.0 },
      { subjectName: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 75, grade: 'A', gp: 4.0 }
    ]
  },
  {
    studentId: '202603',
    studentName: 'মো: তাসনিম রহমান',
    session: '২০২৫-২০২৬',
    department: 'Business Studies',
    semester: '১ম সেমিস্টার',
    examName: 'অর্ধবার্ষিক পরীক্ষা ২০২৬',
    gpa: 4.67,
    subjects: [
      { subjectName: 'বাংলা ১ম পত্র', marks: 75, grade: 'A', gp: 4.0 },
      { subjectName: 'ইংরেজি ১ম পত্র', marks: 72, grade: 'A', gp: 4.0 },
      { subjectName: 'হিসাববিজ্ঞান', marks: 84, grade: 'A+', gp: 5.0 },
      { subjectName: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা', marks: 81, grade: 'A+', gp: 5.0 },
      { subjectName: 'ফিন্যান্স ও ব্যাংকিং', marks: 88, grade: 'A+', gp: 5.0 },
      { subjectName: 'তথ্য ও যোগাযোগ প্রযুক্তি', marks: 70, grade: 'A-', gp: 3.5 }
    ]
  }
];

export const initialRoutines: RoutineItem[] = [
  {
    id: 'R-01',
    day: 'শনিবার / Saturday',
    period1: 'পদার্থবিজ্ঞান (Dr. Yusuf)',
    period2: 'ইংরেজি (Nasrin Jahan)',
    period3: 'রসায়ন (AKM Shariful)',
    period4: 'বাংলা (Rahman)',
    period5: 'আইসিটি (Al Amin)',
    department: 'Science',
    year: '1st Year'
  },
  {
    id: 'R-02',
    day: 'রবিবার / Sunday',
    period1: 'উচ্চতর গণিত (Asst Prof)',
    period2: 'রসায়ন (AKM Shariful)',
    period3: 'ইংরেজি (Nasrin Jahan)',
    period4: 'পদার্থবিজ্ঞান (Dr. Yusuf)',
    period5: 'বাংলা (Rahman)',
    department: 'Science',
    year: '1st Year'
  },
  {
    id: 'R-03',
    day: 'সোমবার / Monday',
    period1: 'পদার্থবিজ্ঞান (Dr. Yusuf)',
    period2: 'বাংলা (Rahman)',
    period3: 'আইসিটি (Al Amin)',
    period4: 'উচ্চতর গণিত (Asst Prof)',
    period5: 'রসায়ন (Lab Class)',
    department: 'Science',
    year: '1st Year'
  },
  {
    id: 'R-04',
    day: 'মঙ্গলবার / Tuesday',
    period1: 'রসায়ন (AKM Shariful)',
    period2: 'উচ্চতর গণিত (Asst Prof)',
    period3: 'ইংরেজি (Nasrin Jahan)',
    period4: 'পদার্থবিজ্ঞান (Lab Class)',
    period5: 'ফ্রি স্টাডি সেশন',
    department: 'Science',
    year: '1st Year'
  },
  {
    id: 'R-05',
    day: 'বুধবার / Wednesday',
    period1: 'বাংলা (Rahman)',
    period2: 'ইংরেজি (Nasrin Jahan)',
    period3: 'আইসিটি (Al Amin)',
    period4: 'সমাজসেবা ও স্কাউটিং',
    period5: 'ক্লিন ক্যাম্পাস অ্যাক্টিভিটি',
    department: 'Science',
    year: '1st Year'
  },

  // Humanities Routines
  {
    id: 'R-06',
    day: 'শনিবার / Saturday',
    period1: 'ইতিহাস (Iti)',
    period2: 'ইংরেজি (Nasrin)',
    period3: 'পৌরনীতি (Abdur)',
    period4: 'বাংলা (Rahman)',
    period5: 'আইসিটি (Al Amin)',
    department: 'Humanities',
    year: '1st Year'
  },
  {
    id: 'R-07',
    day: 'রবিবার / Sunday',
    period1: 'যুক্তিবিদ্যা (Ratul)',
    period2: 'ইতিহাস (Iti)',
    period3: 'ইংরেজি (Nasrin)',
    period4: 'বাংলা (Rahman)',
    period5: 'পৌরনীতি (Abdur)',
    department: 'Humanities',
    year: '1st Year'
  },

  // Business Studies
  {
    id: 'R-08',
    day: 'শনিবার / Saturday',
    period1: 'হিসাববিজ্ঞান (Rabeya)',
    period2: 'ইংরেজি (Nasrin)',
    period3: 'ব্যবসায় সংগঠন',
    period4: 'বাংলা (Rahman)',
    period5: 'আইসিটি (Al Amin)',
    department: 'Business Studies',
    year: '1st Year'
  },
  {
    id: 'R-09',
    day: 'রবিবার / Sunday',
    period1: 'ফিন্যান্স ও ব্যাংকিং',
    period2: 'হিসাববিজ্ঞান (Rabeya)',
    period3: 'ইংরেজি (Nasrin)',
    period4: 'ব্যবসায় সংগঠন',
    period5: 'বাংলা (Rahman)',
    department: 'Business Studies',
    year: '1st Year'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'G-01',
    title: 'কলেজ ভবনের প্রধান ফটক ও নয়নকাড়া সবুজ চত্বর',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    category: 'campus',
    date: '২০২৬-০৩-১০'
  },
  {
    id: 'G-02',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরষ্কার বিতরণী অনুষ্ঠান',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    category: 'sports',
    date: '২০২৬-০২-১৫'
  },
  {
    id: 'G-03',
    title: 'মহান স্বাধীনতা দিবস উপলক্ষে আয়োজিত সাংস্কৃতিক সন্ধ্যা',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    category: 'cultural',
    date: '২০২৬-০৩-২৬'
  },
  {
    id: 'G-04',
    title: 'নতুন শিক্ষার্থীদের বরণ করে নিতে নবীনবরণ উৎসব ২০২৬',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    category: 'events',
    date: '২০২৬-০১-১০'
  },
  {
    id: 'G-05',
    title: 'কলেজের সুসজ্জিত আধুনিক আইসিটি ও কম্পিউটার ল্যাব',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    category: 'campus',
    date: '২০২৬-০৪-০৫'
  },
  {
    id: 'G-06',
    title: 'আন্তঃবিভাগীয় ফুটবল টুর্নামেন্টের ফাইনাল ম্যাচ',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    category: 'sports',
    date: '২০২৬-০৩-০৪'
  }
];
