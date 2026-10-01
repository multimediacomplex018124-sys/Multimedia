export type CourseCategory = '৩ মাস মেয়াদী কোর্স' | '৬ মাস মেয়াদী কোর্স' | '১ বছর মেয়াদী কোর্স' | 'অন্যান্য কোর্স';

export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  duration: string; // e.g. "৩ মাস (৩৬টি ক্লাস)"
  description: string;
  learningOutcomes: string[];
  curriculum: { module: string; topics: string[] }[];
  image: string;
  courseFee: string; // editable placeholder e.g. "৳ ৩,৫০০ (সম্পাদনযোগ্য)"
  admissionFee: string; // e.g. "৳ ৫০০ (সম্পাদনযোগ্য)"
  schedule: string; // e.g. "শনি-সোম-বুধ (সকাল ১০:০০ - ১১:৩০)"
  eligibility: string; // e.g. "ন্যূনতম এসএসসি / সমমান বা আগ্রহী যে কেউ"
  seats: number;
  availableSeats: number;
  instructorName: string;
  status: 'ভর্তি চলছে' | 'আসন সীমিত' | 'ভর্তি বন্ধ';
  featured?: boolean;
}

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface AdmissionApplication {
  id: string; // e.g. MC-ADM-2026-1042
  applicantName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  dob: string;
  address: string;
  courseId: string;
  courseName: string;
  courseDuration: string;
  qualification: string;
  photoUrl?: string;
  extraInfo?: string;
  status: ApplicationStatus;
  adminNote?: string;
  appliedDate: string;
}

export interface Student {
  id: string; // e.g. STU-2026-101
  password: string;
  name: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  photoUrl: string;
  enrolledCourseId: string;
  enrolledCourseName: string;
  batch: string;
  session: string;
  rollNo: string;
  regNo: string;
  admissionDate: string;
  status: 'অধ্যয়নরত' | 'কোর্স সম্পন্ন' | 'ড্রপআউট';
  feePaid: string;
  feeTotal: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  topicCovered?: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  subject: string;
  date: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: 'A+' | 'A' | 'A-' | 'B' | 'C' | 'Fail';
  resultStatus: 'Passed' | 'Distinction' | 'Failed';
  publishedDate: string;
}

export interface Certificate {
  id: string; // e.g. MC-CERT-2026-001
  studentName: string;
  fatherName: string;
  studentId: string;
  courseName: string;
  courseDuration: string;
  regNo: string;
  rollNo: string;
  grade: string;
  issueDate: string;
  session: string;
  verificationStatus: 'Valid' | 'Revoked';
  instituteSignatory: string;
}

export type NoticeCategory = 'ভর্তি বিজ্ঞপ্তি' | 'ক্লাস নোটিশ' | 'পরীক্ষা' | 'ফলাফল' | 'গুরুত্বপূর্ণ ঘোষণা';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  description: string;
  attachmentName?: string;
  isImportant?: boolean;
}

export type GalleryCategory = 'ক্লাসরুম' | 'কম্পিউটার ল্যাব' | 'প্রশিক্ষণ কার্যক্রম' | 'অনুষ্ঠান' | 'শিক্ষার্থী কার্যক্রম' | 'অন্যান্য';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  date: string;
  caption?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Instructor {
  id: string;
  name: string;
  designation: string;
  subject: string;
  bio: string;
  photoUrl: string;
  phone?: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  photoUrl: string;
  quote: string;
  currentRole: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface InstituteSettings {
  instituteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  messengerUrl: string;
  googleMapLocation: string;
  aboutIntro: string;
  mission: string;
  vision: string;
  trainingMethodology: string;
  futurePlans: string;
}
