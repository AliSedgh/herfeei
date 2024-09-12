import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./login.module.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AlertContext, CityContext, UserContext } from "../../pages/_app";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import RTLTextField from "../RTLTextField";
import instance from "../../core/constants/request";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { CloseRounded } from "@mui/icons-material";

export default function Login({ showLogin, setShowLogin }) {
  const [error, setError] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [timer, setTimer] = useState(0);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = React.useState("");
  const { setUser, setUserPhone } = useContext(UserContext);
  const { city, setCity } = useContext(CityContext);
  const optLength = 6;
  const regex = /^09[0-9]{9}$/; // first zero added to test
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviter = searchParams.get("inviter");

  const handleChange = (e) => {
    if (regex.test(e.target.value)) {
      setError("");
    }
    if (e.target.value.length == 11) {
      setError("");
    }
    if (e.target.value === "" || e.target.value.length < 12) {
      setMobilePhone(e.target.value);
    }
  };

  const handleSubmitMobile = () => {
    setOtp("");

    if (!regex.test(mobilePhone)) {
      return setError("لطفا شماره موبایل را صحیح وارد کنید");
    }
    if (mobilePhone.length < 11) {
      return setError("لطفا شماره موبایل را صحیح وارد کنید");
    }
    const model = {
      username: mobilePhone.slice(1),
    };
    instance
      .post("/api/auth/", model)
      .then(() => {
        setOtpMode(true);
        setTimer(Date.now() + 60000);
        setError("");
      })
      .catch((error) => {
        const seconds = error.response.data.slice(0, 2).trim();
        setError(`لطفا ${seconds} ثانیه دیگر مجددا تلاش کنید`);
      });
  };
  const handleSubmitOtp = () => {
    if (otp.length !== optLength) {
      return setError("لطفا کد ورود را صحیح وارد کنید");
    }
    const model = {
      token: otp,
      username: mobilePhone.slice(1),
      ...(inviter && { inviter_code: inviter }),
    };
    instance
      .post("/api/auth/verify/", model)
      .then((res) => {
        setShowLogin(false);
        setOtpMode(false);
        setOtp("");
        setMobilePhone("");
        localStorage.setItem("access_token", res.data.token.access);
        localStorage.setItem("refresh_token", res.data.token.refresh);
        localStorage.setItem("user_role", res.data.role);
        localStorage.setItem("user_name", res.data.username);
        city && localStorage.setItem("city_id", city);
        setUserPhone(res.data.username);
        instance
          .get("/api/users/profile/")
          .then((res) => {
            // add token data to profile data and context
            setUser(res.data);
            setShowLogin(false);
          })
          .catch(() => {});
      })
      .catch((error) => {
        setError("کد وارد شده اشتباه است");
      });
  };

  useEffect(() => {
    if (otp.length === optLength) {
      handleSubmitOtp();
    }
  }, [otp]);
  const countDownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // when countdown finishes
      return (
        <Button
          fullWidth
          type="button"
          variant="filled"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmitMobile}
        >
          ارسال مجدد کد
        </Button>
      );
    } else {
      // Render a countdown
      return (
        <p className="mt-3 font-medium	text-lg">
          {minutes}:{seconds}
        </p>
      );
    }
  };
  const mobileRef = useRef();
  useEffect(() => {
    mobileRef.current?.focus();
  }, [showLogin]);
  const handleChangeNumber = () => {
    setOtpMode(false);
    setOtp("");
  };
  if (!showLogin) {
    return null;
  }
  return (
    <>
      <div className="w-full h-[100vh] fixed z-[1350] top-0 left-0 bg-black/50"></div>
      <div
        className="flex w-96 flex-col card items-center p-4 center"
        style={{ zIndex: 1400 }}
      >
        <div className="flex justify-start w-full ">
          <CloseRounded
            className="cursor-pointer bg-slate-200 p-1 rounded-full hover:scale-125 transition-all duration-150"
            onClick={() => setShowLogin(false)}
          />
        </div>
        {!otpMode ? (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PhoneAndroidOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              لطفا موبایل خود را وارد کنید
            </Typography>
            <div className="mt-1">
              <RTLTextField
                onChange={handleChange}
                value={mobilePhone}
                margin="normal"
                required
                fullWidth
                placeholder="09361234567"
                id="mobilePhone"
                label="شماره موبایل"
                name="mobilePhone"
                autoComplete="tel"
                inputRef={(elm) => (mobileRef.current = elm)}
                autoFocus
                error={!!error}
                helperText={error}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitMobile(e);
                  }
                }}
              />
              <Button
                fullWidth
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmitMobile}
              >
                ارسال کد تأیید
              </Button>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500 ">
              <p> ورود یا ثبت نام در حرفه ای به معنای پذیرش تمام </p>
              <a
                href="/legal/privacyPolicy"
                target="_blank"
                className="text-blue-500 "
              >
                شرایط و قوانین حریم خصوصی
              </a>{" "}
              این سایت می باشد
            </div>
          </>
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              کد ارسال شده را وارد کنید
            </Typography>
            <div className="flex items-center flex-col mt-1">
              <OtpInput
                inputType="number"
                shouldAutoFocus
                inputStyle={styles.formField}
                containerStyle={{ direction: "ltr" }}
                value={otp}
                onChange={(v) => {
                  setError("");
                  setOtp(v);
                }}
                numInputs={optLength}
                renderSeparator={"\u00A0\u00A0\u00A0"}
                renderInput={(props) => <input {...props} />}
              />
              <Typography component="p" variant="body1" color="error" mt={2}>
                {error}
              </Typography>
              <Countdown
                key={timer}
                date={timer}
                renderer={countDownRenderer}
              />
              <p
                className="cursor-pointer	hover:text-violet-700	"
                onClick={handleChangeNumber}
              >
                تغییر شماره وارد شده
              </p>

              <div className="mt-6 text-center text-xs text-gray-500 ">
                <p> ورود یا ثبت نام در حرفه ای به معنای پذیرش تمام </p>
                <a
                  href="/legal/privacyPolicy"
                  target="_blank"
                  className="text-blue-500 "
                >
                  شرایط و قوانین حریم خصوصی
                </a>{" "}
                این سایت می باشد
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
