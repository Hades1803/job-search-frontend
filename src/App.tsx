// src/App.tsx (cập nhật)
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import FindJobs from './Pages/FindJobs';
import Header from './Header/Header';
import { Footer } from './Footer/Footer';
import FindTalents from './Pages/FindTalents';
import TalentProfilePage from './Pages/TalentProfilePage';
import PostJobPage from './Pages/PostJobPage';
import '@mantine/tiptap/styles.css';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApplyJobPage';
import CompanyPage from './Pages/CompanyPage';
import '@mantine/dates/styles.css';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';
import { AuthProvider } from './Context/AuthContext';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import { useEffect, useState } from 'react';
import VerifyOtpPage from './Pages/VerifyOtpPage';

// Component để kiểm soát hiển thị Header/Footer
const Layout = () => {
  const location = useLocation();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  useEffect(() => {
    
    const authRoutes = ['/signup', '/login', '/forgot-password', '/reset-password','/verify-otp'];
    setShowHeaderFooter(!authRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div className="relative">
      {showHeaderFooter && <Header />}
      {showHeaderFooter && <Divider size="xs" mx="md" />}
      
      <Routes>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/find-talents" element={<FindTalents />} />
        <Route path="/jobs" element={<JobDescPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/apply-job" element={<ApplyJobPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/posted-job" element={<PostedJobPage />} />
        <Route path="/job-history" element={<JobHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/talent-profile" element={<TalentProfilePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {showHeaderFooter && <Divider size="xs" mx="md" />}
      {showHeaderFooter && <Footer />}
    </div>
  );
};

export default function App() {
  const theme = createTheme({
    focusRing: 'never',
    primaryColor: 'brightSun',
    primaryShade: 4,
    colors: {
      brightSun: [
        '#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20',
        '#f99b07', '#dd7302', '#b75006', '#943c0c', '#7a330d', '#461902'
      ],
      mineShaft: [
        '#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888',
        '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#2d2d2d'
      ]
    },
    fontFamily: 'poppins,sans-serif'
  });

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        newestOnTop
      />
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}