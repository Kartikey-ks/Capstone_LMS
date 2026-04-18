import { useState } from "react";
import roadmaps from "../../assets/roadmapsData.js";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─── SIDEBAR ITEM ─────────────────────────────────────────────────────────────
function SidebarItem({ rm, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        width: "100%", padding: "10px 14px", borderRadius: 10,
        background: active ? rm.color : "transparent",
        border: active ? "none" : "1.5px solid transparent",
        color: active ? "#fff" : "#444",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: active ? 600 : 400,
        cursor: "pointer", textAlign: "left", transition: "all 0.15s ease",
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f3f3f3"; e.currentTarget.style.color = "#111"; }}}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#444"; }}}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>{rm.icon}</span>
      <span>{rm.title}</span>
    </button>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ section, index, total, color }) {
  const isProject = section.type === "project";
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      {/* Left: Step number + spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isProject ? "#1a1a1a" : color,
          color: "#fff", fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 700,
          zIndex: 1, position: "relative",
          boxShadow: `0 0 0 4px white, 0 0 0 5px ${isProject ? "#1a1a1a" : color}33`,
        }}>
          {index + 1}
        </div>
        {index < total - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: "#e2e2e2", marginTop: 4 }} />
        )}
      </div>

      {/* Right: Card */}
      <div style={{ flex: 1, paddingLeft: 16, paddingBottom: index < total - 1 ? 24 : 0 }}>
        <div
          style={{
            borderRadius: 12,
            border: isProject ? "1.5px solid #1a1a1a" : `1.5px solid ${color}44`,
            background: isProject ? "#1a1a1a" : `rgba(${hexToRgb(color)}, 0.05)`,
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isProject && (
                <span style={{ background: "#fff", color: "#1a1a1a", fontSize: 10, fontWeight: 700,
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
                  padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>
                  PROJECT
                </span>
              )}
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                color: isProject ? "#fff" : "#111",
              }}>
                {section.title}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 12, fontFamily: "'DM Mono', monospace",
                color: isProject ? "#ffffff88" : "#99999a",
                background: isProject ? "#ffffff11" : "#0000000a",
                padding: "2px 8px", borderRadius: 20,
              }}>
                {section.items.length} {isProject ? "ideas" : "topics"}
              </span>
              <span style={{ color: isProject ? "#ffffff88" : "#aaa", fontSize: 14, transition: "transform 0.2s",
                display: "block", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
            </div>
          </button>

          {/* Card Body */}
          {expanded && (
            <div style={{
              padding: "0 18px 16px",
              borderTop: isProject ? "1px solid #333" : `1px solid ${color}22`,
              display: "grid",
              gridTemplateColumns: section.items.length > 5 ? "1fr 1fr" : "1fr",
              gap: "6px 24px",
              paddingTop: 14,
            }}>
              {section.items.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0, marginTop: 7,
                    background: isProject ? color : color,
                    opacity: isProject ? 0.9 : 0.7,
                  }} />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13.5,
                    color: isProject ? "#d4d4d4" : "#333",
                    lineHeight: 1.6,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── LEGEND ───────────────────────────────────────────────────────────────────
function Legend({ color }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: `rgba(${hexToRgb(color)},0.12)`, border: `1.5px solid ${color}55` }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#666" }}>Key topics to learn</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: "#1a1a1a" }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#666" }}>Project checkpoints</span>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function RoadmapViewer() {
  const [activeSlug, setActiveSlug] = useState("fullstack");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const rm = roadmaps.find(r => r.slug === activeSlug);

  const keyCount = rm.sections.filter(s => s.type === "key").length;
  const projectCount = rm.sections.filter(s => s.type === "project").length;
  const topicCount = rm.sections.flatMap(s => s.items).length;

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif",
      background: "#fafafa", overflow: "hidden",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
      `}</style>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? 220 : 0, minWidth: sidebarOpen ? 220 : 0,
        background: "#fff", borderRight: "1px solid #ebebeb",
        overflow: "hidden", transition: "all 0.25s ease", flexShrink: 0,
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "20px 14px 12px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700,
            color: "#999", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            Learning Paths
          </div>
          <div style={{ fontSize: 12, color: "#bbb", fontFamily: "'DM Sans', sans-serif" }}>
            {roadmaps.length} tracks
          </div>
        </div>
        <div style={{ padding: "10px 8px", overflowY: "auto", flex: 1 }}>
          {roadmaps.map(r => (
            <SidebarItem key={r.slug} rm={r} active={activeSlug === r.slug} onClick={() => setActiveSlug(r.slug)} />
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header bar */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #ebebeb",
          padding: "14px 28px", display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
        }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: "none", border: "1px solid #e0e0e0", borderRadius: 8,
              padding: "6px 10px", cursor: "pointer", fontSize: 16, color: "#666",
              display: "flex", alignItems: "center" }}
          >
            ☰
          </button>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: rm.color, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>
            {rm.icon}
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#111" }}>
              {rm.title}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888" }}>
              {rm.short}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {[
              { label: "Topics", val: topicCount },
              { label: "Sections", val: keyCount },
              { label: "Checkpoints", val: projectCount },
            ].map(stat => (
              <div key={stat.label} style={{
                textAlign: "center", padding: "6px 14px", borderRadius: 8,
                background: "#f5f5f5", border: "1px solid #ebebeb",
              }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 15,
                  color: rm.color }}>{stat.val}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#999" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          <Legend color={rm.color} />

          {rm.sections.map((section, i) => (
            <SectionCard
              key={`${activeSlug}-${i}`}
              section={section}
              index={i}
              total={rm.sections.length}
              color={rm.color}
            />
          ))}

          <div style={{ height: 48 }} />
        </div>
      </div>
    </div>
  );
}