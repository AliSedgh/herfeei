import React, { useDebugValue, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import useServicesStore from "../../store/serviceStore";
import BreadCrumb from "../../components/breadCrumb/index";
import FilterCategories from "../../components/services/filter-categoires";
import Skeleton from "react-loading-skeleton"; // Import Skeleton from the package
import { getServicesCategories } from "../../core/api/serviceApi";
import { useRouter } from "next/router";
import Search from "../../components/search";
import { ChevronRightOutlined } from "@mui/icons-material";

function Services({ initialCategories }) {
  const [isLoading, setIsLoading] = useState(true);
  const [queryItem, setQueryItem] = useState();
  const [serviceSlug, setServiceSlug] = useState("");
  console.log("service-slug");

  const router = useRouter();
  console.log("query", router.query);
  const setSelectedCategory = useServicesStore(
    (state) => state.setSelectedCategory
  );

  const { data: initialData } = useQuery(
    "servicesCategories",
    () => getServicesCategories(),
    {
      cacheTime: 1000 * 60 * 60 * 24, 
      staleTime: 1000 * 60 * 60 * 24, 
      onSuccess: (data) => {
        useServicesStore.getState().setCategories(data || []);
        setIsLoading(false); // Set loading to false when data is fetched
      },
    }
  );

  
  const selectedCategory = useServicesStore((state) => state.selectedCategory);

  const selectedCategoryObject = initialData
    ?.filter((category) => category.title === selectedCategory)
    .flatMap((category) => category.children || []);

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
  ];

  useEffect(() => {
    console.log("router.query.item", router.query.item);
    if (router.query.item) {
      setQueryItem(router.query.item);
    }
  }, [router.query.item]);

  // useEffect(() => {
  //   console.log("router.query.item", router.query.item);

  //   setSelectedCategory(router.query.item);
  // }, [router.query.item]);

  // console.log("check data::item", router.query.item);

  return (
    <main className="mt-[2rem]">
      <button
        onClick={() => {
          router.push("/");
        }}
        className="md:hidden mx-4 mt-2 mb-6 flex items-center gap-1 border-0 bg-transparent text-[18px]"
      >
        {" "}
        <ChevronRightOutlined />
        بازگشت
      </button>
      <div className="md:hidden mx-4 mb-10 flex justify-center basis-[100%] md:basis-[60%] h-[2.75rem]">
        <Search />
      </div>
      <BreadCrumb paths={breadcrumbPaths} />
      <FilterCategories
        chert={"dddd"}
        item={queryItem}
        setSlugService={setServiceSlug}
      />

      <div
        className={`grid md:grid-cols-4 w-fit text-center justify-center mx-auto lg:px-8 ${
          selectedCategoryObject?.length === 1
            ? "grid-cols-1"
            : "grid-cols-2  lg:grid-cols-5 xl:grid-cols-6"
        } items-center grid-rows-2 gap-4`}
      >
        {isLoading
          ? // Render loading skeletons
            Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="text-center">
                <Skeleton width={100} height={100} />
                <Skeleton width={100} />
              </div>
            ))
          : // Render actual content
            selectedCategoryObject?.map((subcategory, index) => {
              const link =
                subcategory?.children?.length > 0
                  ? `/services/${encodeURIComponent(subcategory.slug)}`
                  : `/services/${encodeURIComponent(
                      subcategory.slug
                    )}/${selectedCategory}`;

              console.log(
                "subcategory",
                subcategory,
                subcategory?.children?.length
              );

              return (
                <Link
                  href={link}
                  key={index}
                  className="cursor-pointer w-[115px] 2xs:w-[172px] relative text-center  inline-block  mx-auto bg-transparent border-none"
                >
                  <div className="relative w-full h-[100px]">
                    {subcategory?.category_image && (
                      <Image
                        className="object-contain"
                        fill
                        quality={100}
                        src={subcategory.category_image}
                        alt="category img"
                      />
                    )}
                  </div>
                  <div className="text-[12px] text-center my-2">
                    {subcategory.title}
                  </div>
                </Link>
              );
            })}
      </div>
    </main>
  );
}

export default Services;
