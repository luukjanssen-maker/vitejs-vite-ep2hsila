import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const QUARTERS = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026", "Q1 2027"];
const QUARTER_META = {
  "Q1 2026": { short: "Q1", period: "jan – mrt", year: "2026" },
  "Q2 2026": { short: "Q2", period: "apr – jun", year: "2026" },
  "Q3 2026": { short: "Q3", period: "jul – sep", year: "2026" },
  "Q4 2026": { short: "Q4", period: "okt – dec", year: "2026" },
  "Q1 2027": { short: "Q1", period: "jan – mrt", year: "2027" },
};
const CURRENT_Q = "Q1 2026";

const products = [
  {
    id: "scanstreet",
    name: "ScanStreet Next",
    color: "#1E50C8",
    light: "#EEF3FD",
    items: [
      { id: 1, name: "UBL Documentherkenning", desc: "Geautomatiseerde herkenning en verwerking van documenten in UBL-formaat.", quarter: "Q1 2026", status: "delivered" },
      { id: 2, name: "Automatisch Splitsen & Classificeren", desc: "Intelligent splitsen en classificeren van zowel enkelvoudige als meerpagina-documenten.", quarter: "Q2 2026", status: "in-progress" },
      { id: 3, name: "Verbeterd Documentbegrip", desc: "Geavanceerde AI-gedreven inhoudsanalyse voor betere interpretatie van documenten.", quarter: "Q2 2026", status: "in-progress" },
      { id: 4, name: "AI-gestuurde Slimme Instructies", desc: "Door AI gegenereerde verwerkingsinstructies met experimenteeromgeving in het beheerportaal.", quarter: "Q2 2026", status: "planned" },
    ],
  },
  {
    id: "lyanthe",
    name: "Lyanthe Next",
    color: "#0C9268",
    light: "#EDFAF4",
    items: [
      { id: 5, name: "Gebruikersbeheer & Migratie", desc: "Volledig gebruikersbeheer inclusief naadloze migratie van bestaande accounts en koppelingen.", quarter: "Q2 2026", status: "in-progress" },
      { id: 6, name: "Slimme Brievenbus", desc: "Centrale brievenbus met Auto Boeksuggestie voor moeiteloze verwerking van inkomende documenten.", quarter: "Q3 2026", status: "planned" },
      { id: 7, name: "Robotics Platform", desc: "Volledig automatiseringsplatform met Auto Regelsuggestie — voor intelligente, regelgebaseerde documentworkflows. Functies worden stapsgewijs uitgerold.", quarter: "Q1 2027", status: "planned" },
    ],
  },
  {
    id: "insights",
    name: "Data & Insights",
    color: "#B45309",
    light: "#FEF9EE",
    items: [
      { id: 8, name: "Auto Verify Dashboard", desc: "Realtime dashboard met duidelijk inzicht in het geautomatiseerde verificatieproces.", quarter: "Q2 2026", status: "in-progress" },
      { id: 9, name: "Geavanceerde Analyse & Rapportage", desc: "Diepgaande analysemogelijkheden ter ondersteuning van datagedreven besluitvorming op de lange termijn.", quarter: "Q2 2026", status: "planned" },
    ],
  },
];

const STATUS = {
  delivered:     { label: "Opgeleverd",      bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
  "in-progress": { label: "In ontwikkeling", bg: "#DBEAFE", color: "#1E40AF", dot: "#3B82F6" },
  planned:       { label: "Gepland",         bg: "#F1F5F9", color: "#475569", dot: "#94A3B8" },
};

const N = QUARTERS.length;
const pct = (i) => `${(i / N) * 100}%`;
const pctW = `${(1 / N) * 100}%`;

// ─── StatusPill ──────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const s = STATUS[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color,
      borderRadius: 20, fontSize: 10.5, fontWeight: 700,
      padding: "2px 9px", whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {s.label}
    </span>
  );
}

// ─── GanttBar ────────────────────────────────────────────────────────────────
function GanttBar({ status, qIndex, color }) {
  const [hov, setHov] = useState(false);
  const isD = status === "delivered";
  const isA = status === "in-progress";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "absolute",
        left: `calc(${pct(qIndex)} + 8px)`,
        width: `calc(${pctW} - 16px)`,
        top: "50%", transform: `translateY(-50%)`,
        height: hov ? 30 : 26,
        borderRadius: 7,
        transition: "height 0.15s, box-shadow 0.15s",
        background: isD
          ? `linear-gradient(90deg, ${color} 0%, ${color}BB 100%)`
          : isA
          ? `repeating-linear-gradient(55deg, ${color}E0 0px, ${color}E0 7px, ${color}70 7px, ${color}70 13px)`
          : `${color}38`,
        border: `1.5px solid ${color}${isD ? "FF" : isA ? "AA" : "50"}`,
        boxShadow: hov ? `0 4px 14px ${color}40` : isD ? `0 2px 6px ${color}30` : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "default", zIndex: 2,
        overflow: "hidden",
      }}
    >
      {isD && <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "0.02em" }}>✓ Opgeleverd</span>}
      {isA && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>● In ontwikkeling</span>}
    </div>
  );
}

