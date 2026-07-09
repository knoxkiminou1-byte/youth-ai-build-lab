import { describe, expect, it } from "vitest";
import {
  averageRubricScore,
  canExportPortfolio,
  generateAssetPack,
  generatePortfolioPackage,
  nextCoachingQuestions,
  scoreProject,
  serializePortfolioPackage,
} from "./youth";

describe("Youth AI Build Lab logic", () => {
  const project = {
    idea: "I want to start a basketball training business for kids in Oakland",
    audience: "parents of middle-school athletes",
    claims: ["I can help young players build confidence"],
    mentorApproved: false,
    reflectionComplete: true,
    studentRevisionCount: 1,
  };

  it("scores project clarity and truthfulness", () => {
    expect(scoreProject(project)).toMatchObject({ clarity: 5, audienceFit: 5, truthfulness: 5 });
  });

  it("flags risky overclaims", () => {
    const scored = scoreProject({ ...project, claims: ["Guaranteed $10k in one month"] });
    expect(scored.truthfulness).toBeLessThan(5);
    expect(scored.riskyClaims).toHaveLength(1);
  });

  it("requires mentor approval, reflection, and student revision before export", () => {
    expect(canExportPortfolio(project)).toBe(false);
    expect(canExportPortfolio({ ...project, mentorApproved: true })).toBe(true);
  });

  it("asks practical coaching questions", () => {
    expect(nextCoachingQuestions(project)).toContain("What needs to be verified?");
  });

  it("generates usable project assets", () => {
    const assets = generateAssetPack({ ...project, projectName: "CourtSpark", studentName: "Jordan" });
    expect(assets.sponsorPitch).toContain("CourtSpark");
    expect(assets.verificationChecklist).toContain("Check every claim against real proof.");
  });

  it("creates an exportable portfolio package", () => {
    const ready = { ...project, projectName: "CourtSpark", mentorApproved: true };
    expect(averageRubricScore(ready)).toBeGreaterThan(0);
    expect(generatePortfolioPackage(ready).exportReady).toBe(true);
    expect(serializePortfolioPackage(ready)).toContain("# CourtSpark");
  });
});
