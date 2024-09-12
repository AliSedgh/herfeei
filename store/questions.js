import { create } from "zustand";

const useQuestionStore = create((set) => ({
  questions: [],
  setQuestions: (question) => set(question),
}));

export default useQuestionStore;
