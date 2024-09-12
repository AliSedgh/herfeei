import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getExpertOrder,
  getUserOrderList,
  getUserOrderDetail,
  getDepositData,
  postDepositOffering,
  postPayment,
  postInvoiceOffering,
  postExpertOrderAccepting,
  postExpertOrderStarting,
  getExpertOrderDetail,
  getOrderByTrackId,
  postDepositPayment,
  updateGuaranteeOrder,
  updateOrderInvoice,
  getUsersGuaranteedOrders,
  deleteUserOrder,
  postOrderSelectedExpert,
  expertOrderReject,
  postUserCancelExpert,
} from "../api/orderApi";

const useGetExpertOrder = ({ page, type = "in_progress" }) => {
  const { data, isLoading, refetch } = useQuery(
    ["expertOrder", page ?? 1],
    () => getExpertOrder(page ?? 1, type)
  );
  return { data, isLoading, refetch };
};

const useGetExpertOrderPageOne = () => {
  const { data, isLoading, refetch } = useQuery(
    ["expertOrder"],
    () => getExpertOrder(1),
    { refetchInterval: 5000 }
  );
  return { data, isLoading, refetch };
};

const useGetExpertOrderDetail = (order_id) => {
  const { data, isLoading, refetch } = useQuery(
    ["expertOrderDetail", order_id],
    () => getExpertOrderDetail(order_id),
    { enabled: !!order_id }
  );
  return { data, isLoading, refetch };
};

const useGetGuaranteedOrders = () => {
  const { data, isLoading, refetch } = useQuery(["usersGuaranteedOrders"], () =>
    getUsersGuaranteedOrders()
  );
  return { data, isLoading, refetch };
};

const useGetUserOrderList = (type) => {
  const { data, isLoading, refetch } = useQuery(["userOrderList"], () =>
    getUserOrderList(1, type)
  );
  return { data, isLoading, refetch };
};

const useGetUserOrderDetail = (order_id) => {
  const { data, isLoading } = useQuery(
    ["userOrderDetail", order_id],
    () => getUserOrderDetail(order_id),
    { enabled: !!order_id }
  );
  return { data, isLoading };
};

const useGetOrderByTrackId = (order_track_id) => {
  const { data, isLoading } = useQuery(
    ["useGetOrderByTrackId", order_track_id],
    () => getOrderByTrackId(order_track_id),
    { enabled: !!order_track_id }
  );
  return { data, isLoading };
};

const useGetDepositData = (order_id) => {
  const { data, isLoading } = useQuery(["depositData", order_id], () =>
    getDepositData(order_id)
  );
  return { data, isLoading };
};

const usePostExpertOrderAccepting = () => {
  const mutation = useMutation((order_id, confirmation) =>
    postExpertOrderAccepting(order_id, confirmation)
  );
  return mutation;
};

const useUserCancelExpert = () => {
  const mutation = useMutation((order_id) => postUserCancelExpert(order_id));
  return mutation;
};

const usePostOrderSelectedExpert = () => {
  const mutation = useMutation((data) => postOrderSelectedExpert(data));
  return mutation;
};

const useUpdateOrderGuarantee = () => {
  const mutation = useMutation((data) => updateGuaranteeOrder(data));
  return mutation;
};

const useDeleteUserOrder = () => {
  const mutation = useMutation((orderId) => deleteUserOrder(orderId));
  return mutation;
};

const useExpertOrderReject = () => {
  const mutation = useMutation((id) => expertOrderReject(id));
  return mutation;
};

const usePostInvoiceOffering = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => postInvoiceOffering(data), {
    onError: () => {
      queryClient.getQueriesData(["userOrderDetail"]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userOrderDetail"]);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["userOrderDetail"], updatedData);
    },
  });
  return mutation;
};

const usePostDepositOffering = () => {
  const mutation = useMutation((data) => postDepositOffering(data));
  return mutation;
};
const useUpdateOrderInvoice = () => {
  const mutation = useMutation((data) => updateOrderInvoice(data));
  return mutation;
};

const usePostPayment = () => {
  const mutation = useMutation((data) => postPayment(data));
  return mutation;
};

const usePostDepositPayment = () => {
  const mutation = useMutation((data) => postDepositPayment(data));
  return mutation;
};

const usePostExpertOrderStarting = () => {
  const mutation = useMutation((data) => postExpertOrderStarting(data));
  return mutation;
};

export {
  useGetExpertOrder,
  useGetExpertOrderDetail,
  useGetUserOrderList,
  useGetUserOrderDetail,
  useGetDepositData,
  usePostDepositOffering,
  usePostInvoiceOffering,
  usePostPayment,
  usePostExpertOrderStarting,
  usePostExpertOrderAccepting,
  useGetOrderByTrackId,
  usePostDepositPayment,
  useGetExpertOrderPageOne,
  useUpdateOrderGuarantee,
  useUpdateOrderInvoice,
  useGetGuaranteedOrders,
  useDeleteUserOrder,
  usePostOrderSelectedExpert,
  useExpertOrderReject,
  useUserCancelExpert,
};
