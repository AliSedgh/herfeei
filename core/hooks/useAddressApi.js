import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAddressById,
  getAddressList,
  getCityBaseProvince,
  getProvinceList,
  getSearchCity,
  postCreateAddress,
  putUpdateAddress,
} from "../api/addressApi";

const useGetAddressList = () => {
  const { data, isLoading } = useQuery(["useGetAddressList"], () =>
    getAddressList()
  );
  return { data, isLoading };
};

const useGetAddressById = (id) => {
  const { data, isLoading } = useQuery(
    ["useGetAddressById"],
    () => getAddressById(id),
    {
      enabled: !!id,
    }
  );
  return { data, isLoading };
};

const useGetProvinceList = () => {
  const { data, isLoading } = useQuery(["provinceList"], () =>
    getProvinceList()
  );
  return { data, isLoading };
};
const useGetCityListBaseProvince = (id) => {
  const { data, isLoading } = useQuery(
    ["cityProvinceList", id],
    () => getCityBaseProvince(id),
    { enabled: !!id }
  );
  return { data, isLoading };
};

const usePutUpdateAddress = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putUpdateAddress(data), {
    onError: () => {
      queryClient.getQueriesData(["useGetAddressList", "useGetAddressById"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["useGetAddressList", "useGetAddressById"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(
        ["useGetAddressList", "useGetAddressById"],
        updatedData
      );
    },
  });
  return mutation;
};

const usePostCreateAddress = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data) => postCreateAddress(data), {
    onError: () => {
      queryClient.getQueriesData(["useGetAddressList"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["useGetAddressList"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["useGetAddressList"]);
    },
  });
  return mutation;
};

const useGetSearchCity = () => {
  const { data, isLoading } = useQuery(["useGetSearchCity"], () =>
    getSearchCity()
  );
  return { data, isLoading };
};

export {
  usePutUpdateAddress,
  useGetAddressById,
  useGetAddressList,
  usePostCreateAddress,
  useGetSearchCity,
  useGetProvinceList,
  useGetCityListBaseProvince,
};
