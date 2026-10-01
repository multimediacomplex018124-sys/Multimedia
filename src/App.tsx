import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { CourseSection } from './components/CourseSection';
import { CourseDetailsModal } from './components/CourseDetailsModal';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AdmissionSection } from './components/AdmissionSection';
import { ApplicationStatusSection } from './components/ApplicationStatusSection';
import { NoticeBoardSection } from './components/NoticeBoardSection';
import { GallerySection } from './components/GallerySection';
import { CertificateVerification } from './components/CertificateVerification';
import { InstructorsAndTestimonials } from './components/InstructorsAndTestimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AuthModals } from './components/AuthModals';
import { Course } from './types';

function MainLayout() {
  const {
    activeSection,
    setActiveSection,
    selectedCourseForModal,
    setSelectedCourseForModal,
    setPreselectedCourseForAdmission,
    userSession,
    setLoginModalOpen
  } = useApp();

  const [initialSearchAppId, setInitialSearchAppId] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin-panel') {
      if (userSession.role !== 'admin') {
        setLoginModalOpen('admin');
        return;
      }
      setActiveSection('admin-panel');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'student-dashboard') {
      if (userSession.role !== 'student') {
        setLoginModalOpen('student');
        return;
      }
      setActiveSection('student-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveSection(sectionId);

    // Scroll to element if exists
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseForModal(course);
  };

  const handleApplyForCourse = (course: Course) => {
    setPreselectedCourseForAdmission(course);
    handleNavigate('admission');
  };

  const handleCheckStatus = (appId?: string) => {
    if (appId) {
      setInitialSearchAppId(appId);
    }
    handleNavigate('application-status');
  };

  // If in dedicated Admin Panel view
  if (activeSection === 'admin-panel' && userSession.role === 'admin') {
    return (
      <div>
        <AdminPanel onExit={() => setActiveSection('home')} />
        <AuthModals onSuccessNavigate={(target) => setActiveSection(target)} />
      </div>
    );
  }

  // If in dedicated Student Dashboard view
  if (activeSection === 'student-dashboard' && userSession.role === 'student') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar onNavigate={handleNavigate} />
        <main className="flex-1">
          <StudentDashboard />
        </main>
        <Footer onNavigate={handleNavigate} />
        <AuthModals onSuccessNavigate={(target) => setActiveSection(target)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Sticky Main Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Public Website Sections */}
      <main className="flex-1 space-y-0">
        {/* 1. Hero Section */}
        <div id="home">
          <Hero
            onExploreCourses={() => handleNavigate('courses')}
            onApplyNow={() => handleNavigate('admission')}
          />
        </div>

        {/* 2. About Us Section */}
        <AboutUs />

        {/* 3. Course Management / Browse Section */}
        <CourseSection
          onSelectCourse={handleSelectCourse}
          onApplyForCourse={handleApplyForCourse}
        />

        {/* 4. Facilities Section */}
        <FacilitiesSection />

        {/* 5. Online Admission Form Section */}
        <AdmissionSection onCheckStatus={handleCheckStatus} />

        {/* 6. Application Status Search Section */}
        <ApplicationStatusSection
          initialSearchId={initialSearchAppId}
          onApplyNew={() => handleNavigate('admission')}
        />

        {/* 7. Notice Board Section */}
        <NoticeBoardSection />

        {/* 8. Photo Gallery Section */}
        <GallerySection />

        {/* 9. Certificate Verification Section */}
        <CertificateVerification />

        {/* 10. Instructors, Testimonials and FAQ */}
        <InstructorsAndTestimonials />

        {/* 11. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Course Details Modal */}
      <CourseDetailsModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onApply={(course) => handleApplyForCourse(course)}
        onContact={() => handleNavigate('contact')}
      />

      {/* Authentication Modals (Student Login & Admin Login) */}
      <AuthModals onSuccessNavigate={(target) => setActiveSection(target)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
