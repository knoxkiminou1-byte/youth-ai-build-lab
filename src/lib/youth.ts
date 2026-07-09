export type YouthProject = {
  idea: string;
  audience: string;
  claims: string[];
  mentorApproved: boolean;
  reflectionComplete: boolean;
  studentRevisionCount: number;
  projectName?: string;
  studentName?: string;
  category?: "athlete" | "creator" | "community" | "business";
  reflection?: string;
};

const riskyClaimWords = ["guaranteed", "$10k", "professional", "elite ranked", "best in the world"];

export function scoreProject(project: YouthProject) {
  const hasAudience = project.audience.trim().length > 4;
  const hasSpecificIdea = project.idea.trim().split(/\s+/).length >= 8;
  const riskyClaims = project.claims.filter((claim) => riskyClaimWords.some((word) => claim.toLowerCase().includes(word)));
  return {
    clarity: hasSpecificIdea ? 5 : 2,
    audienceFit: hasAudience ? 5 : 2,
    truthfulness: Math.max(1, 5 - riskyClaims.length * 2),
    feasibility: project.studentRevisionCount > 0 ? 4 : 3,
    polish: project.mentorApproved ? 5 : 3,
    riskyClaims,
  };
}

export function canExportPortfolio(project: YouthProject) {
  return project.mentorApproved && project.reflectionComplete && project.studentRevisionCount > 0;
}

export function nextCoachingQuestions(project: YouthProject) {
  const questions = ["Who is this for?", "What is the first real deliverable?", "What needs to be verified?"];
  if (!project.audience) questions.unshift("Can you name the exact audience?");
  if (project.claims.length === 0) questions.push("What claims or achievements should a mentor check?");
  return questions;
}

export function averageRubricScore(project: YouthProject) {
  const score = scoreProject(project);
  const values = [score.clarity, score.audienceFit, score.truthfulness, score.feasibility, score.polish];
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
}

export function generateProjectBrief(project: YouthProject) {
  const projectName = project.projectName?.trim() || "Untitled Youth AI Build";
  const studentName = project.studentName?.trim() || "Student Builder";
  const audience = project.audience.trim() || "a clearly named audience";
  const category = project.category || "creator";
  const firstClaim = project.claims.find((claim) => claim.trim()) || "This project needs verified proof before launch.";

  return {
    projectName,
    studentName,
    category,
    oneLiner: `${projectName} helps ${audience} by turning ${project.idea.trim() || "a rough idea"} into a practical, shareable project.`,
    audience,
    offer: `A ${category} project package with a landing section, outreach message, proof checklist, and reflection log.`,
    proof: firstClaim,
    nextStep:
      project.studentRevisionCount > 0
        ? "Polish the strongest asset and ask a mentor to review the proof."
        : "Make one student revision before showing the package to a mentor.",
  };
}

export function generateAssetPack(project: YouthProject) {
  const brief = generateProjectBrief(project);
  const risky = scoreProject(project).riskyClaims;
  const safeProof = risky.length > 0 ? "Replace risky claims with verified facts before launch." : brief.proof;

  return {
    landingHeadline: brief.projectName,
    landingSubhead: brief.oneLiner,
    sponsorPitch: `Hi, I am ${brief.studentName}. I am building ${brief.projectName} for ${brief.audience}. I would love feedback, a connection, or one opportunity to test the idea with real people.`,
    socialCaption: `${brief.projectName}: built for ${brief.audience}. Current focus: ${brief.nextStep}`,
    verificationChecklist: [
      "Name the exact audience.",
      "Check every claim against real proof.",
      "Ask one mentor or community member for feedback.",
      "Revise the project after feedback.",
      "Write what AI helped with and what the student changed.",
    ],
    safeProof,
  };
}

export function generatePortfolioPackage(project: YouthProject) {
  const brief = generateProjectBrief(project);
  const assets = generateAssetPack(project);
  const score = scoreProject(project);

  return {
    brief,
    assets,
    score,
    average: averageRubricScore(project),
    exportReady: canExportPortfolio(project),
    reflection:
      project.reflection?.trim() ||
      "I used AI to organize my idea, but I revised the project in my own words and checked the claims with a mentor.",
    mentorNote: project.mentorApproved
      ? "Mentor approval is complete."
      : "Mentor approval is still required before final export.",
  };
}

export function serializePortfolioPackage(project: YouthProject) {
  const portfolio = generatePortfolioPackage(project);
  const score = portfolio.score;

  return [
    `# ${portfolio.brief.projectName}`,
    "",
    `Builder: ${portfolio.brief.studentName}`,
    `Category: ${portfolio.brief.category}`,
    `Audience: ${portfolio.brief.audience}`,
    "",
    "## Project Summary",
    portfolio.brief.oneLiner,
    "",
    "## Offer",
    portfolio.brief.offer,
    "",
    "## Draft Assets",
    `Landing headline: ${portfolio.assets.landingHeadline}`,
    `Landing subhead: ${portfolio.assets.landingSubhead}`,
    `Sponsor pitch: ${portfolio.assets.sponsorPitch}`,
    `Social caption: ${portfolio.assets.socialCaption}`,
    "",
    "## Rubric",
    `- Clarity: ${score.clarity}/5`,
    `- Audience fit: ${score.audienceFit}/5`,
    `- Truthfulness: ${score.truthfulness}/5`,
    `- Feasibility: ${score.feasibility}/5`,
    `- Polish: ${score.polish}/5`,
    `- Average: ${portfolio.average}/5`,
    "",
    "## Verification Checklist",
    ...portfolio.assets.verificationChecklist.map((item) => `- ${item}`),
    "",
    "## Responsible AI Reflection",
    portfolio.reflection,
    "",
    "## Mentor Note",
    portfolio.mentorNote,
  ].join("\n");
}
