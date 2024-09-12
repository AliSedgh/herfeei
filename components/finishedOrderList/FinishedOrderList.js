import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { EmptyOrderList } from '../emptyOrderList/EmptyOrderList'
import { getUserOrderList } from '../../core/api/orderApi';
import { useGetUserOrderList } from '../../core/hooks/useOrderApi';
import { useInfiniteQuery } from 'react-query';
import { UserOrderCard } from '../userOrderCard/UserOrderCard';
import { Button } from '@mui/material';

const FinishedOrderList = () => {
  const [allData, setAllData] = useState([]);
  const { data: orderList, isLoading:isPending,refetch} = useGetUserOrderList('finished');
  const [isOpen, setIsOpen] = useState(false);
  const interval = useRef();


  const handleClick = () => {
    setIsOpen(!isOpen);
  };


    const fetchOrder = async ({ pageParam = 1 }) => {
        return getUserOrderList(pageParam,'finished');
      };

      const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      } = useInfiniteQuery({
        queryKey: ["items"],
        queryFn: fetchOrder,
    
        getNextPageParam: (lastPage, pages) => {
          return lastPage?.next?.split("page=")[1] || undefined;
        },
      });

      useEffect(() => {
        if (orderList && data) {
          const newData = [...data.pages];
          newData[0] = orderList;
    
          const finalData = newData.map((page) => page?.results).flat();
          setAllData(finalData);
        }
      }, [orderList, data]);

      useEffect(() => {
        interval.current = setInterval(() => {
          refetch();
        }, 5000);
    
        return () => {
          clearInterval(interval.current);
        };
      }, []);

  return (
    <div className="w-full xl:w-[1242px] p-5 md:p-[0] md:pr-[1px] flex flex-col md:flex-row-reverse gap-[24px] flex-wrap">
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
          <Skeleton
            containerClassName="w-full h-full absolute top-[-3px] left-0"
            className="w-full h-full"
          />
        </div>
      </>
    ) : allData?.length>0 ? (
      allData
        .map((order) => (
          <UserOrderCard
            status={order?.status}
            key={order?.id}
            data={order}
          />
        ))
    ) : (
      <EmptyOrderList />
    )}

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
  </div>
  )
}

export default FinishedOrderList