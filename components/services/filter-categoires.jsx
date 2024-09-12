import React, { useEffect, useState } from "react";
import useServicesStore from "../../store/serviceStore";
import { useQuery } from "react-query";
import ServiceItem from "./service-item";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { getServicesCategories } from "../../core/api/serviceApi";
import AllServiceIconSvg from "../../public/icons/allServiceIcon.svg";
import Link from "next/link";

function FilterCategories({ item, setSlugService, chert }) {
  const [allServices, setAllServices] = useState(false);
  const router = useRouter();
  const selectedCategory = useServicesStore((state) => state.selectedCategory);
  const categories = useServicesStore((state) => state.categories);
  const { data: initialCategories = [], refetch } = useQuery(
    ["servicesCategories", item],
    () => getServicesCategories(),
    {
      enabled: categories.length === 0,
      initialData: categories,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess: (data) => {
        let selectedItem = undefined;
        data?.forEach((it) => {
          if (it.title == item) {
            selectedItem = it.title;
          }
        });
        selectedItem && setSelectedCategory(selectedItem);
        useServicesStore.getState().setCategories(data || []);
      },
    }
  );

  console.log("*************8", initialCategories);

  useEffect(() => {
    router.pathname === "/services" &&
      selectedCategory === "همه" &&
      !router.query?.item &&
      setAllServices(true);
  }, [router.query?.item]);

  useEffect(() => {
    refetch();
  }, [item]);

  const setSelectedCategory = useServicesStore(
    (state) => state.setSelectedCategory
  );
  // useEffect(() => {
  //   setSelectedCategory("همه");
  //   setAllServices(true);
  // }, []);

  const isCategorySelected = (category) => {
    return selectedCategory === category.title;
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);

    if (router.pathname.length > 9) {
      // Redirect to /services/index
      router.push("/services");
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-white mt-rem] flex overflow-x-auto no-scrollbar items-center xl:justify-center flex-no-wrap w-full mb-10">
        <div
          className={`cursor-pointer bg-[white] text-center  h-[122px] flex items-center flex-col justify-around -translate-y-[2px] p-1 rounded-xl m-2 lg:mx-5 ${
            selectedCategory === "همه" ? "opacity-100" : "opacity-50"
          } `}
          onClick={() => {
            handleCategorySelect("همه");
            setAllServices(true);
            router.push("/services");
          }}
        >
          {initialCategories.length === 0 ? (
            // Skeleton loading for the "همه" category
            <Skeleton width={64} height={64} />
          ) : (
            <div className="relative w-[58px] h-[58px]">
              <Image
                className="object-contain"
                src={AllServiceIconSvg.src}
                fill
                alt="icon"
              />
            </div>
          )}
          <p className="m-0 text-center text-[#1A1D1F] text-sm font-[600] w-[4.5rem]">
            {initialCategories.length === 0 ? (
              // Skeleton loading for the text
              <Skeleton width={45} />
            ) : (
              "همه"
            )}
          </p>
        </div>
        {categories?.map((category, i) => (
          <ServiceItem
            {...category}
            key={i}
            selected={isCategorySelected(category)}
            onSelect={() => {
              setSlugService(category.slug);
              handleCategorySelect(category.title);
              setAllServices(false);
              router.push("/services", { item: category.title });
            }}
          />
        ))}
      </div>
      {/* {allServices && (
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[30px] p-2 3xs:grid-cols-3 3xs:gap-y-[30px] xs:grid-cols-4 ss:gap-x-[30px] ss:gap-y-[40px] sm:gap-x-[10px] sm:grid-cols-5 mm:px-[70px] mm:gap-x-[25px] lg:grid-cols-6 xl:gap-y-[60px]">
          {categories?.map((item) =>
            item?.children.map((it) =>
              it?.children.map((i) => (
                <div
                  onClick={() => {
                    // console.log("pi:item",item);
                    let parent = undefined;
                    item?.children?.forEach((c) => {
                      c?.children.forEach((child) => {
                        console.log("child", child.slug, i.title);
                        if (child.title == i.title) parent = child.slug;
                      });
                    });
                    router.push(
                      `/services/${parent}/${encodeURIComponent(
                        it?.title.replace(/\s/g, "-")
                      )}/`
                    );
                  }}
                  key={i?.id}
                  className="items-center mx-auto !w-full h-[110px] text-center "
                >
                  <div className="w-[100%] bg-[gray] mx-auto rounded-md h-[90px] xl:w-[150px] xl:h-[100px] mb-3 border-1 cursor-pointer hover:scale-[1.03] duration-300">
                    <div className="relative w-full h-full mx-auto xl:w-[150px] xl:h-[100px]">
                      {i?.category_image ? (
                        <Image
                          fill
                          src={i?.category_image}
                          alt={i?.title || "null"}
                          className="object-fill text-[10px] mx-auto"
                        />
                      ) : (
                        <Skeleton width={92} height={92} />
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] 3xs:text-[11px] xs:text-[12px] md:text-[13px] xl:text-[14px] !bg-[white] text-center cursor-pointer hover:text-blue-600 hover:scale-[1.03] duration-300">
                    {i?.title ? i?.title : <Skeleton width={100} />}
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )} */}
      {allServices && (
        <div className="grid grid-cols-2 gap-x-[10px] gap-y-[30px] p-2 3xs:grid-cols-3 3xs:gap-y-[30px] xs:grid-cols-4 ss:gap-x-[30px] ss:gap-y-[40px] sm:gap-x-[10px] sm:grid-cols-5 mm:px-[70px] mm:gap-x-[25px] lg:grid-cols-6 xl:gap-y-[60px]">
          {categories?.map((item) =>
            item?.children?.map((it) => {
              const link =
                it?.children.length > 0
                  ? `/services/${it?.slug}`
                  : `/services/${item?.slug}/${it?.slug}`;

              return (
                <div
                  onClick={() => {
                    it?.slug && router.push(link);
                  }}
                  key={it?.id}
                  className="items-center mx-auto !w-full h-[110px] text-center "
                >
                  <div className="w-[100%] bg-[gray] mx-auto rounded-md h-[90px] xl:w-[150px] xl:h-[100px] mb-3 border-1 cursor-pointer hover:scale-[1.03] duration-300">
                    <div className="relative w-full h-full mx-auto xl:w-[150px] xl:h-[100px]">
                      {it?.category_image ? (
                        <Image
                          fill
                          src={it?.category_image}
                          alt={it?.title || "null"}
                          className="object-fill text-[10px] mx-auto"
                        />
                      ) : (
                        <Skeleton width={92} height={92} />
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] 3xs:text-[11px] xs:text-[12px] md:text-[13px] xl:text-[14px] !bg-[white] text-center cursor-pointer hover:text-blue-600 hover:scale-[1.03] duration-300">
                    {it?.title ? it.title : <Skeleton width={100} />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
}

export default FilterCategories;
