import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  AdmissionApplication,
  Student,
  AttendanceRecord,
  ExamResult,
  Certificate,
  Notice,
  GalleryItem,
  Facility,
  Instructor,
  Testimonial,
  FAQItem,
  InstituteSettings,
  ApplicationStatus
} from '../types';
import {
  DEFAULT_SETTINGS,
  DEFAULT_COURSES,
  DEFAULT_APPLICATIONS,
  DEFAULT_STUDENTS,
  DEFAULT_ATTENDANCE,
  DEFAULT_EXAM_RESULTS,
  DEFAULT_CERTIFICATES,
  DEFAULT_NOTICES,
  DEFAULT_GALLERY,
  DEFAULT_FACILITIES,
  DEFAULT_INSTRUCTORS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS
} from '../data/defaultData';

interface UserSession {
  role: 'guest' | 'student' | 'admin';
  student?: Student;
}

interface AppContextType {
  settings: InstituteSettings;
  updateSettings: (newSettings: Partial<InstituteSettings>) => void;

  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  applications: AdmissionApplication[];
  submitApplication: (data: Omit<AdmissionApplication, 'id' | 'status' | 'appliedDate'>) => string;
  updateApplicationStatus: (id: string, status: ApplicationStatus, adminNote?: string) => void;

  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => string;
  updateStudent: (id: string, data: Partial<Student>) => void;

  attendance: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => void;
  getStudentAttendanceStats: (studentId: string) => { total: number; present: number; absent: number; percentage: number };

  examResults: ExamResult[];
  addExamResult: (result: Omit<ExamResult, 'id'>) => void;
  getStudentExamResults: (studentId: string) => ExamResult[];

  certificates: Certificate[];
  issueCertificate: (cert: Omit<Certificate, 'id'>) => string;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  verifyCertificate: (certId: string) => Certificate | null;

  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  facilities: Facility[];
  updateFacility: (id: string, data: Partial<Facility>) => void;

  instructors: Instructor[];
  addInstructor: (inst: Omit<Instructor, 'id'>) => void;
  updateInstructor: (id: string, inst: Partial<Instructor>) => void;
  deleteInstructor: (id: string) => void;

  testimonials: Testimonial[];
  faqs: FAQItem[];

  // Auth & Session
  userSession: UserSession;
  loginAsStudent: (studentId: string, pass: string) => { success: boolean; message: string };
  loginAsAdmin: (password: string) => boolean;
  changeAdminPassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  logout: () => void;

  // Active view states
  activeSection: string;
  setActiveSection: (sec: string) => void;
  selectedCourseForModal: Course | null;
  setSelectedCourseForModal: (c: Course | null) => void;
  preselectedCourseForAdmission: Course | null;
  setPreselectedCourseForAdmission: (c: Course | null) => void;
  loginModalOpen: 'none' | 'student' | 'admin';
  setLoginModalOpen: (type: 'none' | 'student' | 'admin') => void;

