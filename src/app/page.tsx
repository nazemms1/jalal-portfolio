"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealSection from "@/components/RevealSection";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function Home() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Check URL hash for #/admin or #admin
    const checkHash = () => {
      const hash = window.location.hash;
      setIsAdminRoute(hash === "#/admin" || hash === "#admin");
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => {
      unsub();
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const closeAdmin = () => {
    window.location.hash = "";
    setIsAdminRoute(false);
  };

  return (
    <PortfolioProvider>
      <Navbar />
      <main style={{ overflowX: "hidden" }}>
        <Hero />
        <RevealSection><About /></RevealSection>
        <RevealSection><Skills /></RevealSection>
        <RevealSection><Projects /></RevealSection>
        <RevealSection><Experience /></RevealSection>
        <RevealSection><Education /></RevealSection>
        <RevealSection><Contact /></RevealSection>
      </main>
      <Footer />

      {/* Firebase CMS Admin Overlay */}
      {isAdminRoute && (
        <>
          {user ? (
            <AdminDashboard onClose={closeAdmin} />
          ) : (
            <AdminLogin onSuccess={() => setIsAdminRoute(true)} onClose={closeAdmin} />
          )}
        </>
      )}
    </PortfolioProvider>
  );
}