// ─── FeatureRow ──────────────────────────────────────────────────────────────
function FeatureRow({ item, color, light, isLast }) {
  const [open, setOpen] = useState(false);
  const qi = QUARTERS.indexOf(item.quarter);
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid #F1F5F9" }}>
      <div style={{ display: "flex", minHeight: 58 }}>
        {/* Left: name */}
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: 230, flexShrink: 0,
            padding: "12px 14px 12px 16px",
            borderRight: "1px solid #F1F5F9",
            cursor: "pointer",
            background: open ? light : "transparent",
            transition: "background 0.15s",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <span style={{ color: open ? color : "#CBD5E1", fontSize: 9, marginTop: 2, flexShrink: 0, transition: "color 0.15s" }}>
              {open ? "▾" : "▸"}
            </span>
            <p style={{
              margin: 0, fontFamily: "'DM Sans', sans-serif",
              fontSize: 12.5, fontWeight: 600, color: "#1E293B", lineHeight: 1.35,
            }}>
              {item.name}
            </p>
          </div>
          <div style={{ paddingLeft: 14 }}>
            <StatusPill status={item.status} />
          </div>
        </div>

        {/* Right: Gantt */}
        <div style={{ flex: 1, position: "relative" }}>
          {/* Column BGs */}
          {QUARTERS.map((q, i) => (
            <div key={q} style={{
              position: "absolute", top: 0, bottom: 0,
              left: pct(i), width: pctW,
              background: q === CURRENT_Q
                ? "rgba(250,204,21,0.07)"
                : q === "Q1 2027"
                ? "rgba(251,191,36,0.04)"
                : i % 2 === 0 ? "rgba(0,0,0,0.008)" : "transparent",
              borderLeft: i > 0 ? "1px solid #F1F5F9" : "none",
            }} />
          ))}
          {qi >= 0 && <GanttBar status={item.status} qIndex={qi} color={color} />}
        </div>
      </div>

      {/* Expanded description */}
      {open && (
        <div style={{
          padding: "10px 16px 12px 46px",
          background: light,
          borderTop: `1px solid ${color}22`,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5, color: "#475569", lineHeight: 1.65,
          borderLeft: `3px solid ${color}`,
        }}>
          {item.desc}
        </div>
      )}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function Roadmap() {
  const [filter, setFilter] = useState("Alles");
  const shown = filter === "Alles" ? products : products.filter(p => p.name === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#EEF0F6", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #080F20 0%, #0D1D47 55%, #163070 100%)",
        padding: "50px 52px 42px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -80, top: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", right: 60, top: 50, width: 190, height: 190, borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 28 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 20, padding: "4px 13px", marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
              <span style={{ color: "#BBF7D0", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Product Roadmap 2026</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Wat staat er op de planning?
            </h1>
            <p style={{ margin: "14px 0 0", color: "#93C5FD", fontSize: 14.5, fontWeight: 300, maxWidth: 480, lineHeight: 1.7 }}>
              Een overzicht van geplande functies en verbeteringen in ons productportfolio. Klik op een feature voor meer informatie.
            </p>
          </div>

          {/* Legend */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 22px", minWidth: 200 }}>
            <p style={{ margin: "0 0 12px", color: "#93C5FD", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em" }}>Legenda</p>
            {[
              { bar: "linear-gradient(90deg,#10B981,#10B981BB)", border: "#10B981", text: "Opgeleverd" },
              { bar: "repeating-linear-gradient(55deg,#3B82F6 0,#3B82F6 6px,#93C5FD 6px,#93C5FD 11px)", border: "#3B82F6", text: "In ontwikkeling" },
              { bar: "#94A3B838", border: "#94A3B8", text: "Gepland" },
              { bar: "rgba(250,204,21,0.2)", border: "#FACC15", text: "Huidig kwartaal" },
            ].map(({ bar, border, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                <span style={{ width: 24, height: 10, borderRadius: 3, background: bar, border: `1.5px solid ${border}`, flexShrink: 0 }} />
                <span style={{ color: text === "Huidig kwartaal" ? "#FDE68A" : "#E2E8F0", fontSize: 12.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 52px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", gap: 2 }}>
          {["Alles", ...products.map(p => p.name)].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: "none", border: "none",
              borderBottom: filter === f ? "2.5px solid #1E50C8" : "2.5px solid transparent",
              padding: "14px 18px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              fontWeight: filter === f ? 700 : 500,
              color: filter === f ? "#1E50C8" : "#64748B",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s",
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "32px 52px 60px" }}>

        {/* Quarter header */}
        <div style={{ display: "flex", marginBottom: 12 }}>
          <div style={{ width: 230, flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex" }}>
            {QUARTERS.map((q, i) => {
              const isCur = q === CURRENT_Q;
              const is27 = q === "Q1 2027";
              return (
                <div key={q} style={{
                  flex: 1, textAlign: "center", padding: "10px 8px 11px",
                  background: isCur ? "rgba(250,204,21,0.1)" : is27 ? "#FEF9EE" : "#fff",
                  borderTop: `3px solid ${isCur ? "#FACC15" : is27 ? "#FCD34D" : "#E2E8F0"}`,
                  borderLeft: i > 0 ? "1px solid #E2E8F0" : "1px solid #E2E8F0",
                  borderRight: "1px solid #E2E8F0",
                  borderBottom: "1px solid #E2E8F0",
                  borderRadius: i === 0 ? "8px 0 0 0" : i === N - 1 ? "0 8px 0 0" : "0",
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: isCur ? "#78350F" : is27 ? "#92400E" : "#0F172A" }}>
                    {QUARTER_META[q].short}{" "}
                    <span style={{ fontSize: 12, fontWeight: 500, color: isCur ? "#92400E" : "#94A3B8" }}>{QUARTER_META[q].year}</span>
                  </div>
                  <div style={{ fontSize: 11, color: isCur ? "#B45309" : "#94A3B8", fontWeight: 500, marginTop: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    {QUARTER_META[q].period}
                    {isCur && <span style={{ background: "#FACC15", color: "#78350F", borderRadius: 8, padding: "1px 7px", fontSize: 9.5, fontWeight: 800 }}>NU</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product blocks */}
        {shown.map(product => (
          <div key={product.id} style={{ marginBottom: 16, background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
            {/* Product title row */}
            <div style={{ display: "flex", borderBottom: "2px solid #F1F5F9" }}>
              <div style={{ width: 230, flexShrink: 0, padding: "13px 16px", background: product.light, borderRight: `4px solid ${product.color}`, display: "flex", alignItems: "center" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: product.color }}>
                  {product.name}
                </span>
              </div>
              {/* Quarter column headers (subtle) */}
              <div style={{ flex: 1, display: "flex" }}>
                {QUARTERS.map((q, i) => (
                  <div key={q} style={{
                    flex: 1, height: "100%",
                    background: q === CURRENT_Q ? "rgba(250,204,21,0.07)" : q === "Q1 2027" ? "rgba(251,191,36,0.04)" : "transparent",
                    borderLeft: i > 0 ? "1px solid #F1F5F9" : "none",
                  }} />
                ))}
              </div>
            </div>

            {/* Feature rows */}
            {product.items.map((item, idx) => (
              <FeatureRow key={item.id} item={item} color={product.color} light={product.light} isLast={idx === product.items.length - 1} />
            ))}
          </div>
        ))}

        {/* Disclaimer */}
        <div style={{ marginTop: 40, background: "#FFFBEB", border: "1.5px solid #FCD34D", borderRadius: 14, padding: "20px 24px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ margin: "0 0 6px", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 700, color: "#92400E" }}>Belangrijke disclaimer</p>
            <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#78350F", lineHeight: 1.7 }}>
              Deze roadmap is uitsluitend bedoeld ter informatie en weerspiegelt onze huidige ontwikkelingsplannen.
              Alle geplande functies, tijdlijnen en opleveringskwartalen zijn <strong>indicatief en onder voorbehoud van wijzigingen</strong> zonder voorafgaande kennisgeving.
              Prioriteiten kunnen verschuiven op basis van technische bevindingen, klantfeedback, regelgeving of andere bedrijfsoverwegingen.
              De beschreven functionaliteiten vormen geen contractuele verplichting. Voor vragen kunt u contact opnemen met uw accountmanager.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, borderTop: "1px solid #E2E8F0", paddingTop: 20 }}>
          <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "#94A3B8" }}>
            © 2026 · Vertrouwelijk — uitsluitend voor klantgebruik · Laatst bijgewerkt: maart 2026
          </p>
          <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "#94A3B8" }}>
            Klik op een feature voor toelichting · Q1 = jan–mrt · Q2 = apr–jun · Q3 = jul–sep · Q4 = okt–dec
          </p>
        </div>
      </div>
    </div>
  );
}
