import React from "react";
import { ExpertProfileForm } from "../../profile/ExpertProfileForm";

const ExpertProfile = ({ initialValues }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-3 flex flex-col mx-auto">
      <ExpertProfileForm initialValues={initialValues} />
    </div>
  );
};

export { ExpertProfile };
