import React, { useEffect, useState } from "react";
import AddressItem from "../../components/addressItem";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Switch, styled } from "@mui/material";
import dynamic from "next/dynamic";
import {
  useGetAddressList,
  usePostCreateAddress,
} from "../../core/hooks/useAddressApi";
import { useGetNeighborhoodList } from "../../core/hooks/useServiceApi";

const Map = dynamic(() => import("../../components/map"), {
  ssr: false,
});

function ServicesSelectAddress(props) {
  const [initialValues, setInitialValues] = useState({
    title: "",
    neighborhood: 1,
    details: "",
    phone: "",
    default: false,
    lat: 35.715824,
    long: 51.33527,
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.phone.startsWith("0")) {
        values.phone = values.phone.substring(1);
      }
      postCreateAddress.mutate(values, {
        onSuccess: () => {
          formik.resetForm();
          setAddMode(false);
          props.onAddMode(true);
        },
      });
    },
  });

  const [addMode, setAddMode] = useState(false);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAddressList();
  const { data: getNeighborhoodList, isLoading: isLoadingGetNeighborhoodList } =
    useGetNeighborhoodList(1);
  const postCreateAddress = usePostCreateAddress();
  const addressId = localStorage.getItem("address_id");
  const defaultAddressId = data?.data
    ?.filter((item) => item.default === true)
    .map((it) => it.id)[0];
  // state for active
  const [activeId, setActiveId] = useState(
    defaultAddressId ? defaultAddressId : addressId
  );
  // console.log("dg",defaultAddressId)
  // const windowWidth = useWindowWidth();

  useEffect(() => {
    defaultAddressId && localStorage.setItem("address_id", defaultAddressId);
  }, [defaultAddressId]);

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

  // useEffect(() => {
  //   if (defaultAddressId) {
  //     localStorage.setItem("address_id", defaultAddressId);
  //     props.onAddressToggle(); // Toggle the address
  //   }
  // }, [defaultAddressId]);

  const handleAddAddress = () => {
    // Handle adding a new address here
  };

  return (
    <>
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mb-[92px] mx-auto bg-white rounded-xl w-[100%]">
        {addMode ? (
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:items-start">
            <form
              onSubmit={formik.handleSubmit}
              className="min-w-[100%] md:min-w-fit md:w-[100%] flex gap-4 flex-col md:flex-row"
            >
              <div className="flex flex-col gap-4 p-1 w-full">
                <div>
                  <label htmlFor="addressTitle">عنوان آدرس</label>

                  <input
                    className="w-full min-h-[64px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB]"
                    id="addressTitle"
                    name="title"
                    type="text"
                    placeholder="مغازه"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
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
                  <label htmlFor="addressDetail">جزییات آدرس</label>

                  <input
                    className="w-full min-h-[80px] mt-2 px-2 rounded-[8px] [border:1px_solid_#EBEBEB] text-right"
                    id="addressDetail"
                    name="details"
                    type="text"
                    placeholder="بوشهر،خواجه ها،خ معرفت ۶، پلاک 22، طبقه همکف"
                    onChange={formik.handleChange}
                    value={formik.values.details}
                  />
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

                <div className="hidden md:flex md:items-center md:justify-between">
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

                <div className="hidden md:flex md:justify-center md:gap-3">
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
                      props.onAddMode(true);
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
              <div className="w-full md:translate-y-[32.5px]">
                <Map
                  location={{ lat: formik.values.lat, lng: formik.values.long }}
                  onLocationChange={(loc) => {
                    // setInitialValues((data) => ({
                    //   ...formik.,
                    //   // check names
                    //   lat: loc.lat,
                    //   long: loc.lng,
                    // }));
                    formik.setFieldValue("lat", loc.lat.toPrecision(8));
                    formik.setFieldValue("long", loc.lng.toPrecision(8));
                  }}
                />
              </div>
              <div className="flex items-center justify-between md:hidden">
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
              <div className="flex justify-center gap-3 md:hidden">
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
                    props.onAddMode(true);
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
        ) : (
          <>
            {/* Code for displaying existing addresses */}
            {!isLoading && data?.data && data?.data.length != 0 ? (
              data?.data.map((item, i) => {
                return (
                  <AddressItem
                    key={i}
                    {...item}
                    defaultAddressId={defaultAddressId}
                    active={item.id == addressId}
                    onAddressToggle={props.onAddressToggle} // Pass onAddressToggle prop
                    onSelect={(id) => {
                      setActiveId(id);
                    }}
                  />
                );
              })
            ) : (
              <p>آدرس یافت نشد. لطفا یک آدرس اضافه کنید.</p>
            )}

            <div className="flex justify-center mt-8">
              <Button
                onClick={() => {
                  setAddMode(true);
                  props.onAddMode(false);
                }}
                variant="contained"
                sx={{ m: ".5rem", height: "2.25rem", borderRadius: ".6rem" }}
              >
                اضافه کردن آدرس جدید
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { ServicesSelectAddress };
