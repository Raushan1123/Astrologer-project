import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";
import Contact from "./pages/Contact";
import Gemstones from "./pages/Gemstones";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/services" element={<Services />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking-success/:bookingId"
                element={
                  <ProtectedRoute>
                    <BookingSuccess />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gemstones" element={<Gemstones />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
            <Footer />
            <Toaster />
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
