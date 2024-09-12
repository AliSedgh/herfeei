import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ChangeExpertButton = ({ orderId }) => {
  const router = useRouter();
  const handleChangeExpert = () => {
    localStorage.setItem("orderId", orderId);

    const navigateRoute = `/services/change-expert`;
    router.push(navigateRoute);
  };
  return (
    <Button
      onClick={handleChangeExpert}
      variant="outlined"
      className="bg-primary text-white md:w-[173px] xs:h-[46px] rounded-[8px] p-2 text-[10px] xs:text-[16px] h-[38px] w-full"
    >
      تغییر متخصص
    </Button>
  );
};

export default ChangeExpertButton;
