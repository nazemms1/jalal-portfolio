"use client";

import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { usePortfolioData, PortfolioContentData } from "@/context/PortfolioContext";
import type { Project, Skill, ExperienceItem } from "@/types";

interface AdminDashboardProps {
  onClose: () => void;
}

// Clean Monochrome SVG Icons
const Icons = {
  Profile: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Projects: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  ),
  Experience: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Skills: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  System: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Up: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),
  Down: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="M12 5v14" />
    </svg>
  ),
  Save: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  ),
};

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { data, saveData, resetToDefaults, isSynced } = usePortfolioData();
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "experience" | "skills" | "system">("profile");

  const [formData, setFormData] = useState<PortfolioContentData>(JSON.parse(JSON.stringify(data)));
  const [saveStatus, setSaveStatus] = useState<string>("");

  // Slide-over Aside Drawer State
  const [asideOpen, setAsideOpen] = useState(false);
  const [asideType, setAsideType] = useState<"project" | "experience" | "skill">("project");
  const [asideMode, setAsideMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  // Form State for Aside Drawer
  const [draftProject, setDraftProject] = useState<Project>({
    id: Date.now(),
    title: "",
    description: "",
    fullDescription: "",
    features: [],
    tags: [],
    category: "web",
    imageUrl: "",
    hidden: false,
  });

  const [draftExperience, setDraftExperience] = useState<ExperienceItem>({
    id: Date.now(),
    role: "",
    company: "",
    period: "",
    description: "",
    highlights: [],
    tags: [],
    hidden: false,
  });

  const [draftSkill, setDraftSkill] = useState<Skill>({
    name: "",
    category: "frontend",
    level: 85,
    hidden: false,
  });

  // Deletion Confirmation Modal State
  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{
    open: boolean;
    title: string;
    onConfirm: () => void;
  }>({ open: false, title: "", onConfirm: () => {} });

  const handleSaveAll = async () => {
    setSaveStatus("Saving changes...");
    try {
      await saveData(formData);
      setSaveStatus("Synced Live to Firestore ✨");
      setTimeout(() => setSaveStatus(""), 3500);
    } catch (err: any) {
      setSaveStatus("Error: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  // JSON Export / Import
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `jalal_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setFormData(imported);
          setSaveStatus("Backup JSON loaded into workspace. Click Save Changes to publish!");
        } catch (err) {
          alert("Invalid JSON backup file!");
        }
      };
    }
  };

  // Reordering Helpers
  const moveItem = (listName: "projects" | "experiences" | "skills", fromIdx: number, toIdx: number) => {
    const list = [...(formData[listName] as any[])];
    if (toIdx < 0 || toIdx >= list.length) return;
    const [target] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, target);
    setFormData({ ...formData, [listName]: list });
  };


  // Visibility Toggle
  const toggleVisibility = (listName: "projects" | "experiences" | "skills", idx: number) => {
    const list = [...(formData[listName] as any[])];
    list[idx].hidden = !list[idx].hidden;
    setFormData({ ...formData, [listName]: list });
  };

  // Aside Drawer Openers
  const openAddProject = () => {
    setDraftProject({
      id: Date.now(),
      title: "",
      description: "",
      fullDescription: "",
      features: ["High Performance", "Realtime State"],
      tags: ["React", "TypeScript"],
      category: "web",
      imageUrl: "",
      hidden: false,
    });
    setAsideType("project");
    setAsideMode("add");
    setAsideOpen(true);
  };

  const openEditProject = (pIdx: number) => {
    setEditingIndex(pIdx);
    setDraftProject(JSON.parse(JSON.stringify(formData.projects[pIdx])));
    setAsideType("project");
    setAsideMode("edit");
    setAsideOpen(true);
  };

  const saveProjectDrawer = () => {
    if (!draftProject.title.trim()) return alert("Project title is required!");
    const updated = [...formData.projects];
    if (asideMode === "add") {
      updated.unshift(draftProject);
    } else {
      updated[editingIndex] = draftProject;
    }
    setFormData({ ...formData, projects: updated });
    setAsideOpen(false);
  };

  const openAddExperience = () => {
    setDraftExperience({
      id: Date.now(),
      role: "",
      company: "",
      period: "2024 - Present",
      description: "",
      highlights: ["Key achievement 1"],
      tags: ["React", "Python"],
      hidden: false,
    });
    setAsideType("experience");
    setAsideMode("add");
    setAsideOpen(true);
  };

  const openEditExperience = (eIdx: number) => {
    setEditingIndex(eIdx);
    setDraftExperience(JSON.parse(JSON.stringify(formData.experiences[eIdx])));
    setAsideType("experience");
    setAsideMode("edit");
    setAsideOpen(true);
  };

  const saveExperienceDrawer = () => {
    if (!draftExperience.role.trim()) return alert("Role title is required!");
    const updated = [...formData.experiences];
    if (asideMode === "add") {
      updated.unshift(draftExperience);
    } else {
      updated[editingIndex] = draftExperience;
    }
    setFormData({ ...formData, experiences: updated });
    setAsideOpen(false);
  };

  const openAddSkill = () => {
    setDraftSkill({ name: "", category: "frontend", level: 85, hidden: false });
    setAsideType("skill");
    setAsideMode("add");
    setAsideOpen(true);
  };

  const openEditSkill = (sIdx: number) => {
    setEditingIndex(sIdx);
    setDraftSkill(JSON.parse(JSON.stringify(formData.skills[sIdx])));
    setAsideType("skill");
    setAsideMode("edit");
    setAsideOpen(true);
  };

  const saveSkillDrawer = () => {
    if (!draftSkill.name.trim()) return alert("Skill name is required!");
    const updated = [...formData.skills];
    if (asideMode === "add") {
      updated.push(draftSkill);
    } else {
      updated[editingIndex] = draftSkill;
    }
    setFormData({ ...formData, skills: updated });
    setAsideOpen(false);
  };

  // Base64 Image Uploader Helper
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setDraftProject({ ...draftProject, imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const triggerDeleteConfirm = (title: string, onConfirmAction: () => void) => {
    setConfirmDeleteModal({
      open: true,
      title,
      onConfirm: () => {
        onConfirmAction();
        setConfirmDeleteModal({ open: false, title: "", onConfirm: () => {} });
      },
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        backgroundColor: "#030712",
        color: "var(--text-main)",
        direction: "ltr",
        textAlign: "left",
        fontFamily: "var(--font-jakarta), sans-serif",
      }}
    >
      {/* Studio Left Rail Navigation */}
      <div
        style={{
          width: "250px",
          background: "#080d1a",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "1.75rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Brand Header */}
          <div style={{ padding: "0 0.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#020617",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                }}
              >
                JS
              </div>
              <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                Jalal Studio
              </span>
            </div>
          </div>

          {/* Rail Nav Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {[
              { id: "profile", label: "Profile", Icon: Icons.Profile, count: null },
              { id: "projects", label: "Projects", Icon: Icons.Projects, count: formData.projects.length },
              { id: "experience", label: "Experience", Icon: Icons.Experience, count: formData.experiences.length },
              { id: "skills", label: "Skills Matrix", Icon: Icons.Skills, count: formData.skills.length },
              { id: "system", label: "System & Sync", Icon: Icons.System, count: null },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "0.65rem 0.85rem",
                    borderRadius: "0.65rem",
                    border: "none",
                    background: isActive ? "rgba(16, 185, 129, 0.15)" : "transparent",
                    color: isActive ? "#34d399" : "var(--text-muted)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.85rem",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <tab.Icon />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span
                      style={{
                        fontSize: "0.725rem",
                        background: isActive ? "rgba(16, 185, 129, 0.25)" : "rgba(255, 255, 255, 0.06)",
                        color: isActive ? "#a7f3d0" : "var(--text-subtle)",
                        padding: "0.1rem 0.45rem",
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer controls */}
        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.25rem" }}>
          <div
            style={{
              padding: "0.65rem 0.85rem",
              borderRadius: "0.65rem",
              background: "rgba(255, 255, 255, 0.03)",
              fontSize: "0.775rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "var(--text-subtle)", fontWeight: 500 }}>Sync Status</span>
            <span style={{ fontSize: "0.725rem", color: isSynced ? "#34d399" : "#f59e0b", fontWeight: 700 }}>
              {isSynced ? "● SYNCED" : "○ LOCAL"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleLogout} style={{ ...btnDangerStyle, width: "100%", textAlign: "center", padding: "0.55rem" }}>
              Sign Out
            </button>
            <button onClick={onClose} style={{ ...btnSecondaryStyle, padding: "0.55rem 0.85rem" }}>
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "2rem 3rem" }}>
        {/* Studio Top Control Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.775rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
              <span>Studio Workspace</span>
              <span>/</span>
              <span style={{ color: "var(--accent-emerald)", fontWeight: 600 }}>Jalal / content</span>
              {saveStatus && <span style={{ color: "#34d399", fontWeight: 700, marginLeft: "0.75rem" }}>{saveStatus}</span>}
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#ffffff", letterSpacing: "-0.02em" }}>
              {activeTab === "profile" && "Profile & Hero Configuration"}
              {activeTab === "projects" && "Projects Workspace"}
              {activeTab === "experience" && "Career Timeline & Milestones"}
              {activeTab === "skills" && "Technical Skills Matrix"}
              {activeTab === "system" && "System Status & Backup Controls"}
            </h2>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={onClose} style={btnSecondaryStyle}>
              View Site
            </button>
            <button onClick={handleSaveAll} style={btnPrimaryStyle}>
              <Icons.Save />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profile & Hero */}
        {activeTab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
            {/* Identity Card */}
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={sectionHeadingStyle}>Identity &amp; Intro</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    value={formData.hero.name}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, name: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Greeting Text</label>
                  <input
                    type="text"
                    value={formData.hero.greeting}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, greeting: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Hero Intro Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.hero.description}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div>
                <label style={labelStyle}>Roles Ticker (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.hero.roles.join(", ")}
                  onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, roles: e.target.value.split(",").map(s => s.trim()) } })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Stats & Availability */}
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={sectionHeadingStyle}>Metrics &amp; Status</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={labelStyle}>Projects Metric</label>
                  <input
                    type="text"
                    value={formData.hero.projectsStat}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, projectsStat: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>AI Focus Metric</label>
                  <input
                    type="text"
                    value={formData.hero.aiStat}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, aiStat: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Web Craft Metric</label>
                  <input
                    type="text"
                    value={formData.hero.expStat}
                    onChange={(e) => setFormData({ ...formData, hero: { ...formData.hero, expStat: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                    "Available for Work" Status Badge
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hero: { ...formData.hero, availableForWork: !formData.hero.availableForWork } })}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.5rem",
                    background: formData.hero.availableForWork ? "rgba(16, 185, 129, 0.18)" : "rgba(255, 255, 255, 0.06)",
                    border: "1px solid " + (formData.hero.availableForWork ? "rgba(16, 185, 129, 0.35)" : "rgba(255, 255, 255, 0.12)"),
                    color: formData.hero.availableForWork ? "#a7f3d0" : "var(--text-muted)",
                    fontWeight: 700,
                    fontSize: "0.775rem",
                    cursor: "pointer",
                  }}
                >
                  {formData.hero.availableForWork ? "Active (Visible)" : "Inactive (Hidden)"}
                </button>
              </div>
            </div>

            {/* Contact Links */}
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={sectionHeadingStyle}>Contact Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Contact Email</label>
                  <input
                    type="text"
                    value={formData.contact.email}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>GitHub URL</label>
                  <input
                    type="text"
                    value={formData.contact.githubUrl}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, githubUrl: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.contact.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, linkedinUrl: e.target.value } })}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Projects Table / Grid Workspace */}
        {activeTab === "projects" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)" }}>
                Showing {formData.projects.length} project items
              </span>
              <button onClick={openAddProject} style={btnPrimaryStyle}>
                <Icons.Plus />
                <span>Add Project via Aside Drawer</span>
              </button>
            </div>

            {/* Data Grid Table Header */}
            <div className="glass-panel" style={{ padding: "0.85rem 1.25rem", background: "rgba(255, 255, 255, 0.02)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr 90px 180px", gap: "1rem", alignItems: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase" }}>
                <span>Preview</span>
                <span>Title &amp; Overview</span>
                <span>Category</span>
                <span>Status</span>
                <span style={{ textAlign: "right" }}>Actions</span>
              </div>
            </div>

            {/* Projects Rows */}
            {formData.projects.map((proj, pIdx) => {
              const displayImg = proj.imageUrl || proj.demoUrl;
              return (
                <div
                  key={proj.id}
                  className="glass-panel"
                  style={{
                    padding: "1rem 1.25rem",
                    opacity: proj.hidden ? 0.55 : 1,
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr 90px 180px", gap: "1rem", alignItems: "center" }}>
                    {/* Preview Thumbnail */}
                    <div>
                      {displayImg ? (
                        <img src={displayImg} alt="" style={{ width: 50, height: 42, borderRadius: "0.5rem", objectFit: "cover", border: "1px solid rgba(255,255,255,0.15)" }} />
                      ) : (
                        <div style={{ width: 50, height: 42, borderRadius: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "var(--text-subtle)" }}>
                          No Img
                        </div>
                      )}
                    </div>

                    {/* Title & Overview */}
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>{proj.title}</h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0.15rem 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{proj.description}</p>
                    </div>

                    {/* Category */}
                    <div>
                      <span className="glass-pill" style={{ fontSize: "0.725rem", padding: "0.2rem 0.6rem" }}>
                        {proj.category === "ai" ? "AI & RAG" : "Web App"}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        style={{
                          fontSize: "0.725rem",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.4rem",
                          fontWeight: 600,
                          background: proj.hidden ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
                          color: proj.hidden ? "#fca5a5" : "#a7f3d0",
                        }}
                      >
                        {proj.hidden ? "Hidden" : "Live"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.35rem" }}>
                      <button onClick={() => moveItem("projects", pIdx, pIdx - 1)} disabled={pIdx === 0} title="Move Up" style={iconBtnStyle}><Icons.Up /></button>
                      <button onClick={() => moveItem("projects", pIdx, pIdx + 1)} disabled={pIdx === formData.projects.length - 1} title="Move Down" style={iconBtnStyle}><Icons.Down /></button>
                      <button onClick={() => toggleVisibility("projects", pIdx)} title={proj.hidden ? "Show" : "Hide"} style={iconBtnStyle}>{proj.hidden ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                      <button onClick={() => openEditProject(pIdx)} style={{ ...iconBtnStyle, color: "var(--accent-emerald)" }} title="Edit Aside"><Icons.Edit /></button>
                      <button
                        onClick={() => triggerDeleteConfirm(proj.title, () => setFormData({ ...formData, projects: formData.projects.filter((_, idx) => idx !== pIdx) }))}
                        style={{ ...iconBtnStyle, color: "#fca5a5" }}
                        title="Delete"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Experience Workspace */}
        {activeTab === "experience" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)" }}>
                {formData.experiences.length} Experience items
              </span>
              <button onClick={openAddExperience} style={btnPrimaryStyle}>
                <Icons.Plus />
                <span>Add Milestone via Aside Drawer</span>
              </button>
            </div>

            {formData.experiences.map((exp, eIdx) => (
              <div key={exp.id} className="glass-panel" style={{ padding: "1.25rem", opacity: exp.hidden ? 0.55 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>{exp.role}</h4>
                      <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 600 }}>@ {exp.company}</span>
                      {exp.hidden && <span style={{ fontSize: "0.7rem", background: "rgba(239,68,68,0.15)", color: "#fca5a5", padding: "0.1rem 0.4rem", borderRadius: "0.3rem" }}>Hidden</span>}
                    </div>
                    <span style={{ fontSize: "0.775rem", color: "var(--text-subtle)" }}>{exp.period}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <button onClick={() => moveItem("experiences", eIdx, eIdx - 1)} disabled={eIdx === 0} style={iconBtnStyle}><Icons.Up /></button>
                    <button onClick={() => moveItem("experiences", eIdx, eIdx + 1)} disabled={eIdx === formData.experiences.length - 1} style={iconBtnStyle}><Icons.Down /></button>
                    <button onClick={() => toggleVisibility("experiences", eIdx)} style={iconBtnStyle}>{exp.hidden ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                    <button onClick={() => openEditExperience(eIdx)} style={{ ...iconBtnStyle, color: "var(--accent-emerald)" }}><Icons.Edit /></button>
                    <button
                      onClick={() => triggerDeleteConfirm(`${exp.role} @ ${exp.company}`, () => setFormData({ ...formData, experiences: formData.experiences.filter((_, idx) => idx !== eIdx) }))}
                      style={{ ...iconBtnStyle, color: "#fca5a5" }}
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Skills Matrix Workspace */}
        {activeTab === "skills" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-subtle)" }}>
                {formData.skills.length} Technical Skills
              </span>
              <button onClick={openAddSkill} style={btnPrimaryStyle}>
                <Icons.Plus />
                <span>Add Skill via Aside Drawer</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {formData.skills.map((sk, sIdx) => (
                <div key={sIdx} className="glass-panel" style={{ padding: "1rem 1.25rem", opacity: sk.hidden ? 0.55 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#ffffff" }}>{sk.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>({sk.category})</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <button onClick={() => toggleVisibility("skills", sIdx)} style={iconBtnStyle}>{sk.hidden ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                      <button onClick={() => openEditSkill(sIdx)} style={{ ...iconBtnStyle, color: "var(--accent-emerald)" }}><Icons.Edit /></button>
                      <button
                        onClick={() => triggerDeleteConfirm(sk.name, () => setFormData({ ...formData, skills: formData.skills.filter((_, idx) => idx !== sIdx) }))}
                        style={{ ...iconBtnStyle, color: "#fca5a5" }}
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${sk.level || 85}%`, height: "100%", background: "var(--accent-emerald)" }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-emerald)" }}>{sk.level || 85}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: System Status & Backups */}
        {activeTab === "system" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
            <div className="glass-panel" style={{ padding: "1.75rem" }}>
              <h3 style={sectionHeadingStyle}>System Diagnostics &amp; Data Backups</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Export structured JSON backups or restore data into Firestore collection <code style={{ color: "var(--accent-emerald)" }}>Jalal</code>.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={handleExportJSON} style={btnSecondaryStyle}>
                  Export JSON Backup
                </button>

                <label style={{ ...btnSecondaryStyle, cursor: "pointer" }}>
                  Import JSON Backup
                  <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: "none" }} />
                </label>

                <button
                  onClick={() => triggerDeleteConfirm("All custom changes (Reset to Seed Defaults)", () => resetToDefaults())}
                  style={btnDangerStyle}
                >
                  Reset to Seed Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-Over Aside Drawer */}
      {asideOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "rgba(2, 6, 23, 0.75)",
            backdropFilter: "blur(16px)",
          }}
          onClick={() => setAsideOpen(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "100vh",
              borderRadius: 0,
              padding: "2rem",
              overflowY: "auto",
              borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "-15px 0 50px rgba(0,0,0,0.85)",
              animation: "slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <span className="glass-pill" style={{ fontSize: "0.725rem", padding: "0.15rem 0.5rem" }}>
                  {asideMode === "add" ? "Create Mode" : "Edit Mode"}
                </span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0.3rem 0 0", color: "#ffffff" }}>
                  {asideType === "project" && (asideMode === "add" ? "Add Project" : "Edit Project Specs")}
                  {asideType === "experience" && (asideMode === "add" ? "Add Career Milestone" : "Edit Experience")}
                  {asideType === "skill" && (asideMode === "add" ? "Add Technical Skill" : "Edit Skill")}
                </h3>
              </div>

              <button onClick={() => setAsideOpen(false)} style={iconBtnStyle}>
                ✕
              </button>
            </div>

            {/* Project Drawer Form */}
            {asideType === "project" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={labelStyle}>Project Title</label>
                  <input
                    type="text"
                    value={draftProject.title}
                    onChange={(e) => setDraftProject({ ...draftProject, title: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={draftProject.category}
                    onChange={(e) => setDraftProject({ ...draftProject, category: e.target.value as any })}
                    style={inputStyle}
                  >
                    <option value="ai">AI &amp; RAG</option>
                    <option value="web">Web Application</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tech Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={draftProject.tags.join(", ")}
                    onChange={(e) => setDraftProject({ ...draftProject, tags: e.target.value.split(",").map(t => t.trim()) })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Overview Description</label>
                  <textarea
                    rows={2}
                    value={draftProject.description}
                    onChange={(e) => setDraftProject({ ...draftProject, description: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Full Architectural Specs (Modal View)</label>
                  <textarea
                    rows={3}
                    value={draftProject.fullDescription || ""}
                    onChange={(e) => setDraftProject({ ...draftProject, fullDescription: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Key Features (One per line)</label>
                  <textarea
                    rows={3}
                    value={(draftProject.features || []).join("\n")}
                    onChange={(e) => setDraftProject({ ...draftProject, features: e.target.value.split("\n").filter(s => s.trim().length > 0) })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Project Image (Base64 Upload or Image URL)</label>
                  <input type="file" accept="image/*" onChange={handleImageFile} style={{ ...inputStyle, padding: "0.4rem", marginBottom: "0.4rem" }} />
                  <input
                    type="text"
                    placeholder="https://..."
                    value={draftProject.imageUrl || draftProject.demoUrl || ""}
                    onChange={(e) => setDraftProject({ ...draftProject, imageUrl: e.target.value })}
                    style={inputStyle}
                  />
                  {(draftProject.imageUrl || draftProject.demoUrl) && (
                    <div style={{ marginTop: "0.6rem", width: "100%", height: 110, borderRadius: "0.65rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
                      <img src={draftProject.imageUrl || draftProject.demoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.85rem" }}>
                  <button onClick={saveProjectDrawer} style={btnPrimaryStyle}>
                    Save to Workspace
                  </button>
                  <button onClick={() => setAsideOpen(false)} style={btnSecondaryStyle}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Experience Drawer Form */}
            {asideType === "experience" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={labelStyle}>Role Title</label>
                  <input
                    type="text"
                    value={draftExperience.role}
                    onChange={(e) => setDraftExperience({ ...draftExperience, role: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={draftExperience.company}
                      onChange={(e) => setDraftExperience({ ...draftExperience, company: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Period</label>
                    <input
                      type="text"
                      value={draftExperience.period}
                      onChange={(e) => setDraftExperience({ ...draftExperience, period: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Role Overview</label>
                  <textarea
                    rows={2}
                    value={draftExperience.description}
                    onChange={(e) => setDraftExperience({ ...draftExperience, description: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Highlights (One per line)</label>
                  <textarea
                    rows={3}
                    value={draftExperience.highlights.join("\n")}
                    onChange={(e) => setDraftExperience({ ...draftExperience, highlights: e.target.value.split("\n").filter(s => s.trim().length > 0) })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.85rem" }}>
                  <button onClick={saveExperienceDrawer} style={btnPrimaryStyle}>
                    Save Milestone
                  </button>
                  <button onClick={() => setAsideOpen(false)} style={btnSecondaryStyle}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Skill Drawer Form */}
            {asideType === "skill" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={labelStyle}>Skill Name</label>
                  <input
                    type="text"
                    value={draftSkill.name}
                    onChange={(e) => setDraftSkill({ ...draftSkill, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Category</label>
                  <select
                    value={draftSkill.category}
                    onChange={(e) => setDraftSkill({ ...draftSkill, category: e.target.value as any })}
                    style={inputStyle}
                  >
                    <option value="ai">AI &amp; Data</option>
                    <option value="frontend">Front-End</option>
                    <option value="tools">Engineering &amp; Tools</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Proficiency Level ({draftSkill.level || 85}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={draftSkill.level || 85}
                    onChange={(e) => setDraftSkill({ ...draftSkill, level: parseInt(e.target.value) || 0 })}
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.85rem" }}>
                  <button onClick={saveSkillDrawer} style={btnPrimaryStyle}>
                    Save Skill
                  </button>
                  <button onClick={() => setAsideOpen(false)} style={btnSecondaryStyle}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {confirmDeleteModal.open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(2, 6, 23, 0.85)",
            backdropFilter: "blur(20px)",
            padding: "1rem",
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "1.75rem",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.4rem" }}>
              Confirm Deletion
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.5 }}>
              Are you sure you want to delete <strong style={{ color: "#fca5a5" }}>"{confirmDeleteModal.title}"</strong>?
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button
                onClick={() => setConfirmDeleteModal({ open: false, title: "", onConfirm: () => {} })}
                style={btnSecondaryStyle}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteModal.onConfirm}
                style={{ ...btnDangerStyle, padding: "0.65rem 1.25rem" }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 800,
  marginBottom: "1.1rem",
  color: "var(--accent-emerald)",
  letterSpacing: "-0.01em",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.775rem",
  color: "var(--text-muted)",
  marginBottom: "0.3rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.8rem",
  borderRadius: "0.55rem",
  background: "#0f172a",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  color: "#ffffff",
  fontSize: "0.85rem",
  outline: "none",
  colorScheme: "dark",
};


const btnPrimaryStyle: React.CSSProperties = {
  padding: "0.65rem 1.2rem",
  borderRadius: "0.65rem",
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  border: "none",
  color: "#020617",
  fontWeight: 700,
  fontSize: "0.825rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
};

const btnSecondaryStyle: React.CSSProperties = {
  padding: "0.65rem 1.1rem",
  borderRadius: "0.65rem",
  background: "rgba(255, 255, 255, 0.06)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  color: "var(--text-main)",
  fontWeight: 600,
  fontSize: "0.825rem",
  cursor: "pointer",
};

const btnDangerStyle: React.CSSProperties = {
  padding: "0.55rem 0.9rem",
  borderRadius: "0.65rem",
  background: "rgba(239, 68, 68, 0.15)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#fca5a5",
  fontWeight: 700,
  fontSize: "0.825rem",
  cursor: "pointer",
};

const iconBtnStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "var(--text-muted)",
  width: "28px",
  height: "28px",
  borderRadius: "0.45rem",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};
