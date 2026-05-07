export type AlumnusNoteEntry = {
  studentId: string;
  studentName: string;
  studentProgram: string;
  studentCohort: string;
  topic: string;
  strengthTags: string[];
  hiringSignal: string;
  privateNotes: string;
  savedAt: Date;
  reflectionStatus: "reflected" | "unreflected";
};

let _entries: AlumnusNoteEntry[] = [];
const _listeners = new Set<() => void>();

export const alumnusNotesStore = {
  getAll: () => _entries,
  add: (entry: Omit<AlumnusNoteEntry, "reflectionStatus"> & { reflectionStatus?: "reflected" | "unreflected" }) => {
    _entries = [..._entries, { reflectionStatus: "reflected", ...entry }];
    _listeners.forEach((fn) => fn());
  },
  subscribe: (fn: () => void): (() => void) => {
    _listeners.add(fn);
    return () => { _listeners.delete(fn); };
  },
};

function seedMockEntries(): void {
  if (_entries.length > 0) return;
  _entries = [
    {
      studentId: "maya-chen",
      studentName: "Maya Chen",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Career pivot",
      strengthTags: ["Strong communicator", "Clear goals", "Coachable"],
      hiringSignal: "Strong candidate — keep an eye on",
      privateNotes:
        "Sharp on the pivot story. Knows exactly which roles she's targeting and why. Would refer once she has 1-2 more analytics projects in her portfolio.",
      savedAt: new Date("2026-05-01T17:30:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "sofia-reyes",
      studentName: "Sofia Reyes",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Portfolio review",
      strengthTags: ["Technical aptitude", "Self-aware", "Good follow-through"],
      hiringSignal: "I'd refer this person",
      privateNotes:
        "Solid portfolio — SQL and dbt work is real. Recommended she add a marketing-mix model project to round out the storytelling side.",
      savedAt: new Date("2026-04-23T14:00:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "liam-obrien",
      studentName: "Liam O'Brien",
      studentProgram: "MMA",
      studentCohort: "'25",
      topic: "Behavioral interview",
      strengthTags: ["Clear goals", "Well-prepared"],
      hiringSignal: "Promising — needs more experience",
      privateNotes:
        "Did the interview prep well. Stories were structured but a bit rehearsed — encouraged him to leave room for natural follow-ups.",
      savedAt: new Date("2026-04-14T11:00:00"),
      reflectionStatus: "reflected",
    },
    {
      studentId: "aisha-patel",
      studentName: "Aisha Patel",
      studentProgram: "MMA",
      studentCohort: "'26",
      topic: "Data case",
      strengthTags: [],
      hiringSignal: "",
      privateNotes: "",
      savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      reflectionStatus: "unreflected",
    },
  ];
}

seedMockEntries();
