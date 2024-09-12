import React from "react";
import { useState } from "react";
import UserProfileCard from "../../../components/userProfileCard";
import Button from "@mui/material/Button";
import FilterButtons from "../../../components/filterButtons";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";

const favorites = [
  {
    id: "1",
    name: "جواد نقی زاده",
    specialty: "کلیدسازی",
    avatar: "/images/expert.jpg",
    favorite: true,
  },
  {
    id: "2",
    name: "هادی باقری مقدم نکاح",
    specialty: "مکانیک و آپاراتی و پنچرگیری سیار",
    avatar: "/images/expert.jpg",

    favorite: true,
  },
  {
    id: "3",
    name: "سیدحسین رضائی طلب یزدی",
    specialty: "مکانیک سیار",
    avatar: "/images/expert.jpg",
    favorite: true,
  },
];

const notFavorites = [
  {
    id: "1",
    name: "جواد نقی زاده",
    specialty: "کلیدسازی",
    avatar: "/images/expert2.jpg",
  },
  {
    id: "2",
    name: "هادی باقری مقدم نکاح",
    specialty: "مکانیک و آپاراتی و پنچرگیری سیار",
    avatar: "/images/expert2.jpg",
  },
  {
    id: "3",
    name: "سیدحسین رضائی طلب یزدی",
    specialty: "مکانیک سیار",
    avatar: "/images/expert2.jpg",
  },
];

const filters = [
  { id: 0, name: "همه" },
  { id: 1, name: "تعمیرخودرو" },
  { id: 2, name: "نظافت منزل" },
  { id: 3, name: "آرایشگاه" },
  { id: 4, name: "کلیدسازی" },
  { id: 4, name: "تعمیر تاسیسات حرارتی برودتی" },
  { id: 4, name: "یدک کش و امداد خودرو" },
];

export default function Experts() {
  const [selectedFilter, setSelectedFilter] = useState("عمومی");
  const [mode, setMode] = useState(false);
  const windowWidth = useWindowWidth();
  const data = () => {
    if (mode) return notFavorites;
    return favorites;
  };

  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="متخصصین منتخب" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        {!mode && (
          <div className="flex justify-end">
            <Button
              sx={{
                margin: 1,
                color: "black",
                borderColor: "#ABAEB2",
                fontWeight: "600",
                fontSize: "14px",
              }}
              // autoFocus
              variant="outlined"
              onClick={() => setMode(true)}
            >
              اضافه کردن از میان متخصصان اخیر
            </Button>
          </div>
        )}

        {!mode && (
          <FilterButtons
            filters={filters}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}

        {mode && (
          <p className="text-base">
            آخرین کارشناسانی که به شما خدمات ارائه داده اند
          </p>
        )}

        <div className="flex flex-wrap">
          {data().map((item, i) => (
            <div
              key={i}
              className="flex flex-wrap m-2 basis-[100%] lg:basis-[45%]"
            >
              <UserProfileCard id={item.id} {...item} />
            </div>
          ))}
        </div>

        {mode && (
          <div className="flex items-center ">
            <Button
              sx={{ margin: 1, color: "black", borderColor: "#ABAEB2" }}
              // autoFocus
              variant="outlined"
              onClick={() => setMode(false)}
            >
              برگشت
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