  // Data persistence actions
  resetAllData: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'mc_settings_v1',
  COURSES: 'mc_courses_v1',
  APPLICATIONS: 'mc_applications_v1',
  STUDENTS: 'mc_students_v1',
  ATTENDANCE: 'mc_attendance_v1',
  EXAM_RESULTS: 'mc_exam_results_v1',
  CERTIFICATES: 'mc_certificates_v1',
  NOTICES: 'mc_notices_v1',
  GALLERY: 'mc_gallery_v1',
  FACILITIES: 'mc_facilities_v1',
  INSTRUCTORS: 'mc_instructors_v1',
  TESTIMONIALS: 'mc_testimonials_v1',
  FAQS: 'mc_faqs_v1',
  ADMIN_PASSWORD: 'mc_admin_password_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || 'admin123';
    } catch {
      return 'admin123';
    }
  });
  const [settings, setSettings] = useState<InstituteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : DEFAULT_COURSES;
    } catch {
      return DEFAULT_COURSES;
    }
  });

  const [applications, setApplications] = useState<AdmissionApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : DEFAULT_APPLICATIONS;
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return saved ? JSON.parse(saved) : DEFAULT_ATTENDANCE;
    } catch {
      return DEFAULT_ATTENDANCE;
    }
  });

  const [examResults, setExamResults] = useState<ExamResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
      return saved ? JSON.parse(saved) : DEFAULT_EXAM_RESULTS;
    } catch {
      return DEFAULT_EXAM_RESULTS;
    }
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return saved ? JSON.parse(saved) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return saved ? JSON.parse(saved) : DEFAULT_NOTICES;
    } catch {
      return DEFAULT_NOTICES;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      return saved ? JSON.parse(saved) : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  });

  const [instructors, setInstructors] = useState<Instructor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
      return saved ? JSON.parse(saved) : DEFAULT_INSTRUCTORS;
    } catch {
      return DEFAULT_INSTRUCTORS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  });

  // UI state
  const [userSession, setUserSession] = useState<UserSession>({ role: 'guest' });
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [preselectedCourseForAdmission, setPreselectedCourseForAdmission] = useState<Course | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<'none' | 'student' | 'admin'>('none');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.warn(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.warn(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.warn(e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
    } catch (e) {
      console.warn(e);
    }
  }, [attendance]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(examResults));
    } catch (e) {
      console.warn(e);
    }
  }, [examResults]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
    } catch (e) {
      console.warn(e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    } catch (e) {
      console.warn(e);
    }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.warn(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    } catch (e) {
      console.warn(e);
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(instructors));
    } catch (e) {
      console.warn(e);
    }
  }, [instructors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, adminPassword);
    } catch (e) {
      console.warn(e);
    }
  }, [adminPassword]);

  // Actions
  const updateSettings = (newSettings: Partial<InstituteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const submitApplication = (data: Omit<AdmissionApplication, 'id' | 'status' | 'appliedDate'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `MC-ADM-2026-${randomNum}`;
    const today = new Date().toISOString().split('T')[0];
    const newApp: AdmissionApplication = {
      ...data,
      id: newId,
      status: 'Pending',
      appliedDate: today,
      adminNote: 'আবেদনপত্র জমা হয়েছে। প্রাথমিক যাচাই শেষে যোগাযোগ করা হবে।'
    };
    setApplications(prev => [newApp, ...prev]);
    return newId;
  };

  const updateApplicationStatus = (id: string, status: ApplicationStatus, adminNote?: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status, adminNote: adminNote ?? app.adminNote } : app))
    );
  };

  const addStudent = (studentData: Omit<Student, 'id'>): string => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newId = `STU-2026-${randomNum}`;
    const newStudent: Student = {
      ...studentData,
      id: newId
    };
    setStudents(prev => [newStudent, ...prev]);
    return newId;
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
    // If current logged-in student updated, refresh session
    if (userSession.student && userSession.student.id === id) {
      setUserSession(prev => ({
        ...prev,
        student: { ...prev.student!, ...data }
      }));
    }
  };

  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}`
    };
    setAttendance(prev => [newRecord, ...prev]);
  };

  const getStudentAttendanceStats = (studentId: string) => {
    const records = attendance.filter(a => a.studentId === studentId);
    const total = records.length;
    const present = records.filter(a => a.status === 'Present').length;
    const absent = records.filter(a => a.status === 'Absent').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 100;
    return { total, present, absent, percentage };
  };

  const addExamResult = (result: Omit<ExamResult, 'id'>) => {
    const newResult: ExamResult = {
      ...result,
      id: `res-${Date.now()}`
    };
    setExamResults(prev => [newResult, ...prev]);
  };

  const getStudentExamResults = (studentId: string) => {
    return examResults.filter(r => r.studentId === studentId);
  };

  const issueCertificate = (cert: Omit<Certificate, 'id'>): string => {
    const randomNum = String(certificates.length + 1).padStart(3, '0');
    const newId = `MC-CERT-2026-${randomNum}`;
    const newCert: Certificate = {
      ...cert,
      id: newId
    };
    setCertificates(prev => [newCert, ...prev]);
    return newId;
  };

  const updateCertificate = (id: string, cert: Partial<Certificate>) => {
    setCertificates(prev => prev.map(c => (c.id === id ? { ...c, ...cert } : c)));
  };

  const verifyCertificate = (certId: string): Certificate | null => {
    const trimmed = certId.trim().toUpperCase();
    const found = certificates.find(c => c.id.toUpperCase() === trimmed);
    return found || null;
  };

  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now()}`
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const updateNotice = (id: string, updated: Partial<Notice>) => {
    setNotices(prev => prev.map(n => (n.id === id ? { ...n, ...updated } : n)));
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const updateFacility = (id: string, data: Partial<Facility>) => {
    setFacilities(prev => prev.map(f => (f.id === id ? { ...f, ...data } : f)));
  };

  const addInstructor = (inst: Omit<Instructor, 'id'>) => {
    const newInst: Instructor = {
      ...inst,
      id: `inst-${Date.now()}`
    };
    setInstructors(prev => [newInst, ...prev]);
  };

  const updateInstructor = (id: string, inst: Partial<Instructor>) => {
    setInstructors(prev => prev.map(i => (i.id === id ? { ...i, ...inst } : i)));
  };

  const deleteInstructor = (id: string) => {
    setInstructors(prev => prev.filter(i => i.id !== id));
  };

  // Auth
  const loginAsStudent = (studentId: string, pass: string): { success: boolean; message: string } => {
    const trimmedId = studentId.trim();
    const target = students.find(s => s.id.toLowerCase() === trimmedId.toLowerCase());
    if (!target) {
      return { success: false, message: 'শিক্ষার্থী আইডি খুঁজে পাওয়া যায়নি।' };
    }
    if (target.password !== pass) {
      return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
    }
    setUserSession({ role: 'student', student: target });
    return { success: true, message: 'সফলভাবে লগইন হয়েছে!' };
  };

  const loginAsAdmin = (password: string): boolean => {
    if (password === adminPassword) {
      setUserSession({ role: 'admin' });
      return true;
    }
    return false;
  };

  const changeAdminPassword = (currentPass: string, newPass: string): { success: boolean; message: string } => {
    if (currentPass !== adminPassword) {
      return { success: false, message: 'বর্তমান পাসওয়ার্ডটি সঠিক নয়।' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।' };
    }
    setAdminPassword(newPass.trim());
    return { success: true, message: 'অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' };
  };

  const logout = () => {
    setUserSession({ role: 'guest' });
  };

  const resetAllData = () => {
    localStorage.clear();
    setSettings(DEFAULT_SETTINGS);
    setCourses(DEFAULT_COURSES);
    setApplications(DEFAULT_APPLICATIONS);
    setStudents(DEFAULT_STUDENTS);
    setAttendance(DEFAULT_ATTENDANCE);
    setExamResults(DEFAULT_EXAM_RESULTS);
    setCertificates(DEFAULT_CERTIFICATES);
    setNotices(DEFAULT_NOTICES);
    setGallery(DEFAULT_GALLERY);
    setFacilities(DEFAULT_FACILITIES);
    setInstructors(DEFAULT_INSTRUCTORS);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setFaqs(DEFAULT_FAQS);
    setUserSession({ role: 'guest' });
  };

  const exportDataJSON = () => {
    const allData = {
      settings,
      courses,
      applications,
      students,
      attendance,
      examResults,
      certificates,
      notices,
      gallery,
      facilities,
      instructors,
      testimonials,
      faqs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `multimedia_complex_backup_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) setSettings(data.settings);
      if (data.courses) setCourses(data.courses);
      if (data.applications) setApplications(data.applications);
      if (data.students) setStudents(data.students);
      if (data.attendance) setAttendance(data.attendance);
      if (data.examResults) setExamResults(data.examResults);
      if (data.certificates) setCertificates(data.certificates);
      if (data.notices) setNotices(data.notices);
      if (data.gallery) setGallery(data.gallery);
      if (data.facilities) setFacilities(data.facilities);
      if (data.instructors) setInstructors(data.instructors);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        applications,
        submitApplication,
        updateApplicationStatus,
        students,
        addStudent,
        updateStudent,
        attendance,
        addAttendanceRecord,
        getStudentAttendanceStats,
        examResults,
        addExamResult,
        getStudentExamResults,
        certificates,
        issueCertificate,
        updateCertificate,
        verifyCertificate,
        notices,
        addNotice,
        updateNotice,
        deleteNotice,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        facilities,
        updateFacility,
        instructors,
        addInstructor,
        updateInstructor,
        deleteInstructor,
        testimonials,
        faqs,
        userSession,
        loginAsStudent,
        loginAsAdmin,
        changeAdminPassword,
        logout,
        activeSection,
        setActiveSection,
        selectedCourseForModal,
        setSelectedCourseForModal,
        preselectedCourseForAdmission,
        setPreselectedCourseForAdmission,
        loginModalOpen,
        setLoginModalOpen,
        resetAllData,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
