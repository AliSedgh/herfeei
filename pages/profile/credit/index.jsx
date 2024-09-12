import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import RTLTextField from "../../../components/RTLTextField";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import {
  useGetProfile,
  useIncreaseCredit,
} from "../../../core/hooks/useProfileApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import formatNumberWithCommas, {
  removeCommas,
} from "../../../core/utils/formatNumbersWithCommas";

export default function Credit() {
  const windowWidth = useWindowWidth();
  const [amount, setAmount] = React.useState("");
  const [amountError, setAmountError] = React.useState(false);
  const { data: profile } = useGetProfile();

  const router = useRouter();

  const increaseCredit = useIncreaseCredit();

  const handlePayment = () => {
    if (+removeCommas(amount) < 5000) {
      toast.error("حداقل مبلغ پرداخت ۵۰۰۰ تومان می باشد");
      setAmountError(true);
      return;
    }
    increaseCredit.mutate(
      { amount: +removeCommas(amount), service_name: "بابت افزایش اعتبار" },
      {
        onSuccess: (res) => {
          router.push(res?.["bazaar-pay-url"]);
        },
      }
    );
  };

  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="افزایش اعتبار" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="flex justify-center flex-col items-center">
          <div className="w-[19.25rem] h-[5rem] justify-center flex flex-col items-center m-2 border-[#EBEBEB] border-2 border-solid rounded-xl bg-[#F8F8F9]">
            <p className="text-[#0361FF] font-[700] text-sm m-1">
              {profile?.data?.credit} تومان
            </p>
            <p className="text-[#1A1D1F] font-[700] m-1">اعتبار فعلی</p>
          </div>
          <div>
            <RTLTextField
              variant="outlined"
              name="amount"
              value={formatNumberWithCommas(removeCommas(amount))}
              onChange={(e) => {
                const data = removeCommas(e.target.value);
                if (!isNaN(data)) {
                  setAmount(data);
                }
              }}
              placeholder="مبلغ افزایش اعتبار را وارد کنید"
              hiddenLabel
              error={amountError}
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
            {amountError && (
              <p className="text-red-500 text-xs">
                حداقل مبلغ پرداخت ۵۰۰۰ تومان می باشد
              </p>
            )}
          </div>

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
    </>
  );
}
