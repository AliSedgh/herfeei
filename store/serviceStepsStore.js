// useServiceStepsStore.js
import { create } from "zustand";

const useServiceStepsStore = create((set) => ({
  currentStep: 0,
  stage: 1,
  totalSteps: 0, // New state for totalSteps
  selectedOptions: {},
  showServiceForWho: false,
  showUserDetail: false,
  me: false,
  selectedExpert: null,
  showAddresses: false,
  showSelectedDate: false,
  showSelectedExpert: false,
  breadcrumbPaths: [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
  ],
  setSelectedExpert: (value) => set({ selectedExpert: value }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setStage: (step) => set({ stage: step }),
  setShowAddresses: (value) => set({ showAddresses: value }),
  setSelectedOptions: (options) => set({ selectedOptions: options }),
  setShowServiceForWho: (value) => set({ showServiceForWho: value }),
  setShowUserDetail: (value) => set({ showUserDetail: value }),
  setMe: (value) => set({ me: value }),
  setSelectedDate: (value) => set({ showSelectedDate: value }),
  setSelectedExpert: (value) => set({ showSelectedExpert: value }),
  setBreadcrumbPaths: (paths) => set({ breadcrumbPaths: paths }),
  handleNext: () =>
    set((state) => ({
      currentStep:
        state.currentStep < state.totalSteps - 1
          ? state.currentStep + 1
          : state.currentStep,
    })),
  handleBack: () =>
    set((state) => ({
      currentStep:
        state.showServiceForWho || state.showUserDetail
          ? state.currentStep
          : state.currentStep > 0
          ? state.currentStep - 1
          : 0,
      breadcrumbPaths: state.breadcrumbPaths.slice(0, -1),
      showUserDetail: state.showUserDetail ? false : state.showServiceForWho,
      showServiceForWho: state.showUserDetail ? true : state.showServiceForWho,
    })),
  // ... other functions
}));

export default useServiceStepsStore;
