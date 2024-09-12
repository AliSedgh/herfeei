import React from "react";
import BackButton from "../../../components/backButton";
import UserProfileForm from "../../../components/profile/userProifleForm";
import useWindowWidth from "../../../core/utils/useWindowWidth";

export default function Profile() {
  const windowWidth = useWindowWidth();
  return (
    <>
      <div className="flex flex-col min-w-[60%] md:w-full mx-3 md:mx-0">
        {windowWidth >= 768 ? null : (
          <BackButton title="ویرایش اطلاعات کاربری" />
        )}
        <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-full">
          <UserProfileForm />
        </div>
      </div>
    </>
  );
}
