import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// --- Helper data -----------------------------------------------------------
const STYLES = [
  {
    key: "pressure_passing",
    label: "Pressure Passing & Top Control",
    athleticDemand: 5,
    description:
      "Heavy top pressure, knee cuts, over-unders, smash passing. Excels with strong base and patience.",
    keywords: ["pressure passing", "top control", "smash pass", "knee cut"],
  },
  {
    key: "wrestle_up",
    label: "Wrestle-Up & Takedown Game",
    athleticDemand: 7,
    description:
      "Wrestling entries from feet and guard: single/double legs, body locks, strong scrambles.",
    keywords: ["wrestling", "takedown", "single leg", "double leg"],
  },
  {
    key: "open_guard_speed",
    label: "Open Guard & Speed Passing",
    athleticDemand: 8,
    description:
      "Dynamic movement, De La Riva/berimbolo, torreando and leg drags with tempo changes.",
    keywords: ["open guard", "berimbolo", "leg drag", "toreando"],
  },
  {
    key: "lapel_traps",
    label: "Lapel Guards & Grip Traps (Gi)",
    athleticDemand: 6,
    description:
      "Worm/lasso spider grips to off-balance, sweep and submit with layered control (gi-focused).",
    keywords: ["lapel", "worm guard", "lasso", "spider"],
  },
  {
    key: "closed_guard_clinical",
    label: "Closed Guard & Classic Fundamentals",
    athleticDemand: 4,
    description:
      "Classic posture-breaking, collar-sleeve, hip bump/kimura/guillotine chains.",
    keywords: ["closed guard", "collar sleeve", "kimura", "hip bump"],
  },
  {
    key: "leglock_systems",
    label: "Leg Lock Systems (No-Gi)",
    athleticDemand: 7,
    description:
      "Inside & outside heel hooks, saddle/50-50, re-entries and back exposure from legs.",
    keywords: ["leg lock", "heel hook", "saddle", "ashigarami"],
  },
  {
    key: "heavy_top_mount",
    label: "Heavy Mount & Back Control",
    athleticDemand: 5,
    description:
      "Mount/back as hubs, cross-collar, arm triangle, back takes from pressure.",
    keywords: ["mount", "back control", "collar choke", "arm triangle"],
  },
];

