import { useQuery } from "react-query";
import { getEventService, getHomeComments, getSlider } from "../api/homeApi";

const useGetSlider = () => {
  const { data, isLoading } = useQuery(["homeMainSlider"], () => getSlider(), {
  
    // initialData: [],
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  },);
  return { data, isLoading };
};

const useGetEventService = () => {
  const { data, isLoading } = useQuery(["eventService"], () =>
    getEventService(),{cacheTime: 1000 * 60 * 60 * 24,staleTime: 1000 * 60 * 60 * 24,}
  );
  return { data, isLoading };
};

const useGetHomeComments = () => {
  const { data, isLoading } = useQuery(["homeComments"], () =>
    getHomeComments()
  );
  return { data, isLoading };
};

export { useGetSlider, useGetEventService, useGetHomeComments };
