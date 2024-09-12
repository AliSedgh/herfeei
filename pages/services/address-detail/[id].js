import React from "react";
import { useGetAddressById } from "../../../core/hooks/useAddressApi";
import { useRouter } from "next/router";

const AddressDetail = () => {
  const params = useRouter();
  const id = params?.query.id;
  const { data, isLoading } = useGetAddressById(id);

  console.log("aaa", data?.data.title);
  console.log("aaaa", id);

  return (
    <>
      {!isLoading && data?.data ? (
        <div className="w-fit p-2 my-2 flex gap-5 [border:1px_solid_black]">
          <div>{data?.data.title}</div>
          <div className="text-red-500">{data?.data.details}</div>
          <div className="text-green-500">{data?.data.neighborhood}</div>
          <div className="text-gray-500">{data?.data.id}</div>
          <div className="text-gray-500">
            {data?.data.default === false ? "خیر" : "بله"}
          </div>
        </div>
      ) : (
        <div>لیست خالی است</div>
      )}
    </>
  );
};

export default AddressDetail;
