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
};

let _entries: AlumnusNoteEntry[] = [];
const _listeners = new Set<() => void>();

export const alumnusNotesStore = {
  getAll: () => _entries,
  add: (entry: AlumnusNoteEntry) => {
    _entries = [..._entries, entry];
    _listeners.forEach((fn) => fn());
  },
  subscribe: (fn: () => void): (() => void) => {
    _listeners.add(fn);
    return () => { _listeners.delete(fn); };
  },
};
