import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NeighborhoodLocationSvg from "../../public/icons/neighborhoodLocation.svg";
import FinantialSvg from "../../public/icons/finantial.svg";
import ExpertProfileSvg from "../../public/icons/expertProfile.svg";
import NotifDashboardSvg from "../../public/icons/notifDashboard.svg";
import ExpertiesSvg from "../../public/icons/experties.svg";
import FinishedSvg from "../../public/icons/finished.svg";
import ActiveNotActiveSvg from "../../public/icons/activeNotActive.svg";
import SampleWorksSvg from "../../public/icons/sampleWorks.svg";
import ProfileBg from "../../public/icons/profile-bg.svg";
import { ExpertProfile } from "../deskSideBarPages/expertProfile/ExpertProfile";
import { DeskDashboardItem } from "../deskDashboardItem/DeskDashboardItem";
import { Experties } from "../deskSideBarPages/experties/Experties";
import { Finantial } from "../deskSideBarPages/finantial/Finantial";
import { NeighborhoodLocation } from "../deskSideBarPages/neighborhoodLocation/NeighborhoodLocation";
import { Finished } from "../deskSideBarPages/finished/Finished";
import { ActiveNotActive } from "../deskSideBarPages/activeNotActive/ActiveNotActive";
import { SampleWorks } from "../deskSideBarPages/sampleWorks/SampleWorks";
import { NotifDashboard } from "../deskSideBarPages/notifDashboard/NotifDashboard";
import useWindowWidth from "../../core/utils/useWindowWidth";
import { DeskDashboardHeader } from "../deskDashboardHeader/DeskDashboardHeader";
import { useGetExpertProfile } from "../../core/hooks/useExpertApi";
import ExpertCredit from "../expert-credit/ExpertCredit";
import ExpertComments from "../expert-comments/ExpertComments";
import { useQueryClient } from "react-query";

const expertProfile = {
  id: 0,
  expert_code: "",
  user: {
    id: 0,
    username: "",
    role: "",
    profile_name: "",
  },
  name: "",
  avatar: "",
  city: {
    id: 0,
    name: "",
    province: {
      id: 0,
      name: "",
    },
  },
  gender: "",
  category: {
    id: 0,
    title: "",
    slug: "",
    description: null,
    category_image: "",
    is_public: true,
    status: "",
  },
  is_guaranteed: false,
  skill_certificate: false,
  clearance: false,
  rate: null,
  comments_number: null,
  comments: [],
  shaba_number: "",
  card_number: "",
  available_neighborhoods: [
    {
      id: 0,
      name: "",
      city: 0,
    },
  ],
  complete_orders: 0,
  income: 0,
};

function DeskDashboard() {
  const [clickSideBar, setClickSideBar] = useState("empty");
  const [list, setList] = useState([
    {
      title: "اطلاعات فردی",
      imageSrc: ExpertProfileSvg.src,
      onClick: () => {
        setClickSideBar("expertProfile");
      },
    },
    {
      title: "تخصص ها",
      imageSrc: ExpertiesSvg.src,
      onClick: () => {
        setClickSideBar("experties");
      },
    },
    {
      title: "مالی",
      imageSrc: FinantialSvg.src,
      onClick: () => {
        setClickSideBar("finantial");
      },
    },
    {
      title: "محله های فعالیت",
      imageSrc: NeighborhoodLocationSvg.src,
      onClick: () => {
        setClickSideBar("neighborhoodLocation");
      },
    },
    {
      title: "کارهای پایان یافته",
      imageSrc: FinishedSvg.src,
      imageBgColor: "#0361FF",
      onClick: () => {
        setClickSideBar("finished");
      },
    },
    {
      title: "فعال/غیرفعال",
      imageSrc: ActiveNotActiveSvg.src,
      onClick: () => {
        setClickSideBar("activeNotActive");
      },
    },
    {
      title: "نمونه کار",
      imageSrc: SampleWorksSvg.src,
      onClick: () => {
        setClickSideBar("sampleWorks");
      },
    },
    {
      title: "اعلان ها",
      imageSrc: NotifDashboardSvg.src,
      onClick: () => {
        setClickSideBar("notifDashboard");
      },
    },
  ]);
  const [initialValues, setInitialValues] = useState(expertProfile);
  const [isShow, setIsShow] = useState(false);

  const { data } = useGetExpertProfile();
  useEffect(() => {
    data?.data && setInitialValues(data?.data);
  }, [data?.data]);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("notifications");
  }, [clickSideBar]);

  const windowWidth = useWindowWidth();

  function handleRender() {
    switch (clickSideBar) {
      case "empty":
        return (
          <div className="relative w-[400px] h-[400px] rounded-lg">
            <Image
              className="object-contain"
              src={ProfileBg.src}
              fill
              alt="edit icon"
            />
          </div>
        );

      case "expertProfile":
        return <ExpertProfile initialValues={initialValues} />;

      case "experties":
        return <Experties services={data?.data?.services} />;

      case "finantial":
        return <Finantial setClickSideBar={setClickSideBar} />;

      case "neighborhoodLocation":
        return <NeighborhoodLocation cityName={initialValues.city.name} />;

      case "finished":
        return <Finished isShow={isShow} setIsShow={setIsShow} />;

      case "activeNotActive":
        return <ActiveNotActive />;

      case "sampleWorks":
        return <SampleWorks />;

      case "notifDashboard":
        return <NotifDashboard clickSideBar={clickSideBar} />;
      case "credit":
        return <ExpertCredit />;
      case "comments":
        return (
          <ExpertComments
            rate={data?.data?.rate || 0}
            comments={data?.data?.comments}
          />
        );

      default:
        break;
    }
  }

  return (
    <div className="overflow-hidden w-full md:pb-[70px]">
      {windowWidth < 768 && clickSideBar !== "empty" ? null : (
        <DeskDashboardHeader
          setClickSideBar={setClickSideBar}
          initialValues={initialValues}
        />
      )}

      <div className="flex gap-2 w-full">
        <div
          className={`${
            windowWidth < 768 && clickSideBar !== "empty" ? "hidden" : ""
          } flex flex-col gap-1 rounded-xl mt-[1rem] w-full md:w-auto min-w-[35%] md:min-w-[40%] lg:min-w-[35%] xl:min-w-[30%]`}
        >
          {list.map((item, i) => (
            <DeskDashboardItem clickSideBar={clickSideBar} key={i} {...item} />
          ))}
        </div>
        <div
          className={`${
            windowWidth < 768 && clickSideBar === "empty" ? "hidden" : ""
          } ${
            windowWidth < 768 && clickSideBar !== "empty"
              ? "w-full min-h-[250px]"
              : ""
          } ${
            windowWidth >= 768 && clickSideBar === "empty" ? "bg-white p-3" : ""
          } md:m-0 md:mt-4 rounded-xl min-w-[50%] md:w-full flex flex-col md:justify-center md:items-center`}
        >
          {windowWidth < 768 && clickSideBar !== "empty" && (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (isShow) {
                  setIsShow(false);
                } else {
                  setClickSideBar("empty");
                }
              }}
            >
              <Image
                className="mx-4"
                src="/icons/back.svg"
                width={15}
                height={12}
                alt="icon"
              />
              <p>بازگشت </p>
            </div>
          )}
          {handleRender()}
        </div>
      </div>
    </div>
  );
}

export { DeskDashboard };
