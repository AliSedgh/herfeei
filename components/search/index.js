import React, { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import { InputAdornment, CircularProgress, Paper } from "@mui/material";
import RTLTextField from "../RTLTextField";
import SearchSvg from "../../public/icons/search.svg";
import LocationSvg from "../../public/icons/location.svg";

import {
  useGetHistorySearch,
  useGetSearchCategoryServices,
  usePostHistorySearch,
} from "../../core/hooks/useServiceApi";
import ArrowSvg from "../../public/icons/arrow.svg";
import { useRouter } from "next/router";
import {
  useGetCityListBaseProvince,
  useGetProvinceList,
  useGetSearchCity,
} from "../../core/hooks/useAddressApi";
import { CityContext } from "../../pages/_app";
import { useQueryClient } from "react-query";
import { ChevronLeft } from "@mui/icons-material";
import useOutsideClick from "../../hooks/useOutSideClick";
export default function Search() {
  const { city, setCity } = useContext(CityContext);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();
  const searchRef = useRef(null);
  const cityRef = useRef(null);
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState("");

  useEffect(() => {
    const city_id = localStorage.getItem("city_id");

    if (city_id) {
      setSelectedCity(city_id);
    }
  }, []);

  const {
    data,
    isLoading,
    isError: apiError,
  } = useGetSearchCategoryServices(debouncedQuery);
  const { data: historySearch } = useGetHistorySearch();
  const queryClient = useQueryClient();

  const postHistorySearch = usePostHistorySearch();

  const { data: getSearchCity, isLoading: getSearchCityIsLoading } =
    useGetSearchCity();

  const { data: provinces } = useGetProvinceList();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query !== debouncedQuery) {
        setDebouncedQuery(query);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, debouncedQuery]);

  useEffect(() => {
    if (data) {
      setResults(data?.data);
    }
    if (apiError) {
      setError("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    }
  }, [data, apiError]);

  useEffect(() => {
    const localCity = localStorage.getItem("city_id");
    if (getSearchCity?.data && !city && !localCity) {
      const defaultCity = getSearchCity?.data.find((city) => city.id === 18);
      if (defaultCity) {
        setSelectedCity(defaultCity.id);
      }
    } else {
      setSelectedCity(city ? city : localCity);
      // localStorage.setItem("city_id", localCity);
    }
  }, [getSearchCity?.data, city]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleInputClick = () => {
    setIsPaperOpen(true);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setQuery("");
      setIsPaperOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("city_id")) {
      localStorage.setItem("city_id", "18");
    }
  }, []);
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    localStorage.setItem("city_id", event.target.value);
    setCity(event.target.value);
  };

  return (
    <div className="w-full relative" ref={searchRef}>
      <RTLTextField
        id="search"
        autoComplete="off"
        onFocus={handleInputClick}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "12px",
            borderColor: "#D6D6D6",
            border: "2px solid #D6D6D6",
          },
          borderRadius: "12px",
          "& .MuiOutlinedInput-input::placeholder": {
            fontSize: "12px",
          },
          "@media (min-width: 768px)": {
            "& .MuiOutlinedInput-root": {
              height: "3.375rem",
              bgcolor: "#F9F9F9",
              borderRadius: "12px",
            },
            "& .MuiInputLabel-root": {
              height: "3.375rem",
              bgcolor: "#F9F9F9",
              borderRadius: "12px",
            },
            "& .MuiInputBase-root": {
              height: "3.375rem",
              bgcolor: "#F9F9F9",
              borderRadius: "12px",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              fontSize: "12px",
            },
          },
          "@media (max-width: 767px)": {
            "& .MuiOutlinedInput-root": {
              height: "2.75rem",
              bgcolor: "#F9F9F9",
              borderRadius: "12px",
            },
            "& .MuiInputLabel-root": {
              height: "2.75rem",
              bgcolor: "#F9F9F9",
              borderRadius: "12px",
            },
            "& .MuiInputBase-root": {
              height: "2.75rem",
              bgcolor: "#F9F9F9",
              borderColor: "red",
              borderRadius: "12px",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              fontSize: "12px",
            },
          },
        }}
        variant="outlined"
        name="search"
        placeholder="جستجو در حرفه ای"
        hiddenLabel
        value={query}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <div className="flex items-center cursor-pointer ml-2">
              <div className="relative w-[24px] h-[25px] rounded-lg">
                <Image
                  className="object-contain"
                  src={SearchSvg.src}
                  alt="search icon"
                  fill
                />
              </div>
            </div>
          ),
          endAdornment: (
            <div className=" flex items-center cursor-pointer">
              <span className="absolute z-[10000] right-[25px] top-[50%] -translate-y-[50%] bg-[#D6D6D6] h-[55%]" />
              {getSearchCityIsLoading ? (
                <CircularProgress size={24} />
              ) : (
                <button
                  ref={triggerRef}
                  onClick={() => {
                    setOpen(!open);
                    setSelectedProvinces("");
                  }}
                  style={{ borderRight: "1px solid #D6D6D6" }}
                  className=" outline-none bg-transparent cursor-pointer border-slate-300 border-none"
                >
                  {
                    getSearchCity?.data?.find((city) => city.id == selectedCity)
                      ?.name
                  }
                </button>
              )}
              <div className="relative w-[29px] h-[24px] rounded-lg">
                <Image
                  className="object-contain"
                  src={LocationSvg.src}
                  fill
                  alt="location icon"
                />
              </div>
              <SearchBox
                open={open}
                setOpen={setOpen}
                selectedProvinces={selectedProvinces}
                setSelectedProvinces={setSelectedProvinces}
                provinces={provinces?.data}
                triggerRef={triggerRef}
              />
            </div>
          ),
        }}
      />
      {isPaperOpen && (
        <Paper
          className="!w-[100%] !px-4 !rounded-lg  !overflow-hidden !overflow-y-scroll !max-h-[300px]"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 100,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {isLoading ? (
            <div style={{ padding: 16, textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : error ? (
            <div style={{ padding: 16, textAlign: "center", color: "red" }}>
              {error}
            </div>
          ) : results.length == 0 && historySearch?.data?.length ? (
            <ul className="list-none relative m-0 p-0">
              {historySearch.data?.map((history) => (
                <li
                  onClick={() => {
                    if (history?.depth === 1) {
                      if (router.pathname == "/services") {
                        router.replace({
                          pathname: "/services",
                          query: {
                            item: history?.title,
                          },
                        });
                      } else {
                        router.push({
                          pathname: "/services",
                          query: {
                            item: history?.title,
                          },
                        });
                      }
                      setQuery("");
                      setIsPaperOpen(false);
                    } else if (history?.depth === 2) {
                      router.push(`/services/${history?.slug}`);
                      setQuery("");
                      setIsPaperOpen(false);
                    } else if (history?.depth === 3) {
                      router.push(
                        `/services/${history?.slug}/${history?.parent?.slug}`
                      );
                      setQuery("");
                      setIsPaperOpen(false);
                    }
                  }}
                  key={history?.id}
                  className="[border-bottom:1px_solid_#F5F5F5] flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-lg px-2"
                >
                  <p className="text-[#00241F] text-[12px] 3xs:text-[13px] 2xs:text-[14px] sm:text-[16px]">
                    {history?.title}
                  </p>
                  <div className="relative w-[15px] h-[15px]">
                    <Image
                      className="object-contain"
                      src={ArrowSvg.src}
                      fill
                      alt="arrow icon"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            <div style={{ padding: 16, textAlign: "center" }}>
              نتیجه‌ای یافت نشد.
            </div>
          ) : (
            <ul className="list-none m-0 p-0">
              {results?.map((result) => (
                <li
                  onClick={async () => {
                    await postHistorySearch.mutateAsync(result?.id);
                    queryClient.invalidateQueries(["historySearch"]);

                    setResults([]);

                    if (result?.depth === 1) {
                      if (router.pathname == "/services") {
                        router.replace({
                          pathname: "/services",
                          query: {
                            item: result?.title,
                          },
                        });
                      } else {
                        router.push({
                          pathname: "/services",
                          query: {
                            item: result?.title,
                          },
                        });
                      }
                      setQuery("");
                      setIsPaperOpen(false);
                    } else if (result?.depth === 2) {
                      router.push(`/services/${result?.slug}`);
                      setQuery("");
                      setIsPaperOpen(false);
                    } else if (result?.depth === 3) {
                      router.push(
                        `/services/${result?.slug}/${result?.parent?.slug}`
                      );
                      setQuery("");
                      setIsPaperOpen(false);
                    }
                  }}
                  key={result?.id}
                  className="[border-bottom:1px_solid_#F5F5F5] flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-lg px-2"
                >
                  <p className="text-[#00241F] text-[12px] 3xs:text-[13px] 2xs:text-[14px] sm:text-[16px]">
                    {result?.title}
                  </p>
                  <div className="relative w-[15px] h-[15px]">
                    <Image
                      className="object-contain"
                      src={ArrowSvg.src}
                      fill
                      alt="arrow icon"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Paper>
      )}
    </div>
  );
}

const SearchBox = ({
  open,
  setOpen,
  provinces,
  selectedProvinces,
  setSelectedProvinces,
  triggerRef,
}) => {
  const { setCity } = useContext(CityContext);
  const cityRef = useRef(null);

  const { data: cities, isLoading } =
    useGetCityListBaseProvince(selectedProvinces);
  useOutsideClick(cityRef, triggerRef, () => {
    setOpen(false);
  });

  const handleSelectedCity = (id) => {
    localStorage.setItem("city_id", id);
    setCity(id);
    setOpen(false);
  };

  if (open)
    return (
      <div
        ref={cityRef}
        className=" z-[999999] absolute pt-2 px-2 pb-6 flex flex-col divide-x-2 gap-1 min-h-[250px] overflow-y-scroll w-full md:w-[300px] md:top-14 top-12 left-0  h-14 bg-white shadow-md border rounded"
      >
        {cities?.data && selectedProvinces ? (
          <div>
            <div className=" flex flex-col gap-1">
              {cities?.data?.map((city, index) => (
                <div
                  data-aos={"slide-left"}
                  data-aos-offset="200"
                  data-aos-delay={index * 100}
                  style={{ borderBottom: "1px solid #F5F5F5" }}
                  onClick={() => handleSelectedCity(city.id)}
                  key={city.id}
                  className="flex items-center border-slate-300 border justify-between p-2"
                >
                  {city.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          provinces?.map((province) => (
            <CityCard
              key={province.id}
              selectedProvinces={selectedProvinces}
              setSelectedProvinces={setSelectedProvinces}
              province={province}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
    );
  return null;
};

const CityCard = ({
  setSelectedProvinces,
  province,
  isLoading,
  selectedProvinces,
}) => {
  return (
    <div
      style={{ borderBottom: "1px solid #F5F5F5" }}
      onClick={() => setSelectedProvinces(province.id)}
      className="flex items-center  border-slate-300 border justify-between p-2"
    >
      {province.name}
      {isLoading && selectedProvinces == province.id ? (
        <CircularProgress size={10} className="text-gray-500" />
      ) : (
        <ChevronLeft />
      )}
    </div>
  );
};
