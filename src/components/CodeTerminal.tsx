"use client";

import React, { useState, useEffect } from "react";

interface CodeTerminalProps {
  className?: string;
}

const FULL_CODE_LINES = [
  { text: 'class JalalAgent(BaseAI):', indent: 0, type: 'classdef' },
  { text: '', indent: 0, type: 'empty' },
  { text: '    role = "AI & Web Engineer"', indent: 1, type: 'assignment' },
  { text: '', indent: 0, type: 'empty' },
  { text: '    core_stack = [', indent: 1, type: 'liststart' },
  { text: '        "Python / RAG", "React.js",', indent: 2, type: 'listitem' },
  { text: '        "Next.js", "FastAPI"', indent: 2, type: 'listitem' },
  { text: '    ]', indent: 1, type: 'listend' },
  { text: '', indent: 0, type: 'empty' },
  { text: '', indent: 0, type: 'empty' },
  { text: '    def solve_problem(self, prompt):', indent: 1, type: 'funcdef' },
  { text: '        return self.rag_engine.query(', indent: 2, type: 'returnstatement' },
  { text: '            prompt, precision=0.99', indent: 3, type: 'args' },
  { text: '        )', indent: 2, type: 'returnend' },
];

export default function CodeTerminal({ className = "" }: CodeTerminalProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const resetAnimation = () => {
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setCompletedLines([]);
    setCurrentLineText("");
    setIsDone(false);
  };

  useEffect(() => {
    if (currentLineIndex >= FULL_CODE_LINES.length) {
      setIsDone(true);
      return;
    }

    const targetLine = FULL_CODE_LINES[currentLineIndex].text;

    if (targetLine === "") {
      // Empty line, quickly jump
      setCompletedLines((prev) => [...prev, ""]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      setCurrentLineText("");
      return;
    }

    if (currentCharIndex < targetLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLineText(targetLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex((prev) => prev + 1);
      }, 22); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line finished
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, targetLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setCurrentLineText("");
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Syntax highlighter helper
  const renderSyntaxHighlighted = (lineText: string) => {
    if (!lineText) return <span>&nbsp;</span>;

    // Custom syntax highlights
    if (lineText.includes("class JalalAgent")) {
      return (
        <>
          <span style={{ color: "#f472b6", fontWeight: 700 }}>class</span>{" "}
          <span style={{ color: "#fbbf24", fontWeight: 700 }}>JalalAgent</span>(
          <span style={{ color: "#60a5fa" }}>BaseAI</span>):
        </>
      );
    }
    if (lineText.includes("role =")) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#60a5fa" }}>role</span> ={" "}
          <span style={{ color: "#34d399" }}>"AI &amp; Web Engineer"</span>
        </>
      );
    }
    if (lineText.includes("core_stack = [")) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#60a5fa" }}>core_stack</span> = [
        </>
      );
    }
    if (lineText.includes('"Python / RAG"')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#34d399" }}>"Python / RAG"</span>,{" "}
          <span style={{ color: "#34d399" }}>"React.js"</span>,
        </>
      );
    }
    if (lineText.includes('"Next.js"')) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#34d399" }}>"Next.js"</span>,{" "}
          <span style={{ color: "#34d399" }}>"FastAPI"</span>
        </>
      );
    }
    if (lineText.trim() === "]") {
      return <>&nbsp;&nbsp;&nbsp;&nbsp;]</>;
    }
    if (lineText.includes("def solve_problem")) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#f472b6", fontWeight: 700 }}>def</span>{" "}
          <span style={{ color: "#fbbf24", fontWeight: 700 }}>solve_problem</span>(
          <span style={{ color: "#94a3b8" }}>self, prompt</span>):
        </>
      );
    }
    if (lineText.includes("return self.rag_engine.query(")) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#f472b6", fontWeight: 700 }}>return</span>{" "}
          <span style={{ color: "#94a3b8" }}>self.rag_engine.</span>
          <span style={{ color: "#38bdf8" }}>query</span>(
        </>
      );
    }
    if (lineText.includes("prompt, precision=0.99")) {
      return (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "#cbd5e1" }}>prompt</span>,{" "}
          <span style={{ color: "#f59e0b" }}>precision</span>=
          <span style={{ color: "#a7f3d0" }}>0.99</span>
        </>
      );
    }
    if (lineText.trim() === ")") {
      return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</>;
    }

    return <span>{lineText}</span>;
  };

  return (
    <div
      className={className}
      style={{
        background: "rgba(11, 15, 25, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.15)",
        borderRadius: "1.5rem",
        overflow: "hidden",
        direction: "ltr",
        textAlign: "left",
        fontFamily: "'Fira Code', Consolas, Monaco, monospace",
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.85rem 1.25rem",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
          <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)", marginLeft: "0.5rem" }}>
            jalal_agent.py
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#a7f3d0",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span className="pulse-dot" style={{ width: 6, height: 6 }} />
            {isDone ? "SYSTEM READY" : "TYPING AGENT CODE..."}
          </span>

          <button
            onClick={resetAnimation}
            title="Replay Code Animation"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text-muted)",
              borderRadius: "50%",
              width: "26px",
              height: "26px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ↺
          </button>
        </div>
      </div>

      {/* Terminal Body with Line Numbers & Live Stream */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          fontSize: "0.875rem",
          lineHeight: 1.8,
          minHeight: "360px",
          display: "flex",
        }}
      >
        {/* Line Numbers Sidebar */}
        <div
          style={{
            userSelect: "none",
            color: "rgba(255, 255, 255, 0.2)",
            paddingRight: "1.25rem",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            marginRight: "1.25rem",
            textAlign: "right",
          }}
        >
          {FULL_CODE_LINES.map((_, idx) => (
            <div key={idx} style={{ height: "1.8em" }}>
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code Lines Output */}
        <div style={{ width: "100%", overflowX: "auto" }}>
          {completedLines.map((lineText, idx) => (
            <div key={idx} style={{ height: "1.8em", whiteSpace: "pre" }}>
              {renderSyntaxHighlighted(lineText)}
            </div>
          ))}

          {!isDone && (
            <div style={{ height: "1.8em", whiteSpace: "pre", display: "flex", alignItems: "center" }}>
              {renderSyntaxHighlighted(currentLineText)}
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "1.1em",
                  backgroundColor: "#10b981",
                  marginLeft: "2px",
                  boxShadow: "0 0 8px #10b981",
                  animation: "blink 0.8s infinite",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
