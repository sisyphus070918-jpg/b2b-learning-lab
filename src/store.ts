import { useEffect, useState } from "react";
export type Answer = {
  type: string;
  grade: string;
  position: string;
  reason: string;
  strategy: string;
};
export type Result = Answer & { score: number; date: string };
export type State = {
  version: 1;
  selectedDay: number;
  taskDays: Record<string, string[]>;
  notes: { id: string; date: string; text: string; day?: number }[];
  activity: string[];
  lessons: number[];
  exercise: Record<string, string>;
  answers: Record<string, Result>;
  caseDrafts: Record<string, Answer>;
  mistakes: { id: string; date: string; score: number }[];
  projectIndex: number;
  projects: Record<string, { fields: string[]; submitted: boolean }>;
  diagnostic: { answers: number[]; completedAt?: string };
  skillEvidence: Record<string, number>;
  portfolio: Record<string, { summary: string; evidence: string; demo: string; savedAt: string }>;
  mentorMessages: { id: string; role: "user" | "mentor"; text: string; date: string }[];
  icp: string;
  noteDraft: string;
};
const KEY = "b2b-learning-lab-v1";
const fresh = (): State => ({
  version: 1,
  selectedDay: 1,
  taskDays: {},
  notes: [],
  activity: [],
  lessons: [],
  exercise: {},
  answers: {},
  caseDrafts: {},
  mistakes: [],
  projectIndex: 0,
  projects: {},
  diagnostic: { answers: [] },
  skillEvidence: {},
  portfolio: {},
  mentorMessages: [],
  icp: "",
  noteDraft: "",
});
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
function read(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const v = JSON.parse(raw);
    if (
      v.version !== 1 ||
      !Array.isArray(v.activity) ||
      !Array.isArray(v.lessons) ||
      !v.taskDays ||
      !Array.isArray(v.notes) ||
      !v.answers
    )
      throw Error();
    const merged = { ...fresh(), ...v } as State;
    merged.selectedDay = Math.max(1, Math.min(28, Number(merged.selectedDay) || 1));
    // Earlier versions stored the original Day 1 tasks under the calendar date.
    // Preserve that progress when the new 28-day selector is introduced.
    if (!merged.taskDays["day-1"] && merged.taskDays[today()]) {
      const legacy = merged.taskDays[today()];
      const map: Record<string, string> = {
        product: "learn",
        terms: "notes",
        icp: "practice",
        cases: "deliver",
        review: "review",
      };
      merged.taskDays["day-1"] = legacy.map((id: string) => map[id]).filter(Boolean);
    }
    return merged;
  } catch {
    return fresh();
  }
}
export function useLearning() {
  const [state, setState] = useState<State>(read);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);
  return { state, setState, storageError };
}
export function active(s: State): State {
  return { ...s, activity: Array.from(new Set([...s.activity, today()])) };
}
export function streak(dates: string[]) {
  const set = new Set(dates);
  let d = new Date();
  let n = 0;
  if (!set.has(today())) d.setDate(d.getDate() - 1);
  while (
    set.has(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    )
  ) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
export function download(name: string, content: string, type = "text/plain") {
  const url = URL.createObjectURL(
    new Blob([content], { type: `${type};charset=utf-8` }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
