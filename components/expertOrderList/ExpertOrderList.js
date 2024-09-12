import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmptyOrderList } from "../emptyOrderList/EmptyOrderList";
import { ExpertOrderCard } from "../expertOrderCard/ExpertOrderCard";
import Skeleton from "react-loading-skeleton";
import { FullSkeleton } from "../loadingSkeleton/LoadingSkeleton";
import { useInfiniteQuery } from "react-query";
import { useGetExpertOrderPageOne } from "../../core/hooks/useOrderApi";
import { getExpertOrder } from "../../core/api/orderApi";

const ExpertOrderList = () => {
  const [isExpertList, setIsExpertList] = useState(true);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(false);
  const [allData, setAllData] = useState([]);

  const fetchItems = async ({ pageParam = 1 }) => {
    return getExpertOrder(pageParam);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: fetchItems,

      getNextPageParam: (lastPage, pages) =>
        lastPage?.next?.split("page=")[1] || undefined,
    });

  const { data: expertData, isLoading: isLoadingExpertData } =
    useGetExpertOrderPageOne();

  useEffect(() => {
    if (data) {
      const newData = data.pages.map((page) => page?.results).flat();

      setAllData(newData);
    }
  }, [data]);

  useEffect(() => {
    if (expertData && data) {
      const newData = [...data.pages];
      newData[0] = expertData;

      const finalData = newData.map((page) => page?.results).flat();
      setAllData(finalData);
    }
  }, [expertData, data]);
  return (
    <div className="w-full xl:w-[1242px] p-5 md:p-[0] md:pr-[1px] flex flex-col md:flex-row gap-[24px] flex-wrap">
      {isLoading ? (
        <>
          <div className="h-[356px] w-full md:w-[48%] xl:w-[397px] flex flex-col justify-center items-start shrink-0 rounded-[8px] [border:1px_solid_#d9d9d9] [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] relative overflow-hidden">
            <Skeleton
              containerClassName="w-full h-full absolute top-[-3px] left-0"
              className="w-full h-full"
            />
          </div>
          <div className="h-[356px] w-full md:w-[48%] xl:w-[397px] flex flex-col justify-center items-start shrink-0 rounded-[8px] [border:1px_solid_#d9d9d9] [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] relative overflow-hidden">
            <Skeleton
              containerClassName="w-full h-full absolute top-[-3px] left-0"
              className="w-full h-full"
            />
          </div>
          <div className="h-[356px] w-full md:w-[48%] xl:w-[397px] flex flex-col justify-center items-start shrink-0 rounded-[8px] [border:1px_solid_#d9d9d9] [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] relative overflow-hidden">
            <FullSkeleton />
          </div>
        </>
      ) : isExpertList ? (
        allData.length > 0 && (
          <>
            {allData
              .filter(
                (item) => !["FINISHED", "CANCELED"].includes(item?.status)
              )
              .map((order) => (
                <ExpertOrderCard
                  status={order?.status}
                  key={order?.id}
                  data={order}
                  allData={allData}
                  setAllData={setAllData}
                />
              ))}

            {hasNextPage && (
              <div className="w-full flex justify-center items-center mt-2 pb-8">
                <Button
                  disabled={isFetchingNextPage}
                  className=" h-9 px-4 py-2 bg-blue-600 hover:bg-blue-800 disabled:opacity-50 rounded-lg justify-center items-center inline-flex text-right text-white text-sm font-semibold leading-tight mx-auto"
                  onClick={fetchNextPage}
                >
                  بیشتر
                </Button>
              </div>
            )}
          </>
        )
      ) : (
        <EmptyOrderList />
      )}
    </div>
  );
};

export default ExpertOrderList;
