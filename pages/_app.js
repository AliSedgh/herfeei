import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import MainMenu from "../components/mainMenu";
import Index from "../components/authenticator";
import Footer from "../components/footer";
import Head from "next/head";
import Script from "next/script";
import instance from "../core/constants/request";
import Spinner from "../components/spinner";
import ProfileMenu from "./profile";
import useWindowWidth from "../core/utils/useWindowWidth";
import MobileFooter from "../components/mobileFooter";
import OutsideClickHandler from "react-outside-click-handler";
import Login from "../components/login";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import SwDev from "../components/swDev/SwDev";
import AOS from "aos";
import "aos/dist/aos.css";

const accessRules = {
  USER: {
    allowedRoutes: [
      "/",
      "/unauthorized",
      "/profile",
      "/profile/edit",
      "/profile/transactions",
      "/profile/addresses",
      "/profile/support",
      "/profile/referrals",
      "/profile/experts",
      "/profile/notifications",
      "/profile/guarantee",

      "/profile/rules",
      "/profile/guide",
      "/profile/credit",
      "/profile/gifts",
      "/services",
      "/services/unavailable-service",
      "/services/[slug]",
      "/services/[slug]/[id]",
      "/services/[slug]/[id]",
      "/services/questions",
      "/services/questions/[id]",
      "/services/order-description",
      "/services/change-expert",
      "/services/select-service-for-who",
      "/services/service-for-this-user",
      "/services/service-for-others",
      "/services/select-address",
      "/services/add-new-address",
      "/services/address-detail/[id]",
      "/services/select-date",
      "/services/select-expert",
      "/services/submit-order",
      "/profile/giftCredit",
      "/experts",
      "/experts/[id]",
      "/order",
      "/order/order-details",
      "/order/order-details/[id]",
      "/order/invoice-report/[id]",
      "/order/deposit-payment/[id]",
      "/expert-sign-up",
      "/receipt",
      "/receipt/",
      "/about-us",
      "/about-us/",
      "/ios-pwa",
    ],
  },
  EXPERT: {
    allowedRoutes: [
      "/",
      "/experts",
      "/experts/[id]",
      "/desk",
      "/desk/expert-order/[id]",
      "/desk/deposit-request",
      "/desk/deposit-request/[id]",
      "/desk/invoice-request",
      "/desk/invoice-request/[id]",
      "/unauthorized",
      "/profile",
      "/profile/edit",
      "/profile/transactions",
      "/profile/credit",
      "/profile/addresses",
      "/profile/support",
      "/profile/referrals",
      "/profile/experts",
      "/profile/experts/credit",
      "/profile/giftCredit",
      "/profile/notifications",
      "/profile/guarantee",
      "/profile/rules",
      "/profile/guide",
      "/services",
      "/services/unavailable-service",
      "/services/[slug]",
      "/services/[slug]/[id]",
      "/services/[slug]/[id]",
      "/services/questions",
      "/services/questions/[id]",
      "/services/change-expert",

      "/services/order-description",
      "/services/select-service-for-who",
      "/services/service-for-this-user",
      "/services/service-for-others",
      "/services/select-address",
      "/services/add-new-address",
      "/services/address-detail/[id]",
      "/services/select-date",
      "/services/select-expert",
      "/services/submit-order",
      "/order",
      "/order/order-details",
      "/order/order-details/[id]",
      "/order/invoice-report/[id]",
      "/order/deposit-payment/[id]",
      "/expert-sign-up",
      "/receipt",
      "/receipt/",
      "/about-us",
      "/about-us/",
      "/ios-pwa",
      "/desk/expert-order/edit/[id]",
    ],
  },
};
const publicRoutes = [
  "/",
  "/unauthorized",
  "/services",
  "/services/unavailable-service",
  "/services/[slug]",
  "/services/[slug]/[id]",
  "/services/[slug]/[id]",
  "/services/questions",
  "/services/questions/[id]",
  "/expert-sign-up",
  "/about-us",
  "/about-us/",
  "/ios-pwa",
  "/legal/privacyPolicy",
];

// Creating contexts
export const UserContext = createContext();
export const AlertContext = createContext();
export const CartContext = createContext();
export const CityContext = createContext();

// Initializing a QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

