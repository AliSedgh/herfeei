import React, { useState, useEffect } from "react";
import Image from "next/image";
import Popover from "@mui/material/Popover";
import useWindowWidth from "../../core/utils/useWindowWidth";
import { useRouter } from "next/router";

export default function ServiceItem({
  id,
  link,
  category_image,
  title,
  children,
  slug,
}) {
  const windowWidth = useWindowWidth();
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const router = useRouter();
  const [firstList, setFirstList] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState("bottom");
  const popoverLeaveDelay = 100; // delay in ms
  let popoverLeaveTimer;

  const [anchorElCh, setAnchorElCh] = useState(null);
  const [openCh, setOpenCh] = useState(false);
  const popoverLeaveDelayCh = 100; // delay in ms
  let popoverLeaveTimerCh;

  const handleMouseEnter = (event) => {
    if (windowWidth > 768) {
      clearTimeout(popoverLeaveTimer);
      setAnchorEl(event.currentTarget);
      setOpen(true);
      setPopoverPosition(event.clientY > windowHeight / 2 ? "top" : "bottom");
    }
  };

  const handleMouseLeave = () => {
    if (windowWidth > 768) {
      popoverLeaveTimer = setTimeout(() => {
        setOpen(false);
        setOpenCh(false);
      }, popoverLeaveDelay);
    }
  };

  // console.log("pi:children",children)

  // const handlePopoverEnter = () => {
  //   clearTimeout(popoverLeaveTimer);
  // };
  const handleMouseEnterCh = (event, index) => {
    if (windowWidth > 768) {
      clearTimeout(popoverLeaveTimerCh);
      setAnchorElCh(event.currentTarget);
      setOpenCh(true);
      setFirstList(() => children[index].children);
    }
  };
  const handleMouseLeaveCh = () => {
    if (windowWidth > 768 && !openCh) {
      popoverLeaveTimerCh = setTimeout(() => {
        setOpenCh(false);
      }, popoverLeaveDelayCh);
    }
  };
  // const handlePopoverEnterCh = () => {
  //   clearTimeout(popoverLeaveTimerCh);
  // };

  const popoverStyles = {
    pointerEvents: "none",
    "& .MuiPopover-paper": {
      pointerEvents: "auto",
      borderRadius: "10px", // Add border radius here
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(-10px)",
        borderWidth: "10px",
        borderStyle: "solid",
        borderColor: "transparent transparent white transparent",
      },
    },
  };

  useEffect(() => {
    // console.log("firstList", firstList);
    return () => {
      clearTimeout(popoverLeaveTimer);
    };
  }, [firstList]);

  useEffect(() => {
    return () => {
      clearTimeout(popoverLeaveTimerCh);
    };
  }, []);

  return (
    <div
      key={id}
      className="cursor-pointer text-center flex flex-col items-center my-2 -md:basis-[25%]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        router.push({
          pathname: "/services",
          query: {
            item: title,
          },
        });
      }}
    >
      {category_image && (
        <Image
          src={category_image}
          width={67}
          height={67}
          alt="icon"
          style={{ borderRadius: "10px" }}
        />
      )}

      <p className="mt-2 mb-0 text-[#424242] text-[12px] md:text-[14px] font-[600] w-[4.5rem]">
        {title}
      </p>
      <Popover
        id="mouse-over-popover"
        sx={popoverStyles}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: popoverPosition,
          horizontal: "center",
        }}
        transitionDuration={600}
        transformOrigin={{
          vertical: popoverPosition === "bottom" ? "top" : "bottom",
          horizontal: "center",
        }}
        onClose={handleMouseLeave}
        disableRestoreFocus
      >
        <div className="max-h-[301px] py-1">
          {children.map((item, index) => (
            <div key={index}>
              <div
                className="flex bg-white items-center justify-between ml-1 rounded-lg mb-1 cursor-pointer w-[13rem] max-h-fit py-2 hover:bg-[#F0F0F1]"
                key={item.id}
                onClick={() => {
                  router.push(`/services/${item.slug}`);
                }}
                onMouseEnter={(e) => handleMouseEnterCh(e, index)}
                onMouseLeave={handleMouseLeaveCh}
              >
                <div className="rounded-xl flex items-center">
                  <div>
                    <p className="m-0 mr-2 p-0 text-[#1A1D1F] text-sm font-[600]">
                      {item.title}
                    </p>
                  </div>
                </div>
                <Image
                  className="ml-2"
                  src="/icons/main-menu-arrow.svg"
                  width={15}
                  height={15}
                  alt="arrow icon"
                />
              </div>
            </div>
          ))}
        </div>
      </Popover>
      {firstList.length > 0 && (
        <Popover
          id="mouse-over-popover-ch"
          sx={popoverStyles}
          open={openCh}
          anchorEl={anchorElCh}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleMouseLeaveCh}
          transitionDuration={600}
          disableRestoreFocus
          PaperProps={
            {
              // onMouseEnter: handlePopoverEnterCh,
              // onMouseLeave: handleMouseLeaveCh,
            }
          }
        >
          <div className="max-h-[301px] py-1">
            {firstList.map((it) => (
              <div
                key={it.id}
                className="flex bg-white items-center justify-between ml-1 rounded-lg mb-1 cursor-pointer w-[13rem] max-h-fit py-2 hover:bg-[#F0F0F1]"
                onClick={() => {
                  handleMouseLeaveCh();
                  let parent = undefined;
                  children?.forEach((item) => {
                    item.children.forEach((child) => {
                      if (child.title == it.title) parent = item.slug;
                    });
                  });
                  router.push(
                    `/services/${encodeURIComponent(
                      it?.title.replace(/\s/g, "-")
                    )}/${parent}/`
                  );
                }}
              >
                <div className="rounded-xl flex items-center">
                  <div>
                    <p className="m-0 mr-2 p-0 text-[#1A1D1F] text-sm font-[600]">
                      {it.title}
                    </p>
                  </div>
                </div>
                <Image
                  className="ml-2"
                  src="/icons/main-menu-arrow.svg"
                  width={15}
                  height={15}
                  alt="arrow icon"
                />
              </div>
            ))}
          </div>
        </Popover>
      )}
    </div>
  );
}
