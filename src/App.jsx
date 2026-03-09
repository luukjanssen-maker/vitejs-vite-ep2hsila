import { useState } from "react";

const roadmapData = [
  {
    product: "ScanStreet Next",
    color: "#1A56C4",
    lightColor: "#EEF3FD",
    accent: "#1A56C4",
    items: [
      {
        id: 1,
        name: "UBL Documentherkenning",
        description: "Geautomatiseerde herkenning en verwerking van documenten in UBL-formaat.",
        quarter: "Q1",
        status: "delivered",
      },
      {
        id: 2,
        name: "Automatisch Splitsen & Classificeren",
        description: "Intelligent splitsen en classificeren van zowel enkelvoudige als meerpagina-documenten.",
        quarter: "Q2",
        status: "in-progress",
      },
      {
        id: 3,
        name: "Verbeterd Documentbegrip",
        description: "Geavanceerde AI-gedreven inhoudsanalyse voor betere interpretatie van documenten.",
        quarter: "Q2",
        status: "in-progress",
      },
      {
        id: 4,
        name: "AI-gestuurde Slimme Instructies",
        description: "Door AI gegenereerde verwerkingsinstructies met een experimenteeromgeving in het beheerportaal.",
        quarter: "Q2",
        status: "planned",
      },
    ],
  },
  {
    product: "Lyanthe Next",
    color: "#0E9A6E",
    lightColor: "#EDFAF4",
    accent: "#0E9A6E",
    items: [
      {
        id: 5,
        name: "Gebruikersbeheer & Migratie",
        description: "Volledig gebruikersbeheer inclusief naadloze migratie van bestaande accounts en koppelingen.",
        quarter: "Q2",
        status: "in-progress",
      },
      {
        id: 6,
        name: "Slimme Brievenbus",
        description: "Centrale brievenbus met Auto Boeksuggestie voor moeiteloze verwerking van inkomende documenten.",
        quarter: "Q3",
        status: "planned",
      },
      {
        id: 7,
        name: "Robotics Platform",
        description: "Volledig automatiseringsplatform met Auto Regelsugestie — voor intelligente, regelgebaseerde documentworkflows. Functies worden stapsgewijs uitgerold.",
        quarter: "Q1-27",
        status: "planned",
      },
    ],
  },
  {
    product: "Data & Insights",
    color: "#B45309",
    lightColor: "#FEF9EE",
    accent: "#B45309",
    items: [
      {
        id: 8,
        name: "Auto Verify Dashboard",
        description: "Realtime dashboard met duidelijk inzicht in het geautomatiseerde verificatieproces.",
        quarter: "Q2",
        status: "in-progress",
      },
      {
        id: 9,
        name: "Geavanceerde Analyse & Rapportage",
        description: "Diepgaande analysemogelijkheden ter ondersteuning van datagedreven besluitvorming op de lange termijn.",
        quarter: "Q2",
        status: "planned",
      },
    ],
  },
];

const quarters = ["Q1", "Q2", "Q3", "Q4", "Q1-27"];
const quarterLabels = {
  Q1: "Q1 2026\njan – mrt",
  Q2: "Q2 2026\napr – jun",
  Q3: "Q3 2026\njul – sep",
  Q4: "Q4 2026\nokt – dec",
  "Q1-27": "Q1 2027\njan – mrt",
};

