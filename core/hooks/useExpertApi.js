import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteSample,
  getExpertProfile,
  getExpertsAvailableNeighborhoods,
  getExpertsNeighborhoodsList,
  getCredit,
  getNotAvailableTime,
  getNotifications,
  getSampleDetails,
  getSampleList,
  postCreateSample,
  putNotAvailableTime,
  putUpdateExpert,
  putUpdateNeighborhoodExpert,
  putUpdateSample,
  postExpertEarlySignUp,
  getExpertsSpecialty,
  getExpertSampleList,
  getExpertDetail,
  increaseExpertCredit,
  postExpertComment,
  getExpertComments,
} from "../api/expertApi";
import { postExpertGoingToWork } from "../api/orderApi";

const useGetNotAvailableTime = () => {
  const { data, isLoading, refetch } = useQuery(["notAvailableTime"], () =>
    getNotAvailableTime()
  );
  return { data, isLoading, refetch };
};

const usePutNotAvailableTime = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putNotAvailableTime(data), {
    onError: () => {
      queryClient.getQueriesData(["putNotAvailableTime"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["putNotAvailableTime"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["putNotAvailableTime"], updatedData);
    },
  });
  return mutation;
};

const useGetSampleList = () => {
  const { data, isLoading, refetch } = useQuery(["sampleList"], () =>
    getSampleList()
  );
  return { data, isLoading, refetch };
};

const useGetSampleDetails = (sample_id) => {
  const { data, isLoading, refetch } = useQuery(
    ["sampleDetails", sample_id],
    () => getSampleDetails(sample_id),
    { enabled: !!sample_id }
  );
  return { data, isLoading, refetch };
};

const usePostCreateSample = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => postCreateSample(data), {
    onError: () => {
      queryClient.getQueriesData(["postCreateSample"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["postCreateSample"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["postCreateSample"], updatedData);
    },
  });
  return mutation;
};

const usePutUpdateSample = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putUpdateSample(data), {
    onError: () => {
      queryClient.getQueriesData(["putUpdateSample"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["putUpdateSample"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["putUpdateSample"], updatedData);
    },
  });
  return mutation;
};

const useDeleteSample = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => deleteSample(data), {
    onError: () => {
      queryClient.getQueriesData(["deletedSample"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["deletedSample"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["deletedSample"]), updatedData;
    },
  });
  return mutation;
};

const usePostExpertComment = () => {
  const mutation = useMutation((data) => postExpertComment(data));
  return mutation;
};

const useGetExpertProfile = () => {
  const { data, isLoading, refetch } = useQuery(["getExpertDetail"], () =>
    getExpertProfile()
  );
  return { data, isLoading, refetch };
};

const usePutUpdateExpert = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putUpdateExpert(data), {
    onError: () => {
      queryClient.getQueriesData(["getExpertDetail"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getExpertDetail"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["getExpertDetail"], updatedData);
    },
  });
  return mutation;
};

const useGetExpertsNeighborhoodsList = () => {
  const { data, isLoading } = useQuery(["getExpertsNeighborhoodsList"], () =>
    getExpertsNeighborhoodsList()
  );
  return { data, isLoading };
};

const useGetExpertsAvailableNeighborhoods = () => {
  const { data, isLoading } = useQuery(
    ["getExpertsAvailableNeighborhoods"],
    () => getExpertsAvailableNeighborhoods()
  );
  return { data, isLoading };
};

const usePutUpdateNeighborhoodExpert = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putUpdateNeighborhoodExpert(data), {
    onError: () => {
      queryClient.getQueriesData(["getExpertsAvailableNeighborhoods"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getExpertsAvailableNeighborhoods"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(
        ["getExpertsAvailableNeighborhoods"],
        updatedData
      );
    },
  });
  return mutation;
};
const useExpertGoingToWork = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id) => postExpertGoingToWork(id), {
    // onError: () => {
    //   queryClient.getQueriesData(["getExpertsAvailableNeighborhoods"]);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries(["getExpertsAvailableNeighborhoods"]);
    // },
    // onSuccess: (updatedData) => {
    //   queryClient.setQueryData(
    //     ["getExpertsAvailableNeighborhoods"],
    //     updatedData
    //   );
    // },
  });
  return mutation;
};
const useGetNotifacations = () => {
  const { data, isLoading, refetch } = useQuery(["notifications"], () =>
    getNotifications()
  );
  return { data, isLoading, refetch };
};

const useGetCredit = () => {
  const { data, isLoading, refetch } = useQuery(["credit"], () => getCredit());
  return { data, isLoading, refetch };
};

const usePostExpertEarlySignUp = () => {
  const mutation = useMutation((data) => postExpertEarlySignUp(data));
  return mutation;
};
const useExpertIncreaseCredit = () => {
  const mutation = useMutation((data) => increaseExpertCredit(data), {
    onSuccess: (updatedData) => {},
  });
  return mutation;
};

const useGetExpertsSpecialty = () => {
  const { data, isLoading } = useQuery(["useGetExpertsSpecialty"], () =>
    getExpertsSpecialty()
  );
  return { data, isLoading };
};

const useGetExpertSampleList = (expert_id) => {
  const { data, isLoading, refetch } = useQuery(
    ["getExpertSampleList", expert_id],
    () => getExpertSampleList(expert_id),
    { enabled: !!expert_id }
  );
  return { data, isLoading, refetch };
};

const useGetExpertComments = () => {
  const { data, isLoading, refetch } = useQuery(["getExpertComments"], () =>
    getExpertComments()
  );
  return { data, isLoading, refetch };
};

const useGetExpertDetail = (expert_id) => {
  const { data, isLoading, refetch } = useQuery(
    ["getExpertDetailById", expert_id],
    () => getExpertDetail(expert_id),
    { enabled: !!expert_id }
  );
  return { data, isLoading, refetch };
};

export {
  useGetNotAvailableTime,
  usePutNotAvailableTime,
  useGetSampleList,
  useGetSampleDetails,
  usePostCreateSample,
  usePutUpdateSample,
  useDeleteSample,
  useGetExpertProfile,
  usePutUpdateExpert,
  useGetExpertsNeighborhoodsList,
  usePutUpdateNeighborhoodExpert,
  useGetExpertsAvailableNeighborhoods,
  useGetNotifacations,
  useGetCredit,
  usePostExpertEarlySignUp,
  useGetExpertsSpecialty,
  useGetExpertSampleList,
  useGetExpertDetail,
  useExpertIncreaseCredit,
  usePostExpertComment,
  useGetExpertComments,
  useExpertGoingToWork,
};
