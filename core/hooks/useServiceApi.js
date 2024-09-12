import { useMutation, useQuery } from "react-query";
import {
  getExpertList,
  getHistorySearch,
  getNeighborhoodList,
  getSearchCategoryServices,
  getServiceActive,
  getServicesCategories,
  postAnswersQuestion,
  postCheckDiscountCode,
  postExpertPrioritizing,
  postGiftCreditCode,
  postHistorySearch,
  postOrderConfirmation,
  postServiceTime,
} from "../api/serviceApi";
import { refresh } from "aos";

const useGetServicesCategories = () => {
  const { data, isLoading } = useQuery(
    ["servicesCategories"],
    () => getServicesCategories(),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  return { data, isLoading };
};

const usePostServiceTime = () => {
  const mutation = useMutation((data) => postServiceTime(data));
  return mutation;
};

const useGetExpertList = (order_id, isReady = true) => {
  const { data, isLoading, refetch } = useQuery(
    ["getExpertList"],
    () => getExpertList(order_id),
    { enabled: isReady }
  );
  return { data, isLoading, refetch };
};

const useGetNeighborhoodList = (address_id) => {
  const { data, isLoading } = useQuery(
    ["getNeighborhoodList", address_id],
    () => getNeighborhoodList(address_id),
    { enabled: !!address_id }
  );
  return { data, isLoading };
};

const usePostExpertPrioritizing = () => {
  const mutation = useMutation((data) => postExpertPrioritizing(data));
  return mutation;
};

const usePostAnswersQuestion = () => {
  const mutation = useMutation((data) => postAnswersQuestion(data));
  return mutation;
};

const usePostOrderConfirmation = () => {
  const mutation = useMutation((data) => postOrderConfirmation(data));
  return mutation;
};

const useGetSearchCategoryServices = (query) => {
  const { data, isLoading, isError } = useQuery(
    ["getExpertList", query],
    () => getSearchCategoryServices(query),
    { enabled: !!query }
  );
  return { data, isLoading, isError };
};

const useGetHistorySearch = () => {
  const { data, isLoading, isError } = useQuery(["historySearch"], () =>
    getHistorySearch()
  );
  return { data, isLoading, isError };
};

const useGetServiceActive = (service_id, city_id) => {
  const { data, isLoading, refetch } = useQuery(
    ["getServiceActive", city_id],
    () => getServiceActive(service_id, city_id),
    { enabled: !!city_id && !!service_id }
  );
  return { data, isLoading, refetch };
};

const usePostCheckDiscountCode = () => {
  const mutation = useMutation((data) => postCheckDiscountCode(data));
  return mutation;
};

const usePostHistorySearch = () => {
  const mutation = useMutation((id) => postHistorySearch(id));
  return mutation;
};

const usePostGiftCreditCode = () => {
  const mutation = useMutation((code) => postGiftCreditCode(code));
  return mutation;
};

export {
  useGetServicesCategories,
  usePostServiceTime,
  useGetExpertList,
  usePostExpertPrioritizing,
  usePostAnswersQuestion,
  usePostOrderConfirmation,
  useGetNeighborhoodList,
  useGetSearchCategoryServices,
  useGetServiceActive,
  usePostCheckDiscountCode,
  useGetHistorySearch,
  usePostHistorySearch,
  usePostGiftCreditCode,
};