const statusConfig = {
  delivered: { label: "Opgeleverd", bg: "#DCFCE7", color: "#15803D", dot: "#22C55E" },
  "in-progress": { label: "In ontwikkeling", bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
  planned: { label: "Gepland", bg: "#F3F4F6", color: "#374151", dot: "#9CA3AF" },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: cfg.bg,
        color: cfg.color,
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        letterSpacing: "0.03em",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cfg.dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

function Card({ item, productColor, productLight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? productLight : "#FFFFFF",
        border: `1.5px solid ${hovered ? productColor : "#E5E7EB"}`,
        borderRadius: 12,
        padding: "14px 16px",
        transition: "all 0.18s ease",
        cursor: "default",
        boxShadow: hovered
          ? `0 4px 24px ${productColor}22`
          : "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.35,
          }}
        >
          {item.name}
        </p>
        <StatusBadge status={item.status} />
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "#6B7280",
          lineHeight: 1.55,
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function Roadmap() {
  const [activeFilter, setActiveFilter] = useState("Alles");

  const filtered =
    activeFilter === "Alles"
      ? roadmapData
      : roadmapData.filter((p) => p.product === activeFilter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FB",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0F2356 60%, #1A3A7A 100%)",
          padding: "56px 48px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "5px 14px",
                  marginBottom: 20,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
                <span style={{ color: "#D1FAE5", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Product Roadmap
                </span>
              </div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Wat staat er op de planning voor 2026
              </h1>
              <p
                style={{
                  margin: "14px 0 0",
                  color: "#93C5FD",
                  fontSize: 16,
                  fontWeight: 300,
                  maxWidth: 520,
                  lineHeight: 1.65,
                }}
              >
                Een overzicht van geplande functies en verbeteringen in ons productportfolio voor het komende jaar.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 16,
                padding: "20px 24px",
                minWidth: 200,
              }}
            >
              <p style={{ margin: "0 0 14px", color: "#93C5FD", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Legenda
              </p>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                  <span style={{ color: "#E2E8F0", fontSize: 13 }}>{cfg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "0 48px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 4,
            overflowX: "auto",
          }}
        >
          {["Alles", ...roadmapData.map((p) => p.product)].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeFilter === f ? "2.5px solid #1A56C4" : "2.5px solid transparent",
                padding: "16px 18px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13.5,
                fontWeight: activeFilter === f ? 700 : 500,
                color: activeFilter === f ? "#1A56C4" : "#6B7280",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px 60px" }}>

        {/* Quarter headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px repeat(5, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div />
          {quarters.map((q) => (
            <div
              key={q}
              style={{
                background: q === "Q1-27" ? "#FEF3C7" : "#FFFFFF",
                border: `1px solid ${q === "Q1-27" ? "#FCD34D" : "#E5E7EB"}`,
                borderRadius: 10,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: q === "Q1-27" ? "#92400E" : "#111827",
                  whiteSpace: "pre-line",
                  lineHeight: 1.5,
                }}
              >
                {quarterLabels[q]}
              </p>
            </div>
          ))}
        </div>

        {/* Product rows */}
        {filtered.map((product) => (
          <div key={product.product} style={{ marginBottom: 32 }}>
            {/* Product label */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px repeat(5, 1fr)",
                gap: 12,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  background: product.lightColor,
                  border: `2px solid ${product.color}33`,
                  borderLeft: `4px solid ${product.color}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: product.color,
                    lineHeight: 1.3,
                  }}
                >
                  {product.product}
                </p>
              </div>

              {/* Quarter cells */}
              {quarters.map((q) => {
                const items = product.items.filter((i) => i.quarter === q);
                return (
                  <div key={q} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.length === 0 ? (
                      <div
                        style={{
                          height: 6,
                          borderRadius: 3,
                          background: "#F3F4F6",
                          margin: "20px 0",
                        }}
                      />
                    ) : (
                      items.map((item) => (
                        <Card
                          key={item.id}
                          item={item}
                          productColor={product.color}
                          productLight={product.lightColor}
                        />
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div
          style={{
            marginTop: 48,
            background: "#FFFBEB",
            border: "1.5px solid #FCD34D",
            borderRadius: 14,
            padding: "24px 28px",
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>⚠️</span>
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#92400E",
                }}
              >
                Belangrijke disclaimer
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#78350F",
                  lineHeight: 1.7,
                }}
              >
                Deze roadmap is uitsluitend bedoeld ter informatie en weerspiegelt onze huidige ontwikkelingsplannen.
                Alle geplande functies, tijdlijnen en opleveringskwartalen zijn <strong>indicatief en onder voorbehoud van wijzigingen</strong> zonder
                voorafgaande kennisgeving. Prioriteiten kunnen verschuiven op basis van technische bevindingen, klantfeedback, regelgeving
                of andere bedrijfsoverwegingen. De beschreven functionaliteiten vormen geen contractuele verplichting. Voor vragen over specifieke functies kunt u contact opnemen met uw accountmanager.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            borderTop: "1px solid #E5E7EB",
            paddingTop: 24,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9CA3AF",
            }}
          >
            © 2026 · Vertrouwelijk — uitsluitend voor klantgebruik · Laatst bijgewerkt: maart 2026
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9CA3AF",
            }}
          >
            Datums zijn weergegeven per kwartaal (Q1 = jan–mrt, Q2 = apr–jun, Q3 = jul–sep, Q4 = okt–dec)
          </p>
        </div>
      </div>
    </div>
  );
}