// Main App component
function MyApp({ Component, pageProps }) {
  const pathName = usePathname();
  const router = useRouter();
  const pathN = router.pathname;
  const windowWidth = useWindowWidth();
  const isProfileSubPage = router.pathname.startsWith("/profile/");
  const isShopSubPage = router.pathname.startsWith("/shop");
  const isServiceSubPage = router.pathname.startsWith("/services");
  const isExpertSubPage = router.pathname.startsWith("/experts/");
  const isProfilePage = router.pathname.startsWith("/profile");
  const isOrderPage = router.pathname.startsWith("/order");
  const isDeskPage = router.pathname.startsWith("/desk");
  const isExpertSignUpPage = router.pathname.startsWith("/expert-sign-up");
  const [showSpinner, setShowSpinner] = useState(true);
  const [user, setUser] = useState(null);
  const [city, setCity] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const city = localStorage.getItem("city_id");
    if (city) {
      setCity(city);
    }
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decodeToken = token && jwtDecode(token);
    if (!token) {
      if (publicRoutes.includes(pathN)) {
        // return undefined;
        setHasAccess(true);
      } else {
        router.replace("/unauthorized");
      }
    } else {
      const userRole = decodeToken?.role;

      const allowedRoutes = accessRules[userRole].allowedRoutes;

      if (allowedRoutes.includes(pathN)) {
        // return undefined;
        setHasAccess(true);
      } else {
        router.replace("/unauthorized");
      }
    }
    return () => setHasAccess(false);
  }, [pathN]);

  useEffect(() => {
    // local storage
    const accessToken = localStorage.getItem("access_token");
    // const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken)
      instance
        .get("/api/users/profile/")
        .then((res) => {
          // add token data to profile data and context
          setUser(res?.data);
        })
        .catch(() => {});
  }, []);

  // Axios request interceptor
  instance.interceptors.request.use(
    (config) => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
      setShowSpinner(true);
      return config;
    },
    (err) => {
      setShowSpinner(false);
      return Promise.reject(err);
    }
  );
  // Axios response interceptor
  instance.interceptors.response.use(
    (res) => {
      setShowSpinner(false);
      if (res?.data?.message) {
        setMessage(res.data.message);
      }
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        res.headers.Authorization = `Bearer ${access_token}`;
      }
      return res;
    },
    (err) => {
      setShowSpinner(false);
      if (err.response?.data?.message || err.message) {
        setError(err.response?.data?.message || err.message);
      }
      return Promise.reject(err);
    }
  );
  // Closing alert handler
  const handleCloseAlert = () => {
    setError("");
    setMessage("");
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!user && !accessToken) {
      setTimeout(() => {
        setShowLogin(true);
      }, 5000);
    }
  }, [user]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AlertContext.Provider value={{ setMessage, setError, error, message }}>
          <UserContext.Provider
            value={{
              userPhone,
              setUserPhone,
              user,
              setUser,
              setShowLogin,
              showLogin,
            }}
          >
            <CityContext.Provider value={{ city, setCity }}>
              {/* Head section with metadata */}
              <Head>
                <title>حرفه‌ای</title>
                <meta charset="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Herfeei" />
                <meta name="description" content="حرفه‌ای استخدام متخصص" />
                <meta name="theme-color" content="#ffffff" />
                <meta
                  name="apple-mobile-web-app-status-bar-style"
                  content="#ffffff"
                />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/11__iPad_Pro_M4_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/13__iPad_Pro_M4_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/iPhone_11__iPhone_XR_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/12.9__iPad_Pro_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/12.9__iPad_Pro_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/10.9__iPad_Air_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/10.9__iPad_Air_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/10.5__iPad_Air_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/11__iPad_Pro_M4_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/13__iPad_Pro_M4_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/8.3__iPad_Mini_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/10.2__iPad_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/8.3__iPad_Mini_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/iPhone_11__iPhone_XR_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/10.2__iPad_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                  href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                  href="/splash_screens/10.5__iPad_Air_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                  href="/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                />
                <link
                  rel="apple-touch-startup-image"
                  media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                  href="/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png"
                />

                <link
                  rel="icon"
                  type="image/png"
                  sizes="48x48"
                  href="/siteLogo-48-48.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="72x72"
                  href="/siteLogo-72-72.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="96x96"
                  href="/siteLogo-96-96.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="144x144"
                  href="/siteLogo-144-144.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="180x180"
                  href="/pwa-icon-180.png"
                />
                <link
                  rel="icon"
                  type="image/png"
                  sizes="192x192"
                  href="/siteLogo-192-192.png"
                />
              </Head>
              {/* Main menu */}
              {(isShopSubPage && windowWidth) ||
              (isProfilePage && windowWidth <= 768) ||
              (isDeskPage && windowWidth < 768) ||
              (isExpertSignUpPage && windowWidth < 768) ||
              (isExpertSubPage && windowWidth < 768) ||
              (isServiceSubPage && windowWidth < 768) ? null : (
                <MainMenu />
              )}
              {/* Container */}
              <div
                className={`${
                  isDeskPage
                    ? "min-h-[calc(100vh-82px)] md:min-h-[calc(100vh-82px)] !bg-slate-100"
                    : isOrderPage
                    ? "min-h-[calc(100vh-133px)] md:min-h-[calc(100vh-102px)]"
                    : pathName === "/"
                    ? "min-h-[calc(100vh-496px)] "
                    : "min-h-[100vh] "
                } w-full m-auto overflow-hidden`}
              >
                {/* Authenticator component */}
                <Index />
                {/* Snackbar for displaying alerts */}
                {/* <Snackbar
              open={!!error || !!message}
              autoHideDuration={5000}
              onClose={handleCloseAlert}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              key={error}
            >
              {error ? (
                <Alert
                  sx={{ direction: "rtl" }}
                  variant="filled"
                  severity={"error"}
                >
                  {error}
                </Alert>
              ) : (
                <Alert
                  onClose={handleCloseAlert}
                  variant="filled"
                  severity={"success"}
                >
                  {message}
                </Alert>
              )}
            </Snackbar> */}
                {/* Main content area */}
                <div
                  style={
                    !isProfilePage
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "#F4F6FA" }
                  }
                  className={`${
                    isDeskPage
                      ? "min-h-[calc(100vh-82px)] md:min-h-[calc(100vh-82px)] !bg-slate-100"
                      : isOrderPage
                      ? "min-h-[calc(100vh-133px)] md:min-h-[calc(100vh-102px)] "
                      : pathName === "/"
                      ? "min-h-[calc(100vh-496px)] "
                      : "min-h-[100vh] "
                  } bg-[#F4F6FA] md:px-[.5rem] lg:px-[2rem] xl:px-[2rem] w-full pb-[5rem] md:pb-0`}
                >
                  {isProfileSubPage && windowWidth >= 768 ? (
                    <>
                      {hasAccess ? (
                        <ProfileMenu>
                          <SwDev />
                          <Component {...pageProps} />
                        </ProfileMenu>
                      ) : (
                        <span className="fixed top-0 right-0 z-[2000] w-[100vw] h-[100vh] flex justify-center items-center bg-white" />
                      )}
                    </>
                  ) : (
                    <>
                      {hasAccess ? (
                        <>
                          <SwDev />
                          <Component {...pageProps} />
                        </>
                      ) : (
                        <span className="fixed top-0 right-0 z-[2000] w-[100vw] h-[100vh] flex justify-center items-center bg-white" />
                      )}
                    </>
                  )}
                </div>
                <ToastContainer />
                {/* Outside click handler for login modal */}
                <OutsideClickHandler onOutsideClick={() => setShowLogin(false)}>
                  <Login showLogin={showLogin} setShowLogin={setShowLogin} />
                </OutsideClickHandler>
                {/* Spinner component */}
                <Spinner show={showSpinner} />
              </div>
              {/* Footer */}
              {isShopSubPage ||
              isServiceSubPage ||
              (isProfileSubPage && windowWidth < 768) ||
              isExpertSubPage ||
              (isOrderPage && windowWidth > 768) ||
              (isDeskPage && windowWidth > 768) ? null : windowWidth > 768 ? (
                <Footer />
              ) : (
                <MobileFooter />
              )}
              {/* Google Analytics script */}
              {/* <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script id="google-analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', "${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}");
            `}
            </Script> */}

              <Script
                id="raychat-widget"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
            window.RAYCHAT_TOKEN = "b09d173f-9585-4768-a9c1-a5479ad6aa2f";
            (function () {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://widget-react.raychat.io/install/widget.js";
              s.async = true;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `,
                }}
              />

              {/* Google tag (gtag.js)   */}
              <Script
                strategy="lazyOnload"
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-EDC231KSD5"
              ></Script>
              <Script id="google-analytics" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EDC231KSD5', {
            page_path: window.location.pathname,
          });
         `}
              </Script>
            </CityContext.Provider>
          </UserContext.Provider>
        </AlertContext.Provider>
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
