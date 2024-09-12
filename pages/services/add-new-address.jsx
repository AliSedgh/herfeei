import React, { useState } from "react";
import {
  useGetAddressList,
  usePostCreateAddress,
} from "../../core/hooks/useAddressApi";
import { useRouter } from "next/router";

const initialData = {
  title: "خانه",
  details: "بلوار خزر - طبرستان",
  neighborhood: 1,
  default: false,
  phone: "9214216620",
  lat: "53.060733",
  long: "36.576751",
};

const AddNewAddress = () => {
  const [postData, setPostData] = useState(initialData);
  const postCreateAddress = usePostCreateAddress();
  const { data, isLoading } = useGetAddressList();
  const router = useRouter();
  console.log("dd", data);

  const handleTest = (data) => {
    postCreateAddress.mutate(data);
  };

  return (
    <>
      <button onClick={() => handleTest(postData)}>click me ...</button>
      {!isLoading &&
        data?.data &&
        data?.data.map((item) => (
          <div key={item.id} onClick={()=>router.push(`/services/address-detail/${item.id}`)} className="w-fit p-2 my-2 flex gap-5 [border:1px_solid_black]">
            <div>{item.title}</div>
            <div className="text-red-500">{item.details}</div>
            <div className="text-green-500">{item.neighborhood}</div>
            <div className="text-gray-500">{item.id}</div>
            <div className="text-gray-500">
              {item.default === false ? "خیر" : "بله"}
            </div>
          </div>
        ))}
    </>
  );
};

export default AddNewAddress;
