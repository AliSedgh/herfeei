import { useQuery } from "react-query";
import { getAllFaqs } from "../api/profileApi/dashboardApi/dashboardApi";

const useGetAllFaqs = () => {
  const { data, isLoading } = useQuery(["useGetAllFaqs"], () => getAllFaqs(), {
    initialData: [],
  });
  return { data, isLoading };
};

export { useGetAllFaqs };
