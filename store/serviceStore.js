// servicesStore.js
import { create } from "zustand";
import { getServicesCategories } from "../core/api/serviceApi";

const useServicesStore = create((set) => ({
  categories: [],
  selectedCategory: "همه",
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  fetchCategories: async () => {
    // Check if categories are already fetched
    if (useServicesStore.getState().categories.length === 0) {
      try {
        // Fetch categories from API

        const fetchedCategories = await getServicesCategories();

        // Save categories to the store
        useServicesStore.getState().setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  },
}));

export default useServicesStore;
