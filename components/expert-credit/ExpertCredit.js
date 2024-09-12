import React from "react";
import RTLTextField from "../RTLTextField";
import { Button } from "@mui/material";
import Image from "next/image";
import { useExpertIncreaseCredit } from "../../core/hooks/useExpertApi";
import { useRouter } from "next/router";

const ExpertCredit = () => {
  const [amount, setAmount] = React.useState(0);
  const expertIncreaseCredit = useExpertIncreaseCredit();
  const router = useRouter();
  const handlePayment = () => {
    expertIncreaseCredit.mutate(
      { amount: +amount, service_name: "بابت افزایش اعتبار" },
      {
        onSuccess: (res) => {
          router.push(res?.["bazaar-pay-url"]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
      <div className="flex justify-center flex-col items-center">
        <div className="w-[19.25rem] h-[5rem] justify-center flex flex-col items-center m-2 border-[#EBEBEB] border-2 border-solid rounded-xl bg-[#F8F8F9]">
          <p className="text-[#0361FF] font-[700] text-sm m-1">0 تومان</p>
          <p className="text-[#1A1D1F] font-[700] m-1">اعتبار فعلی</p>
        </div>

        <RTLTextField
          variant="outlined"
          name="amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/[^0-9]/g, "");
            setAmount(numericValue);
          }}
          placeholder="مبلغ افزایش اعتبار را وارد کنید"
          hiddenLabel
          sx={{
            width: "19.25rem",
            height: "4.125rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: ".6rem",
            },
            borderRadius: ".6rem",
          }}
          InputProps={{
            endAdornment: (
              <p className="text-[#999BA7] font-[700] m-4">تومان</p>
            ),
          }}
        />

        <Button
          disabled={!!!amount}
          onClick={handlePayment}
          className="disabled:opacity-50"
          variant="contained"
          sx={{
            fontSize: "14px",
            m: ".4rem",
            height: "2.375rem",
            borderRadius: ".6rem",
            px: "3rem",
          }}
        >
          افزایش اعتبار{" "}
        </Button>
      </div>
    </div>
  );
};

export default ExpertCredit;
