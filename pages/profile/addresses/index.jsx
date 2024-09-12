import React, { useContext, useState } from "react";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import {
  useGetAddressList,
  useGetSearchCity,
  usePostCreateAddress,
} from "../../../core/hooks/useAddressApi";
import { useGetNeighborhoodList } from "../../../core/hooks/useServiceApi";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Switch, styled } from "@mui/material";
import dynamic from "next/dynamic";
import { useQueryClient } from "react-query";
import Image from "next/image";
import AddressIconSvg from "../../../public/icons/address-icon.svg";
import MapJpg from "../../../public/images/map.jpg";
import { CityContext } from "../../_app";

// const Map = dynamic(() => import("../../../components/map"), {
//   ssr: false,
// });

const UpdateMap = dynamic(() => import("../../../components/map/UpdateMap"), {
  ssr: false,
});

export default function Addresses() {
  const [initialValues, setInitialValues] = useState({
    title: "عنوان",
    neighborhood: 26,
    details: "",
    phone: "",
    city: "",
    default: false,
    lat: 35.715824,
    long: 51.33527,
  });
  const localCity = localStorage.getItem("city_id");

  const [addMode, setAddMode] = useState(false);
  const windowWidth = useWindowWidth();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetAddressList();
  const { city, setCity } = useContext(CityContext);
  const [newCity, setNewCity] = useState(null);

  const postCreateAddress = usePostCreateAddress();
  const { data: getSearchCity, isLoading: GetSearchCityIsLoading } =
    useGetSearchCity();
  const { data: getNeighborhoodList, isLoading: isLoadingGetNeighborhoodList } =
    useGetNeighborhoodList(
      newCity ? newCity : city ? city : localCity ? localCity : 3
    );

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("jk", values);
      if (values.phone.startsWith("0")) {
        values.phone = values.phone.substring(1);
      }
      postCreateAddress.mutate(values, {
        onSuccess: () => {
          queryClient.setQueryData(["useGetAddressList"]);
          formik.resetForm();
          setAddMode(false);
        },
      });
    },
  });

  const IOSSwitch = styled((props) => {
    return (
      <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        // checked={formik.values.default}
        // onChange={e=> formik.setFieldValue("")}
        {...props}
      />
    );
  })(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <>
      <div className="flex flex-col min-w-[60%] md:w-full mx-3 md:mx-0">
        {windowWidth > 768 ? null : <BackButton title="آدرس های من" />}
        <div
          className={`flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto ${
            addMode ? "bg-white" : "md:bg-white"
          } rounded-xl w-full`}
        >
          {!addMode ? (
            !isLoading ? (
              <>
                <div className="w-full grid grid-cols-1 gap-2 md:gap-4 md:p-8">
                  {data?.data?.map((item, index) => (
                    <div
                      key={index}
                      className={`[border:1px__solid_#EBEBEB] hover:[border:1px__solid_#0361FF] rounded-lg md:rounded-2xl shadow-sm bg-[#FFFFFF] hover:bg-blue-100 px-2 py-3 xs:px-6 xs:py-5 flex items-center cursor-pointer hover:scale-[1.02] duration-300 relative`}
                    >
                      {item?.default && (
                        <p className="absolute z-50 top-[-2px] left-[-24px] font-bold text-white px-6 custom-trapezoid -rotate-45">
                          پیشفرض
                        </p>
                      )}
                      <div className="flex flex-col items-start xs:flex-row xs:items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative w-[32px] h-[32px] rounded-lg">
                            <Image
                              className="object-contain"
                              src={AddressIconSvg.src}
                              alt={item.title}
                              fill
                            />
                          </div>
                        </div>
                        <p className="text-[14px]">
                          {item.details || item.title}
                        </p>
                      </div>
                      <div className="mr-auto flex items-center justify-center">
                        <div className="relative w-[60px] h-[60px] 2xs:w-[67px] 2xs:h-[67px] xs:w-[74px] xs:h-[74px] rounded-lg">
                          <Image
                            className="object-contain rounded-lg"
                            src={MapJpg.src}
                            alt={item.title}
                            fill
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setAddMode(true)}
                  className="m-0 mt-4 mx-auto text-[14px] font-semibold px-6 py-4 w-fit text-white bg-blue-600 border-0 rounded-lg cursor-pointer hover:scale-105 duration-300"
                >
                  اضافه کردن آدرس جدید
                </button>
              </>
            ) : (
              <p className="mx-auto">در حال بارگزاری</p>
            )
          ) : (
            <>
              <div className="flex flex-col lg:flex-row gap-5 justify-center items-center lg:items-start">
                <form
                  onSubmit={formik.handleSubmit}
                  className="min-w-[100%] lg:min-w-fit lg:w-[100%] flex gap-4 flex-col lg:flex-row"
                >
                  <div className="flex flex-col gap-4 p-1 w-full">
                    <div>
                      <label htmlFor="addressTitle">آدرس</label>

                      <input
                        className="w-full min-h-[64px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB]"
                        id="addressTitle"
                        name="details"
                        type="text"
                        placeholder="مغازه"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                      />
                    </div>

                    <div className="flex flex-col">
                      {" "}
                      <label htmlFor="city">انتخاب شهر</label>
                      <select
                        className="w-full min-h-[64px] mt-2 px-2 bg-transparent rounded-[8px] [border:1px_solid_#EBEBEB]"
                        id="city"
                        name="city"
                        placeholder=""
                        onChange={(e) => {
                          setNewCity(e.target.value);
                          console.log("new city", e.target.value);
                        }}
                        value={
                          newCity
                            ? newCity
                            : city
                            ? city
                            : localCity && localCity
                        }
                      >
                        {!GetSearchCityIsLoading &&
                          getSearchCity?.data.map((item) => (
                            <option key={item.id} value={item?.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      {" "}
                      <label htmlFor="neighborhood">انتخاب محله</label>
                      <select
                        className="w-full min-h-[64px] mt-2 px-2 bg-transparent rounded-[8px] [border:1px_solid_#EBEBEB]"
                        id="neighborhood"
                        name="neighborhood"
                        placeholder="انتخاب کنید"
                        onChange={formik.handleChange}
                        value={formik.values.neighborhood}
                      >
                        {!isLoadingGetNeighborhoodList &&
                          getNeighborhoodList?.data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="phoneNumber">تلفن</label>

                      <input
                        className="w-full min-h-[64px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB]"
                        id="phoneNumber"
                        name="phone"
                        type="text"
                        placeholder="09010012323"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      />
                    </div>
                    <UpdateMap
                      className="min-h-[300px] lg:hidden"
                      location={{
                        lat: formik.values.lat,
                        lng: formik.values.long,
                      }}
                      onLocationChange={(loc) => {
                        formik.setFieldValue("lat", loc.lat);
                        formik.setFieldValue("long", loc.lng);
                      }}
                    />

                    <div className="hidden lg:flex lg:items-center lg:justify-between">
                      <div>انتخاب به عنوان آدرس پیش فرض</div>
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={formik.values.default}
                        onChange={(e) =>
                          formik.setFieldValue("default", e.target.checked)
                        }
                        name="default"
                      />
                    </div>

                    <div className="hidden lg:flex lg:justify-center disabled:opacity-50 lg:gap-3">
                      <Button
                        disabled={!!!formik.values.details}
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "100%",

                          height: "2.25rem",
                          borderRadius: ".6rem",
                        }}
                      >
                        ذخیره آدرس
                      </Button>
                      <Button
                        onClick={() => {
                          setAddMode(false);
                        }}
                        variant="outlined"
                        sx={{
                          width: "100%",

                          height: "2.25rem",
                          borderRadius: ".6rem",
                        }}
                      >
                        انصراف
                      </Button>
                    </div>
                  </div>
                  <div className="w-full lg:translate-y-[32.5px]">
                    {/* <Map
                      location={{
                        lat: formik.values.lat,
                        lng: formik.values.long,
                      }}
                      onLocationChange={(loc) => {
                        // setInitialValues((data) => ({
                        //   ...formik.,
                        //   // check names
                        //   lat: loc.lat,
                        //   long: loc.lng,
                        // }));
                        formik.setFieldValue("lat", loc.lat.toPrecision(8));
                        formik.setFieldValue("long", loc.lng.toPrecision(8));
                        console.log("location", loc.lat.toPrecision(8));
                      }}
                    /> */}
                    <UpdateMap
                      location={{
                        lat: formik.values.lat,
                        lng: formik.values.long,
                      }}
                      onLocationChange={(loc) => {
                        formik.setFieldValue("lat", loc.lat);
                        formik.setFieldValue("long", loc.lng);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between lg:hidden">
                    <div>انتخاب به عنوان آدرس پیش فرض</div>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      name="default"
                      checked={formik.values.default}
                      onChange={(e) =>
                        formik.setFieldValue("default", e.target.checked)
                      }
                    />
                  </div>
                  <div className="flex justify-center gap-3 lg:hidden">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "100%",

                        height: "2.25rem",
                        borderRadius: ".6rem",
                      }}
                    >
                      ذخیره آدرس
                    </Button>
                    <Button
                      onClick={() => {
                        setAddMode(false);
                      }}
                      variant="outlined"
                      sx={{
                        width: "100%",

                        height: "2.25rem",
                        borderRadius: ".6rem",
                      }}
                    >
                      انصراف
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
