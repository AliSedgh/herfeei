import { Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SwDev = () => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const router = useRouter();
  let deferredPrompt;

  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  };

  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  useEffect(() => {
    if (isIOS() && !isInStandaloneMode()) {
      setTimeout(() => {
        setShowInstallModal(true);
      }, [5000]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      return false;
    });
  }, []);

  //   const handleShowInstallPrompt = () => {
  //     if (deferredPrompt) {
  //       deferredPrompt.prompt();
  //       setShowInstallModal(false);
  //       deferredPrompt = null;
  //     }
  //   };
  const handleShowInstallPromptIos = () => {
    router.push("/ios-pwa");
    setShowInstallModal(false);
    deferredPrompt = null;
  };

  return (
    <>
      <div
        className={`${
          showInstallModal ? "block" : "hidden"
        } cursor-pointer rounded-lg w-[86%] xs:w-[350px] fixed left-[50%] xs:left-0 xs:right-[50px] top-[110px] -translate-x-[50%] xs:-translate-x-0 bg-white/90 [border:1px_solid_#ccc] z-[10000] text-black h-[70px]`}
      >
        <div className="w-full h-full relative">
          <div
            onClick={handleShowInstallPromptIos}
            className="w-full h-full text-[13px] 3xs:text-[14px] 2xs:text-[16px] flex justify-center items-center"
          >
            برای نصب نسخه <span className="mx-1 text-[blue]"> PWA </span> اینجا
            کلیک کنید
          </div>
          <Close
            onClick={() => setShowInstallModal(false)}
            className="absolute left-[5px] top-[5px] text-[20px] text-gray-600 z-[10001]"
          />
        </div>
      </div>
    </>
  );
};

export default SwDev;
