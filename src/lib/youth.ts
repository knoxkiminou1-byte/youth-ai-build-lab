export type YouthProject = {
  idea: string;
  audience: string;
  claims: string[];
  mentorApproved: boolean;
  reflectionComplete: boolean;
  studentRevisionCount: number;
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
