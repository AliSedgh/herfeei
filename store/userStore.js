// useUserStore.js
import { create } from "zustand";
import axios from "axios";
import { useMutation } from "react-query";

const useUserStore = create((set) => ({
  editModes: {
    avatar:null,
    full_name: "",
    date_of_birth: "",
    mail:"",
    city: Number,
    card_number: "",
    gender: "",
    shaba_number: "",
  },
  setEditModes: (newEditModes) => set({ editModes: newEditModes }),
  toggleEditMode: (fieldName) =>
    set((state) => ({
      editModes: {
        ...state.editModes,
        [fieldName]: !state.editModes[fieldName],
      },
    })),
}));

const useSubmitEditMutation = () => {
  const { mutate: submitEdit } = useMutation(
    async ({ fieldName, value }) => {
      const apiUrl = "/api/users/profile/"; // Change this to your actual API endpoint
      const response = await axios.put(apiUrl, { [fieldName]: value });
      return response.data;
    },
    {
      onSuccess: (data) => {
        // Handle success or update state as needed
      },
      onError: (error) => {
        // Handle error as needed
      },
    }
  );

  return { submitEdit }; // Return the submitEdit function
};

export { useUserStore, useSubmitEditMutation };
