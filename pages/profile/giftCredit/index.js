import React, { useContext } from "react";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import BackButton from "../../../components/backButton";
import { useGetProfile } from "../../../core/hooks/useProfileApi";
import { UserContext } from "../../_app";
import RTLTextField from "../../../components/RTLTextField";
import { Button } from "@mui/material";
import { usePostGiftCreditCode } from "../../../core/hooks/useServiceApi";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import instance from "../../../core/constants/request";
import { useRouter } from "next/router";

const GiftCredit = () => {
  const windowWidth = useWindowWidth();
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = React.useState("");
  const postGiftCredit = usePostGiftCreditCode();
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postGiftCredit.mutateAsync(token);
      if (res.status === 200) {
        instance.get("/api/users/profile/").then((res) => {
          setUser(res?.data);
        });
        toast.success(res.data.message);
        setToken("");
        router.push("/profile");
      } else {
        toast.error(res.message);
        setError(res.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col min-w-[60%] md:w-full mx-3 md:mx-0 rounded-md pt-6 px-3 ">
      {windowWidth >= 768 ? null : <BackButton title="افزایش اعتبار هدیه" />}
      <div className="flex flex-col  justify-center items-center pb-3 pt-6 px-2 md:m-0 md:mt-4 gap-4 mx-auto bg-white rounded-xl w-full">
        <p className=" w-full hidden md:block font-semibold">
          افزایش اعتبار هدیه
        </p>
        <div className="w-3/4 md:w-4/12 h-[5rem] justify-center flex flex-col items-center m-2 border-[#EBEBEB] border-2 border-solid rounded-xl bg-[#F8F8F9]">
          <p className="mb-2 mt-0 text-[#0361FF] text-xs">
            امتیاز شما {user?.bonus_points} تومان
          </p>
          <p className="text-[#1A1D1F] font-[700] m-1">اعتبار فعلی</p>
        </div>
        <div>
          <RTLTextField
            variant="outlined"
            name="token"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError("");
            }}
            placeholder="کد افزایش اعتبار هدیه"
            hiddenLabel
            error={error}
            sx={{
              xs: {
                width: "100%",
              },

              height: "4.125rem",
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: ".6rem",
              },
              borderRadius: ".6rem",
            }}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <Button
          disabled={!!!token}
          onClick={handleSubmit}
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

export default GiftCredit;
