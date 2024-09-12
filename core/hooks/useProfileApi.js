import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAvatarList,
  getInvitationCode,
  getNotifications,
  getProfile,
  getProfileAvatar,
  getTransaction,
  getUserTransactions,
  increaseCredit,
  putUpdateProfile,
  putUpdateProfileAvatar,
} from "../api/profileApi/profileApi";

const useGetProfile = () => {
  const { data, isLoading } = useQuery(["userprofile"], () => getProfile(), {
    initialData: [],
  });
  return { data, isLoading };
};

const useGetProfileAvatar = () => {
  const { data, isLoading } = useQuery(
    ["getProfileAvatar"],
    () => getProfileAvatar(),
    {
      initialData: [],
    }
  );
  return { data, isLoading };
};

const useGetAvatarList = () => {
  const { data, isLoading } = useQuery(
    ["getAvatarList"],
    () => getAvatarList(),
    {
      initialData: [],
    }
  );
  return { data, isLoading };
};

const useTransactionsList = () => {
  const { data, isLoading } = useQuery(["transactionList"], () =>
    getTransaction()
  );
  return { data, isLoading };
};

const useUserTransactions = () => {
  const { data, isLoading } = useQuery(["userTransactionList"], () =>
    getUserTransactions()
  );
  return { data, isLoading };
};

const useGetInvitationCode = () => {
  const { data, isLoading } = useQuery(["userInvitationCode"], () =>
    getInvitationCode()
  );
  return { data, isLoading };
};

const usePutUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => putUpdateProfile(data), {
    onError: () => {
      queryClient.getQueriesData(["userprofile"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userprofile"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["userprofile"], updatedData);
    },
  });
  return mutation;
};

const useIncreaseCredit = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => increaseCredit(data), {
    onSuccess: (updatedData) => {
      // queryClient.setQueryData(["userprofile"], updatedData);
    },
  });
  return mutation;
};

const useUserNotifications = () => {
  const { data, isLoading, isError } = useQuery(["user_notifications"], () =>
    getNotifications()
  );
  return { data, isLoading, isError };
};

const usePutUpdateProfileAvatar = () => {
  const mutation = useMutation((data) => putUpdateProfileAvatar(data));
  return mutation;
};

export {
  useGetProfile,
  usePutUpdateProfile,
  useGetProfileAvatar,
  useGetAvatarList,
  usePutUpdateProfileAvatar,
  useIncreaseCredit,
  useTransactionsList,
  useUserTransactions,
  useUserNotifications,
  useGetInvitationCode,
};
