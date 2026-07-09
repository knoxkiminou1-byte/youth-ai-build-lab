import { useMemo, useState } from "react";
import youthVisual from "./assets/youth-lab-visual.png";
import "./styles.css";
import {
  YouthProject,
  averageRubricScore,
  canExportPortfolio,
  generateAssetPack,
  generatePortfolioPackage,
  generateProjectBrief,
  nextCoachingQuestions,
  scoreProject,
  serializePortfolioPackage,
} from "./lib/youth";

type Category = NonNullable<YouthProject["category"]>;

const categoryLabels: Record<Category, string> = {
  athlete: "Athlete brand",
  creator: "Creator project",
  community: "Community impact",
  business: "Starter business",
};

const seedProject: YouthProject = {
  projectName: "CourtSpark",
  studentName: "Jordan Miles",
  category: "athlete",
  idea: "A basketball training page that helps middle-school athletes build confidence, track workouts, and book small-group sessions.",
  audience: "parents of middle-school basketball players in Oakland",
  claims: ["I can help young players build confidence through structured practice."],
  mentorApproved: false,
  reflectionComplete: true,
  studentRevisionCount: 1,
  reflection: "AI helped me organize the page, but I changed the offer, removed hype, and wrote the sponsor message myself.",
};

function Icon({ name }: { name: "spark" | "copy" | "download" | "shield" | "pen" | "bolt" }) {
  const paths = {
    spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
    copy: "M8 8h10v10H8z M5 5h10",
    download: "M12 4v10m0 0l-4-4m4 4l4-4M5 20h14",
    shield: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z",
    pen: "M4 20l4.8-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20z",
    bolt: "M13 2L4 14h7l-1 8 10-13h-7l0-7z",
  };

  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function downloadText(filename: string, value: string) {
  const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

function useClipboard() {
  const [copied, setCopied] = useState("");

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return { copied, copy };
}

function RubricMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="rubric-meter">
      <span>{label}</span>
      <strong>{value}/5</strong>
      <meter min={0} max={5} value={value} />
    </div>
  );
}