// Rough, opinionated style tags for pros (not exhaustive, for demo logic)
// bodyType: "lanky" | "average" | "stocky" | "powerhouse"
// primaryGi: "gi" | "nogi" | "both" (pros may still be both)
// weightClass: approximate adult IBJJF class anchor (kg)
const PROS = [
  { name: "Carlos Gracie", styles: ["closed_guard_clinical"], bodyType: "average", primaryGi: "gi", weightClass: 79 },
  { name: "Hélio Gracie", styles: ["closed_guard_clinical", "heavy_top_mount"], bodyType: "lanky", primaryGi: "gi", weightClass: 73 },
  { name: "Rickson Gracie", styles: ["heavy_top_mount", "closed_guard_clinical"], bodyType: "powerhouse", primaryGi: "gi", weightClass: 88 },
  { name: "Royler Gracie", styles: ["closed_guard_clinical", "open_guard_speed"], bodyType: "lanky", primaryGi: "gi", weightClass: 70 },
  { name: "Marcelo Garcia", styles: ["open_guard_speed", "heavy_top_mount"], bodyType: "average", primaryGi: "both", weightClass: 79 },
  { name: "Roger Gracie", styles: ["heavy_top_mount", "pressure_passing"], bodyType: "lanky", primaryGi: "gi", weightClass: 100 },
  { name: "Rubens 'Cobrinha' Charles", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 70 },
  { name: "Bruno Malfacine", styles: ["open_guard_speed"], bodyType: "stocky", primaryGi: "gi", weightClass: 57 },
  { name: "Rafael Mendes", styles: ["open_guard_speed", "lapel_traps"], bodyType: "average", primaryGi: "gi", weightClass: 70 },
  { name: "Fabio Gurgel", styles: ["pressure_passing", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "gi", weightClass: 88 },
  { name: "Léo Vieira", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 76 },
  { name: "Ricardo Vieira", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 70 },
  { name: "Gabi Garcia", styles: ["pressure_passing", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "gi", weightClass: 90 },
  { name: "Marcus 'Buchecha' Almeida", styles: ["pressure_passing", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "both", weightClass: 100 },
  { name: "André Galvão", styles: ["wrestle_up", "pressure_passing"], bodyType: "powerhouse", primaryGi: "both", weightClass: 88 },
  { name: "Leandro Lo", styles: ["open_guard_speed", "pressure_passing"], bodyType: "lanky", primaryGi: "gi", weightClass: 88 },
  { name: "Gordon Ryan", styles: ["leglock_systems", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "nogi", weightClass: 102 },
  { name: "Mikey Musumeci", styles: ["open_guard_speed", "leglock_systems"], bodyType: "average", primaryGi: "both", weightClass: 60 },
  { name: "Tainan Dalpra", styles: ["open_guard_speed", "pressure_passing"], bodyType: "average", primaryGi: "gi", weightClass: 82 },
  { name: "Fellipe Andrew", styles: ["open_guard_speed", "lapel_traps"], bodyType: "lanky", primaryGi: "gi", weightClass: 88 },
  { name: "Kaynan Duarte", styles: ["pressure_passing", "wrestle_up"], bodyType: "powerhouse", primaryGi: "both", weightClass: 100 },
  { name: "Lucas Barbosa", styles: ["wrestle_up", "pressure_passing"], bodyType: "powerhouse", primaryGi: "both", weightClass: 88 },
  { name: "Josh Hinger", styles: ["wrestle_up", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "both", weightClass: 88 },
  { name: "Michael Langhi", styles: ["open_guard_speed", "lapel_traps"], bodyType: "lanky", primaryGi: "gi", weightClass: 76 },
  { name: "João Barbosa", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 76 },
  { name: "Braulio Estima", styles: ["open_guard_speed", "heavy_top_mount"], bodyType: "lanky", primaryGi: "both", weightClass: 88 },
  { name: "João Miyao", styles: ["open_guard_speed", "lapel_traps"], bodyType: "lanky", primaryGi: "gi", weightClass: 64 },
  { name: "Lucas Lepri", styles: ["open_guard_speed", "pressure_passing"], bodyType: "average", primaryGi: "gi", weightClass: 76 },
  { name: "JT Torres", styles: ["wrestle_up", "pressure_passing"], bodyType: "average", primaryGi: "both", weightClass: 79 },
  { name: "Caio Terra", styles: ["open_guard_speed", "closed_guard_clinical"], bodyType: "lanky", primaryGi: "gi", weightClass: 57 },
  { name: "Paulo Miyao", styles: ["open_guard_speed", "lapel_traps"], bodyType: "lanky", primaryGi: "gi", weightClass: 64 },
  { name: "Tye Ruotolo", styles: ["wrestle_up", "leglock_systems"], bodyType: "lanky", primaryGi: "nogi", weightClass: 83 },
  { name: "Mica Galvão", styles: ["wrestle_up", "open_guard_speed"], bodyType: "average", primaryGi: "both", weightClass: 77 },
  { name: "Nicolas Meregali", styles: ["pressure_passing", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "both", weightClass: 100 },
  { name: "Lachlan Giles", styles: ["leglock_systems", "open_guard_speed"], bodyType: "average", primaryGi: "nogi", weightClass: 77 },
  { name: "Royce Gracie", styles: ["closed_guard_clinical"], bodyType: "lanky", primaryGi: "gi", weightClass: 80 },
  { name: "João Rodrigues", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 76 },
  { name: "Ivaniel Oliveira", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 70 },
  { name: "Milton Bastos", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 64 },
  { name: "Koji Shibamoto", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 60 },
  { name: "Leandro Escobar", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 79 },
  { name: "Thiago Marques", styles: ["open_guard_speed"], bodyType: "average", primaryGi: "gi", weightClass: 82 },
  { name: "Claúdio Mattos", styles: ["closed_guard_clinical"], bodyType: "average", primaryGi: "gi", weightClass: 79 },
  { name: "Rodolfo Vieira", styles: ["pressure_passing", "heavy_top_mount"], bodyType: "powerhouse", primaryGi: "both", weightClass: 100 },
  { name: "Xande Ribeiro", styles: ["heavy_top_mount", "pressure_passing"], bodyType: "powerhouse", primaryGi: "both", weightClass: 94 },
  { name: "Romulo Barral", styles: ["lapel_traps", "pressure_passing"], bodyType: "lanky", primaryGi: "gi", weightClass: 88 },
  { name: "Andre Almeida (Dedeco)", styles: ["closed_guard_clinical"], bodyType: "average", primaryGi: "gi", weightClass: 82 },
  { name: "Craig Jones", styles: ["leglock_systems", "wrestle_up"], bodyType: "lanky", primaryGi: "nogi", weightClass: 91 },
  { name: "Roberto 'Cyborg' Abreu", styles: ["wrestle_up", "pressure_passing"], bodyType: "powerhouse", primaryGi: "both", weightClass: 102 },
  { name: "Kron Gracie", styles: ["closed_guard_clinical", "wrestle_up"], bodyType: "average", primaryGi: "both", weightClass: 77 },
];

const styleByBodyTypeBias: Record<string, string[]> = {
  lanky: ["open_guard_speed", "lapel_traps", "closed_guard_clinical"],
  average: ["open_guard_speed", "wrestle_up", "heavy_top_mount"],
  stocky: ["pressure_passing", "wrestle_up", "leglock_systems"],
  powerhouse: ["pressure_passing", "heavy_top_mount", "wrestle_up"],
};

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function inferBodyType(heightCm: number, weightKg: number) {
  const h = heightCm / 100; const bmi = weightKg / (h * h);
  if (bmi < 21) return "lanky"; if (bmi < 25) return "average"; if (bmi < 29) return "stocky"; return "powerhouse";
}

function nearestWeightScore(userKg: number, proKg: number) {
  const diff = Math.abs(userKg - proKg);
  const base = 100 - Math.max(0, diff - 10) * 2.2 - Math.min(10, diff) * 1.2;
  return clamp(Math.round(base), 0, 100);
}

// Stronger emphasis on Gi/No-Gi compatibility
function giAffinityBonus(userGi: string, proGi: string) {
  if (proGi === "both") return 12; // both still gets a partial boost
  return userGi === proGi ? 20 : 0; // exact match weighs more
}

function athleticFitScore(styleKey: string, athleticLevel: number) {
  const style = STYLES.find((s) => s.key === styleKey); if (!style) return 50;
  const diff = Math.abs(athleticLevel - style.athleticDemand);
  return clamp(100 - diff * 10, 40, 100);
}

function styleOverlapScore(userPrimaryStyle: string, proStyles: string[]) { return proStyles.includes(userPrimaryStyle) ? 30 : 0; }

// --- New: richer style selection that links styles directly to height/weight/athletic ability
function bodyTypeStyleBias(styleKey: string, bodyType: string) {
  const list = styleByBodyTypeBias[bodyType as keyof typeof styleByBodyTypeBias] || [];
  // Heavier weight for the first suggested style for that body type
  const idx = list.indexOf(styleKey);
  if (idx === 0) return 12; // primary
  if (idx === 1) return 7;  // secondary
  if (idx === 2) return 4;  // tertiary
  return 0;
}

function giStyleBias(gi: string, styleKey: string) {
  if (gi === "gi") {
    if (styleKey === "lapel_traps") return 12;
    if (styleKey === "pressure_passing" || styleKey === "closed_guard_clinical" || styleKey === "heavy_top_mount") return 6;
    return 2; // mild credit for other styles in gi
  } else {
    if (styleKey === "leglock_systems") return 12;
    if (styleKey === "wrestle_up" || styleKey === "open_guard_speed") return 8;
    return 2; // mild credit to not zero out others
  }
}

function heightWeightStyleBias(height: number, weight: number, gi: string, styleKey: string) {
  let bias = 0;
  const tall = height >= 185;  // 6'1"+
  const shorty = height <= 170; // 5'7"-
  const heavy = weight >= 95;   // heavyweights
  const light = weight <= 70;   // feather/light

  // Height-driven tendencies
  if (tall) {
    if (styleKey === "lapel_traps") bias += 8; // leverage long frames + grips
    if (styleKey === "open_guard_speed") bias += 6;
    if (styleKey === "heavy_top_mount") bias += 4;
  }
  if (shorty) {
    if (styleKey === "pressure_passing") bias += 8; // lower CoG, great pressure
    if (styleKey === "wrestle_up") bias += 6;
    if (styleKey === "leglock_systems") bias += 4;
  }

  // Weight-driven tendencies
  if (heavy) {
    if (styleKey === "pressure_passing") bias += 7;
    if (styleKey === "heavy_top_mount") bias += 6;
    if (gi === "gi" && styleKey === "lapel_traps") bias += 3;
  }
  if (light) {
    if (styleKey === "open_guard_speed") bias += 6;
    if (styleKey === "leglock_systems") bias += 5;
    if (styleKey === "closed_guard_clinical") bias += 3;
  }

  // Neutral middle ranges: gentle encouragements so mid builds still get two clear picks
  if (!tall && !shorty && !heavy && !light) {
    if (styleKey === "wrestle_up" || styleKey === "open_guard_speed") bias += 3;
  }

  return bias;
}

function chooseRecommendedStyles({ height, weight, athletic, gi }: { height: number; weight: number; athletic: number; gi: string }) {
  const bodyType = inferBodyType(height, weight);
  const scores = STYLES.map((s) => {
    const athleticPart = 0.5 * athleticFitScore(s.key, athletic); // 0–50
    const bodyPart = bodyTypeStyleBias(s.key, bodyType);           // 0–12
    const giPart = giStyleBias(gi, s.key);                         // 2–12
    const hwPart = heightWeightStyleBias(height, weight, gi, s.key); // 0–~14
    const total = Math.round(athleticPart + bodyPart + giPart + hwPart);
    return { key: s.key, score: total };
  })
    .sort((a, b) => b.score - a.score);
  return scores.slice(0, 2).map((r) => r.key);
}

function proLinks(name: string) {
  const q = encodeURIComponent(name);
  return {
    bjjHeroes: `https://www.bjjheroes.com/?s=${q}`,
    bjjFanatics: `https://bjjfanatics.com/search?type=product&q=${q}`,
    youtube: `https://www.youtube.com/results?search_query=${q}+highlights`,
  };
}

function styleLinks(styleKey: string) {
  const styleDef = STYLES.find((s) => s.key === styleKey);
  const q = encodeURIComponent(styleDef?.label || styleKey);
  return {
    bjjHeroes: `https://www.bjjheroes.com/?s=${q}`,
    bjjFanatics: `https://bjjfanatics.com/search?type=product&q=${q}`,
    youtube: `https://www.youtube.com/results?search_query=${q}+bjj`,
  };
}

function scorePros({ height, weight, athletic, gi, primaryStyle }: { height: number; weight: number; athletic: number; gi: string; primaryStyle: string }) {
  const userBodyType = inferBodyType(height, weight);
  return PROS.map((p) => {
    const bodyTypeMatch = p.bodyType === userBodyType ? 25 : 0;
    const wScore = nearestWeightScore(weight, p.weightClass);
    const giBonus = giAffinityBonus(gi, p.primaryGi);
    const styleFit = Math.max(...p.styles.map((s) => athleticFitScore(s, athletic)));
    const styleOverlap = styleOverlapScore(primaryStyle, p.styles);

    const styleScore = clamp(
      Math.round(0.45 * styleFit + 0.25 * wScore + 0.2 * styleOverlap + giBonus * 1.5 + bodyTypeMatch),
      0,
      100
    );
    const bodyScore = clamp(
      Math.round(0.5 * wScore + 0.25 * bodyTypeMatch + 0.35 * giBonus + 0.1 * styleFit),
      0,
      100
    );

    return { ...p, styleScore, bodyScore };
  });
}

function prettyCm(n: number) { return `${n} cm`; }
function prettyKg(n: number) { return `${n} kg`; }

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border">{children}</span>;
}

function LinkChip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="inline-flex items-center text-xs font-medium rounded-full border px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

// --- Style Guide components
function StyleCard({ s }: { s: typeof STYLES[0] }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="text-sm md:text-base font-semibold text-card-foreground">{s.label}</div>
      <div className="mt-1 text-xs text-muted-foreground">Athletic demand: {s.athleticDemand}/10</div>
      <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
      {s.keywords?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {s.keywords.map((k) => (
            <span key={k} className="text-[11px] rounded-full bg-muted px-2 py-0.5 border text-muted-foreground">{k}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StyleGuidePanel() {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-bold text-card-foreground">Style Guide (All Categories)</h2>
        <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      {open && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {STYLES.map((s) => (
            <StyleCard key={s.key} s={s} />
          ))}
        </div>
      )}
    </section>
  );
}

interface BJJRecommenderProps {
  userEmail: string;
  onBack: () => void;
}

export default function BJJRecommender({ userEmail, onBack }: BJJRecommenderProps) {
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(82);
  const [athletic, setAthletic] = useState(6);
  const [gi, setGi] = useState("gi"); // "gi" | "nogi"

  const recommendations = useMemo(() => {
    const primaryStyles = chooseRecommendedStyles({ height, weight, athletic, gi });
    const scored = scorePros({ height, weight, athletic, gi, primaryStyle: primaryStyles[0] });

    const styleRanked = [...scored].sort((a, b) => b.styleScore - a.styleScore);
    const bodyRanked = [...scored].sort((a, b) => b.bodyScore - a.bodyScore);

    const topStylePros = styleRanked.slice(0, 2);
    const topBodyPros = bodyRanked.slice(0, 2);

    const summaryText = buildSummary({ height, weight, athletic, gi, primaryStyles, topStylePros, topBodyPros, styleRanked, bodyRanked });

    return { primaryStyles, styleRanked, bodyRanked, topStylePros, topBodyPros, summaryText };
  }, [height, weight, athletic, gi]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Badge>Logged in: {userEmail}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">BJJ Style & Pro Recommender</h1>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">Clean, modern, and opinionated • Scores 1–100</div>
        </header>

        {/* Collapsible Style Guide Panel */}
        <StyleGuidePanel />

        <section className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-1 rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-bold mb-3 text-card-foreground">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Height</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={150} max={205} value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full" />
                  <div className="w-20 text-right text-sm font-semibold text-card-foreground">{prettyCm(height)}</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Weight</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={50} max={125} value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="w-full" />
                  <div className="w-20 text-right text-sm font-semibold text-card-foreground">{prettyKg(weight)}</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Athletic Ability</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={1} max={10} value={athletic} onChange={(e) => setAthletic(parseInt(e.target.value))} className="w-full" />
                  <div className="w-20 text-right text-sm font-semibold text-card-foreground">{athletic}/10</div>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Gi / No-Gi</label>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {["gi", "nogi"].map((opt) => (
                    <Button 
                      key={opt} 
                      variant={gi === opt ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGi(opt)}
                      className="rounded-xl"
                    >
                      {opt.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 rounded-2xl border bg-card p-5 shadow-sm">
            <h2 className="text-base md:text-lg font-bold mb-3 text-card-foreground">Suggested Styles</h2>

            {/* Summary titles for current inputs */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge>Height: {prettyCm(height)}</Badge>
              <Badge>Weight: {prettyKg(weight)}</Badge>
              <Badge>Athletic: {athletic}/10</Badge>
              <Badge>Preference: {gi.toUpperCase()}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.primaryStyles.map((sKey) => {
                const s = STYLES.find((x) => x.key === sKey)!;
                const links = styleLinks(sKey);
                return (
                  <div key={sKey} className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base md:text-lg font-semibold text-card-foreground">{s.label}</div>
                        <div className="mt-1 text-xs text-muted-foreground">Athletic demand: {s.athleticDemand}/10</div>
                      </div>
                      <Badge>{gi === "gi" && sKey === "lapel_traps" ? "GI-FOCUSED" : gi === "nogi" && sKey === "leglock_systems" ? "NO-GI FAVORED" : "Suggested"}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <LinkChip href={links.bjjHeroes}>BJJ Heroes</LinkChip>
                      <LinkChip href={links.bjjFanatics}>BJJ Fanatics</LinkChip>
                      <LinkChip href={links.youtube}>YouTube</LinkChip>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border bg-card p-4 shadow-sm">
                <h3 className="text-sm md:text-base font-semibold mb-2 text-card-foreground">Pros to Watch – Style Matches</h3>
                <div className="space-y-3">
                  {recommendations.topStylePros.map((p, idx) => (
                    <ProRow key={p.name} rank={idx + 1} pro={p} score={p.styleScore} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border bg-card p-4 shadow-sm">
                <h3 className="text-sm md:text-base font-semibold mb-2 text-card-foreground">Pros to Watch – Body Type Matches</h3>
                <div className="space-y-3">
                  {recommendations.topBodyPros.map((p, idx) => (
                    <ProRow key={p.name} rank={idx + 1} pro={p} score={p.bodyScore} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <RankedList title="Style Match Ranking (1–50)" items={recommendations.styleRanked} scoreKey="styleScore" />
              <RankedList title="Body Type Match Ranking (1–50)" items={recommendations.bodyRanked} scoreKey="bodyScore" />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="text-base md:text-lg font-bold mb-2 text-card-foreground">How your recommendations are calculated</h2>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
            <li><span className="font-medium">Body type</span> is inferred from height & weight (rough BMI heuristic) to bias style archetypes.</li>
            <li><span className="font-medium">Gi/No-Gi</span> preference nudges styles (lapel/lasso in Gi; leg locks & wrestling in No-Gi) and has a <span className="font-medium">strong impact</span> in pro matching.</li>
            <li><span className="font-medium">Athletic ability</span> (1–10) is matched against each style's demand to find the best fits.</li>
            <li><span className="font-medium">Height & weight signals</span> now directly influence style picks (e.g., tall → lapels/open guard; heavy → pressure/mount; light → speed/legs).</li>
            <li><span className="font-medium">Pro scores</span> combine: style fit, weight proximity, style overlap, gi alignment (boosted), and body-type bonus.</li>
            <li>Each list shows a <span className="font-medium">1–100</span> score; numbers are algorithmic estimates for exploration.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="text-base md:text-lg font-bold mb-3 text-card-foreground">Text Summary (copy/paste)</h2>
          <TextSummary text={recommendations.summaryText} />
        </section>

        <footer className="mt-10 text-xs md:text-sm text-muted-foreground">
          Notes: Scores are generated algorithmically from approximate style/body archetypes you provided. Links use site searches (BJJ Heroes/Fanatics/YouTube) for quick exploration.
        </footer>
      </div>
    </div>
  );
}

interface ProRowProps {
  pro: any;
  score: number;
  rank: number;
}

function ProRow({ pro, score, rank }: ProRowProps) {
  const links = proLinks(pro.name);
  const styleLabels = pro.styles.map((k: string) => STYLES.find((s) => s.key === k)?.label || k);
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border bg-card p-3 shadow-sm">
      <div>
        <div className="flex items-center gap-2">
          <div className="text-sm md:text-base font-semibold text-card-foreground">{rank}. {pro.name}</div>
          <Badge>{pro.primaryGi.toUpperCase()}</Badge>
          <Badge>{pro.bodyType}</Badge>
          <Badge>{pro.weightClass}kg</Badge>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">Styles: {styleLabels.join(", ")}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <LinkChip href={links.bjjHeroes}>BJJ Heroes</LinkChip>
          <LinkChip href={links.bjjFanatics}>BJJ Fanatics</LinkChip>
          <LinkChip href={links.youtube}>YouTube</LinkChip>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-semibold tabular-nums text-card-foreground">{score}</div>
        <div className="text-[10px] text-muted-foreground">/100</div>
      </div>
    </div>
  );
}

interface RankedListProps {
  title: string;
  items: any[];
  scoreKey: string;
}

function RankedList({ title, items, scoreKey }: RankedListProps) {
  const top50 = items.slice(0, 50);
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <h3 className="text-sm md:text-base font-semibold mb-2 text-card-foreground">{title}</h3>
      <ol className="space-y-1">
        {top50.map((p, idx) => {
          const links = proLinks(p.name);
          return (
            <li key={p.name} className="flex flex-col gap-1 rounded-lg border p-2 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right text-xs font-medium text-muted-foreground">{idx + 1}</span>
                  <span className="text-sm md:text-base text-card-foreground">{p.name}</span>
                </div>
                <div className="text-sm md:text-base tabular-nums text-card-foreground">{p[scoreKey]}</div>
              </div>
              <div className="flex flex-wrap gap-2 pl-8">
                <LinkChip href={links.bjjHeroes}>BJJ Heroes</LinkChip>
                <LinkChip href={links.bjjFanatics}>BJJ Fanatics</LinkChip>
                <LinkChip href={links.youtube}>YouTube</LinkChip>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function buildSummary({ height, weight, athletic, gi, primaryStyles, topStylePros, topBodyPros, styleRanked, bodyRanked }: any) {
  const sLinks = primaryStyles.map((k: string) => styleLinks(k));
  const styleLines = primaryStyles.map((k: string, i: number) => {
    const s = STYLES.find((x) => x.key === k)!;
    return `• ${s.label} (Athletic demand ${s.athleticDemand}/10)\n  - BJJ Heroes: ${sLinks[i].bjjHeroes}\n  - BJJ Fanatics: ${sLinks[i].bjjFanatics}\n  - YouTube: ${sLinks[i].youtube}`;
  });

  const proLine = (p: any, which: string, score: number) => {
    const links = proLinks(p.name);
    const styles = p.styles.map((k: string) => STYLES.find((s) => s.key === k)?.label).join(", ");
    return `${which}: ${p.name} — ${score}/100\n  Styles: ${styles}\n  BJJ Heroes: ${links.bjjHeroes}\n  BJJ Fanatics: ${links.bjjFanatics}\n  YouTube: ${links.youtube}`;
  };

  const styleTop = topStylePros.map((p: any, i: number) => proLine(p, `#${i + 1}`, p.styleScore)).join("\n\n");
  const bodyTop = topBodyPros.map((p: any, i: number) => proLine(p, `#${i + 1}`, p.bodyScore)).join("\n\n");

  const styleRanks = styleRanked
    .slice(0, 50)
    .map((p: any, i: number) => {
      const links = proLinks(p.name);
      return `${i + 1}. ${p.name} — ${p.styleScore}/100\n   Heroes: ${links.bjjHeroes} | Fanatics: ${links.bjjFanatics} | YouTube: ${links.youtube}`;
    })
    .join("\n");
  const bodyRanks = bodyRanked
    .slice(0, 50)
    .map((p: any, i: number) => {
      const links = proLinks(p.name);
      return `${i + 1}. ${p.name} — ${p.bodyScore}/100\n   Heroes: ${links.bjjHeroes} | Fanatics: ${links.bjjFanatics} | YouTube: ${links.youtube}`;
    })
    .join("\n");

  return `BJJ Recommendations\n====================\n\nInputs: Height ${height} cm • Weight ${weight} kg • Athletic ${athletic}/10 • ${gi.toUpperCase()}\n\nSuggested Styles\n---------------\n${styleLines.join("\n\n")}\n\nPros to Watch — Style Matches\n-----------------------------\n${styleTop}\n\nPros to Watch — Body Type Matches\n---------------------------------\n${bodyTop}\n\nFull Ranking — Style Match (Top 50)\n-----------------------------------\n${styleRanks}\n\nFull Ranking — Body Type Match (Top 50)\n---------------------------------------\n${bodyRanks}\n`;
}

function TextSummary({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <textarea className="w-full h-64 rounded-xl border bg-muted/50 p-3 text-sm" readOnly value={text} />
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">One-click copy for sharing or notes.</div>
        <Button 
          onClick={async () => { 
            await navigator.clipboard.writeText(text); 
            setCopied(true); 
            setTimeout(() => setCopied(false), 1500); 
          }} 
          variant="default"
          size="sm"
        >
          {copied ? "Copied!" : "Copy Summary"}
        </Button>
      </div>
    </div>
  );
}