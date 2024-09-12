import React from "react";
import Link from "next/link";
import Spinner from "../../../components/spinner";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/breadCrumb";
import FilterCategories from "../../../components/services/filter-categoires";
import { useRouter } from "next/router";
import { getServicesCategories, getSubCategories } from "../../../core/api/serviceApi";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import Search from "../../../components/search";
import { ChevronRightOutlined } from "@mui/icons-material";
import useServicesStore from "../../../store/serviceStore";

function ServicesPage({ category }) {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, isError } = useQuery(
    ["category", slug],
    () => getSubCategories({ slug }),
    {
      initialData: category,
      enabled: !!slug,
    }
  );
  const { data: initialData,isPending } = useQuery(
    "servicesCategories",
    () => getServicesCategories(),
    {
      cacheTime: 1000 * 60 * 60 * 24, 
      staleTime: 1000 * 60 * 60 * 24, 
      onSuccess: (data) => {
        useServicesStore.getState().setCategories(data || []);
      },
    }
  );


  // console.log("sd",data)

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: slug, link: `/services/${slug}` },
  ];

  if (isLoading || !data) {
    return <Spinner show={true} />;
  }

  if (isError || (!data && !category)) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="mt-[2rem] bg-white  md:mt-1 px-3">
      <button
        onClick={() => {
          window.history.back();
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
      <Breadcrumb paths={breadcrumbPaths} />
      <FilterCategories categories={initialData} />

      <div
        className={`grid grid-cols-2 gap-x-[10px] gap-y-[30px] p-2 3xs:grid-cols-3 3xs:gap-y-[30px] xs:grid-cols-4 ss:gap-x-[30px] ss:gap-y-[40px] sm:gap-x-[10px] sm:grid-cols-5 mm:px-[70px] mm:gap-x-[25px] lg:grid-cols-6 xl:gap-y-[60px] mb-24`}
      >
        {data?.data.map((subcategory) => (
          <Link
            href={`/services/${encodeURIComponent(
              subcategory?.title.replace(/\s/g, "-")
            )}/${slug}/`}
            key={subcategory?.id}
            className="items-center mx-auto !w-full h-[110px] text-center "
          >
            <div className="w-[100%] bg-[gray] mx-auto rounded-md h-[90px] xl:w-[150px] xl:h-[100px] mb-3 border-1 cursor-pointer hover:scale-[1.03] duration-300">
              <div className="relative w-full h-full mx-auto xl:w-[150px] xl:h-[100px]">
                {subcategory?.category_image ? (
                  <Image
                    fill
                    src={subcategory?.category_image}
                    alt={subcategory?.title || "null"}
                    className="object-fill text-[10px] mx-auto"
                  />
                ) : (
                  <Skeleton width={92} height={92} />
                )}
              </div>
            </div>
            <div className="text-[11px] 3xs:text-[11px] xs:text-[12px] md:text-[13px] xl:text-[14px] !bg-[white] text-center cursor-pointer hover:text-blue-600 hover:scale-[1.03] duration-300">
              {subcategory?.title ? (
                subcategory?.title
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </Link>
        ))}
      </div>
      {data && data?.data.length < 1 && <div>empty list</div>}
    </div>
  );
}

export default ServicesPage;
