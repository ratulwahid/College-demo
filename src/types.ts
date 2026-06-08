export interface Notice {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  category: 'academic' | 'admission' | 'administrative' | 'exam';
  pdfUrl: string;
  isPin: boolean;
  content: string;
}

export interface Teacher {
  id: string;
  name: string;
  nameEn?: string;
  designation: string;
  designationEn?: string;
  department: 'Science' | 'Humanities' | 'Business Studies' | 'General';
  email: string;
  phone: string;
  image: string;
  joiningDate: string;
}

export interface Student {
  id: string;
  name: string;
  classRoll: string;
  department: 'Science' | 'Humanities' | 'Business Studies';
  session: string;
  parentsName: string;
  phone: string;
  email: string;
  status: 'Active' | 'Suspended' | 'Alumni';
}

export interface ScoreDetail {
  subjectName: string;
  marks: number;
  grade: string;
  gp: number;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  session: string;
  department: 'Science' | 'Humanities' | 'Business Studies';
  semester: string;
  examName: string;
  gpa: number;
  subjects: ScoreDetail[];
}

export interface RoutineItem {
  id: string;
  day: string;
  period1: string; // 10:00 AM - 10:45 AM
  period2: string; // 10:45 AM - 11:30 AM
  period3: string; // 11:30 AM - 12:15 PM
  period4: string; // 12:15 PM - 01:00 PM
  period5: string; // 01:30 PM - 02:15 PM
  department: 'Science' | 'Humanities' | 'Business Studies';
  year: '1st Year' | '2nd Year';
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'campus' | 'sports' | 'cultural' | 'events';
  date: string;
}