export default function App() {
  const [project, setProject] = useState<YouthProject>(seedProject);
  const [activeAsset, setActiveAsset] = useState<"landing" | "pitch" | "social" | "checklist">("landing");
  const { copied, copy } = useClipboard();

  const score = useMemo(() => scoreProject(project), [project]);
  const average = useMemo(() => averageRubricScore(project), [project]);
  const brief = useMemo(() => generateProjectBrief(project), [project]);
  const assets = useMemo(() => generateAssetPack(project), [project]);
  const portfolio = useMemo(() => generatePortfolioPackage(project), [project]);
  const portfolioMarkdown = useMemo(() => serializePortfolioPackage(project), [project]);
  const questions = useMemo(() => nextCoachingQuestions(project), [project]);
  const exportReady = canExportPortfolio(project);

  function update<K extends keyof YouthProject>(key: K, value: YouthProject[K]) {
    setProject((current) => ({ ...current, [key]: value }));
  }

  function updateClaims(value: string) {
    update("claims", value.split("\n").map((claim) => claim.trim()).filter(Boolean));
  }

  const assetText = {
    landing: `${assets.landingHeadline}\n\n${assets.landingSubhead}`,
    pitch: assets.sponsorPitch,
    social: assets.socialCaption,
    checklist: assets.verificationChecklist.map((item) => `- ${item}`).join("\n"),
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a href="#top" className="brand">
          <span className="brand-mark">Y</span>
          <span>
            Youth AI Build Lab
            <small>AAFC creator studio</small>
          </span>
        </a>
        <nav>
          <a href="#studio">Studio</a>
          <a href="#coach">Claude Coach</a>
          <a href="#assets">Assets</a>
          <a href="#portfolio">Portfolio</a>
        </nav>
        <section className="level-card">
          <span>Creator level</span>
          <strong>{Math.round(average * 20)}%</strong>
          <meter min={0} max={100} value={average * 20} />
        </section>
      </aside>

      <section className="workspace" id="top">
        <header className="hero">
          <div className="hero-copy">
            <p className="section-label">Build for impact</p>
            <h1>A premium AI studio where young builders leave with real assets.</h1>
            <p>
              Clarify an idea, generate a starter brand package, run a mentor-safe rubric,
              document AI use, and export a portfolio page that sounds like the student owns it.
            </p>
            <div className="hero-actions">
              <a href="#studio"><Icon name="spark" /> Start building</a>
              <button type="button" onClick={() => copy("one-liner", brief.oneLiner)}>
                <Icon name="copy" /> {copied === "one-liner" ? "Copied" : "Copy one-liner"}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <img src={youthVisual} alt="" />
            <div className="journey-card">
              <span>Journey score</span>
              <strong>{average}/5</strong>
              <small>{exportReady ? "Portfolio export ready" : "Mentor gate still active"}</small>
            </div>
          </div>
        </header>

        <section className="project-strip" aria-label="Build status">
          <article>
            <span>Ideas captured</span>
            <strong>{project.idea.trim() ? 1 : 0}</strong>
          </article>
          <article>
            <span>Student revisions</span>
            <strong>{project.studentRevisionCount}</strong>
          </article>
          <article>
            <span>Risky claims</span>
            <strong>{score.riskyClaims.length}</strong>
          </article>
          <article>
            <span>Export gate</span>
            <strong>{exportReady ? "Open" : "Locked"}</strong>
          </article>
        </section>

        <section className="studio-grid" id="studio">
          <article className="panel project-form">
            <div className="panel-heading">
              <div>
                <p className="section-label">Studio</p>
                <h2>Turn the rough idea into a buildable project.</h2>
              </div>
              <button type="button" onClick={() => setProject(seedProject)}>Reset demo</button>
            </div>

            <div className="form-grid">
              <label>
                Project name
                <input value={project.projectName || ""} onChange={(event) => update("projectName", event.target.value)} />
              </label>
              <label>
                Student
                <input value={project.studentName || ""} onChange={(event) => update("studentName", event.target.value)} />
              </label>
              <label>
                Category
                <select value={project.category || "creator"} onChange={(event) => update("category", event.target.value as Category)}>
                  {Object.entries(categoryLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
              </label>
              <label className="wide">
                Idea
                <textarea value={project.idea} onChange={(event) => update("idea", event.target.value)} />
              </label>
              <label className="wide">
                Audience
                <input value={project.audience} onChange={(event) => update("audience", event.target.value)} />
              </label>
              <label className="wide">
                Claims to verify
                <textarea value={project.claims.join("\n")} onChange={(event) => updateClaims(event.target.value)} />
              </label>
            </div>
          </article>

          <article className="panel coach-panel" id="coach">
            <p className="section-label">Claude Coach</p>
            <h2>{brief.oneLiner}</h2>
            <div className="question-stack">
              {questions.map((question) => (
                <div key={question}><Icon name="bolt" /> {question}</div>
              ))}
            </div>
            <div className="risk-box">
              <Icon name="shield" />
              <div>
                <strong>{score.riskyClaims.length ? "Truthfulness review needed" : "Claims look mentor-safe"}</strong>
                <p>{score.riskyClaims.length ? score.riskyClaims.join(", ") : assets.safeProof}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="rubric-assets-grid">
          <article className="panel rubric-panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">Rubric</p>
                <h2>{average}/5 average</h2>
              </div>
              <span className="score-ring">{Math.round(average * 20)}%</span>
            </div>
            <RubricMeter label="Problem clarity" value={score.clarity} />
            <RubricMeter label="Audience fit" value={score.audienceFit} />
            <RubricMeter label="Truthfulness" value={score.truthfulness} />
            <RubricMeter label="Feasibility" value={score.feasibility} />
            <RubricMeter label="Polish" value={score.polish} />
          </article>

          <article className="panel asset-panel" id="assets">
            <div className="panel-heading">
              <div>
                <p className="section-label">Generated Assets</p>
                <h2>Starter assets the student can revise.</h2>
              </div>
              <button type="button" onClick={() => copy(activeAsset, assetText[activeAsset])}>
                <Icon name="copy" /> {copied === activeAsset ? "Copied" : "Copy asset"}
              </button>
            </div>
            <div className="asset-tabs">
              {(["landing", "pitch", "social", "checklist"] as const).map((asset) => (
                <button
                  type="button"
                  key={asset}
                  className={activeAsset === asset ? "active" : ""}
                  onClick={() => setActiveAsset(asset)}
                >
                  {asset}
                </button>
              ))}
            </div>
            <pre>{assetText[activeAsset]}</pre>
          </article>
        </section>

        <section className="portfolio-grid" id="portfolio">
          <article className="panel reflection-panel">
            <p className="section-label">Ownership Gate</p>
            <h2>Portfolio export requires student revision, reflection, and mentor approval.</h2>
            <label>
              Student revisions
              <input
                inputMode="numeric"
                value={project.studentRevisionCount}
                onChange={(event) => update("studentRevisionCount", Number(event.target.value.replace(/\D/g, "") || 0))}
              />
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={project.reflectionComplete}
                onChange={(event) => update("reflectionComplete", event.target.checked)}
              />
              Reflection is complete.
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={project.mentorApproved}
                onChange={(event) => update("mentorApproved", event.target.checked)}
              />
              Mentor approved this package.
            </label>
            <label>
              Reflection
              <textarea value={project.reflection || ""} onChange={(event) => update("reflection", event.target.value)} />
            </label>
          </article>

          <article className="panel portfolio-panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">Portfolio Preview</p>
                <h2>{portfolio.exportReady ? "Ready to export." : "Locked until the gate is complete."}</h2>
              </div>
              <button
                type="button"
                disabled={!portfolio.exportReady}
                onClick={() => downloadText("youth-ai-build-lab-portfolio.md", portfolioMarkdown)}
              >
                <Icon name="download" /> Download
              </button>
            </div>
            <textarea readOnly value={portfolioMarkdown} aria-label="Generated portfolio package" />
          </article>
        </section>
      </section>
    </main>
  );
}
