export const project = {
  "name": "Youth AI Build Lab",
  "headline": "A guided AI studio for young creators, athletes, and entrepreneurs.",
  "summary": "Youth AI Build Lab helps students turn rough ideas into business assets, project pages, outreach materials, and portfolio-ready case studies.",
  "githubUrl": "https://github.com/knoxkiminou1-byte/youth-ai-build-lab",
  "tags": [
    "AI Fluency",
    "Youth Programs",
    "Mentor Review",
    "Portfolio Export",
    "AAFC"
  ],
  "metrics": [
    {
      "label": "Project Types",
      "value": "6",
      "detail": "guided templates"
    },
    {
      "label": "Rubric",
      "value": "5",
      "detail": "review dimensions"
    },
    {
      "label": "Mentor Gate",
      "value": "On",
      "detail": "export approval"
    },
    {
      "label": "Reflection",
      "value": "Required",
      "detail": "responsible AI log"
    }
  ],
  "preview": [
    {
      "label": "Idea Clarifier",
      "value": "Live",
      "detail": "turns rough ideas into plans"
    },
    {
      "label": "Claude Coach",
      "value": "4.4",
      "detail": "rubric average"
    },
    {
      "label": "Mentor Queue",
      "value": "12",
      "detail": "projects to review"
    },
    {
      "label": "Portfolio Export",
      "value": "Locked",
      "detail": "reflection required"
    }
  ],
  "screens": [
    {
      "id": "studio",
      "label": "Studio",
      "title": "Student build workspace",
      "description": "Students choose a project template and work through idea, audience, offer, asset, and reflection steps.",
      "items": [
        {
          "kicker": "Templates",
          "title": "Six practical outputs",
          "copy": "Brand pages, athlete opportunity pages, press kits, landing pages, event campaigns, and community pitches."
        },
        {
          "kicker": "Progress",
          "title": "Stage-based coaching",
          "copy": "The studio makes the next action obvious without turning the project into a generic school LMS."
        },
        {
          "kicker": "Ownership",
          "title": "Student revision required",
          "copy": "Generated drafts are marked as AI-assisted until the student edits and reflects."
        }
      ]
    },
    {
      "id": "coach",
      "label": "Claude Coach",
      "title": "Rubric-based creative feedback",
      "description": "The coaching layer clarifies ideas, drafts assets, and critiques work using a stable rubric.",
      "items": [
        {
          "kicker": "Clarity",
          "title": "Understandable fast",
          "copy": "Feedback checks whether the project can be understood by parents, sponsors, mentors, or customers."
        },
        {
          "kicker": "Truth",
          "title": "No fake claims",
          "copy": "The coach flags exaggerated income, credentials, stats, or unverified achievements."
        },
        {
          "kicker": "Next Step",
          "title": "Practical action",
          "copy": "Every coaching result ends with a revision plan and verification checklist."
        }
      ]
    },
    {
      "id": "mentor",
      "label": "Mentor",
      "title": "Program dashboard",
      "description": "Mentors can see progress, stuck points, rubric scores, reflection quality, and export readiness.",
      "items": [
        {
          "kicker": "Review",
          "title": "Approval gate",
          "copy": "Portfolio exports require mentor review before final presentation."
        },
        {
          "kicker": "Cohort",
          "title": "Stuck-point visibility",
          "copy": "Program leads can spot who needs help and why."
        },
        {
          "kicker": "Reflect",
          "title": "AI use log",
          "copy": "Students document what AI helped with, what they changed, and what needs human review."
        }
      ]
    }
  ],
  "capabilities": [
    {
      "title": "Idea clarification",
      "copy": "Turns vague goals into audiences, offers, risks, and next questions."
    },
    {
      "title": "Asset generation",
      "copy": "Drafts outreach copy, landing sections, captions, flyers, and case-study pages."
    },
    {
      "title": "Rubric coaching",
      "copy": "Scores clarity, audience fit, truthfulness, feasibility, and polish."
    },
    {
      "title": "Portfolio export",
      "copy": "Packages the project with reflection and mentor notes."
    }
  ],
  "evals": [
    {
      "name": "Prompt coaching",
      "score": 93
    },
    {
      "name": "Truthfulness",
      "score": 95
    },
    {
      "name": "Youth clarity",
      "score": 92
    },
    {
      "name": "Mentor gate",
      "score": 100
    }
  ],
  "evaluationIntro": "The eval suite checks whether coaching asks useful questions, avoids fake claims, gives understandable feedback, and requires reflection before export.",
  "handoffIntro": "Youth AI Build Lab includes facilitator training, mentor review guidance, eval cases, and handoff materials for youth programs or AAFC-style cohorts.",
  "handoff": [
    {
      "title": "Facilitate",
      "copy": "Training guide explains how mentors introduce AI without replacing student ownership."
    },
    {
      "title": "Review",
      "copy": "Rubric and approval workflow keep mentors in the loop."
    },
    {
      "title": "Verify",
      "copy": "Students complete verification and reflection prompts before export."
    },
    {
      "title": "Transfer",
      "copy": "The handoff checklist covers cohorts, roles, demo data, and safe use."
    }
  ]
} as const;
