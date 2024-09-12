import { toast } from "react-toastify";
import { EXPERT_END_POINT, ORDER_END_POINTS } from "../constants/endpoints.js";
import instance from "../constants/request.js";
import { handleRequestError } from "../utils/handle-req-err.js";

//get Api
export const getExpertOrder = async (page, type = "in_progress") => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_expert_order_list}?type=${type}&page=${page}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return err;
  }
};

export const getExpertOrderDetail = async (order_id) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_expert_order_detail}?order_id=${order_id}`
    );
    return res;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getOrderByTrackId = async (order_track_id) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_order_by_track_id}${order_track_id}`
    );
    return res;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getUserOrderList = async (page, type) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_user_order_list}?type=${type}&page=${page}`
    );

    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getUserOrderDetail = async (order_id) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_user_order_detail}?order_id=${order_id}`
    );
    return res;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getUsersGuaranteedOrders = async () => {
  try {
    const res = await instance.get(`${ORDER_END_POINTS.get_orders_guaranteed}`);
    return res;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getDepositData = async (order_id) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_deposit_data}?order_id=${order_id}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

// post api

export const postExpertOrderAccepting = async ({ order_id, confirmation }) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_expert_order_acceptance}`,
      { order_id, confirmation }
    );
    toast.success("قبول سفارش انجام شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postOrderSelectedExpert = async (data) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_user_order_select_expert}`,
      { order_id: data.order_id, expert_id: data?.expert_id }
    );
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postUserCancelExpert = async (order_id) => {
  try {
    const res = await instance.post(`${ORDER_END_POINTS.user_cancel_expert}`, {
      order_id,
    });
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const deleteUserOrder = async (order_id) => {
  try {
    const res = await instance.delete(`${ORDER_END_POINTS.delete_user_order}`, {
      order_id,
    });
    toast.success("قبول سفارش انجام شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postExpertOrderRejecting = async ({ order_id, status }) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_expert_order_rejecting}`,
      { order_id, status }
    );
    toast.success("انصراف از سفارش با موفقیت انجام شد");
    // return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postUserOrderCanceling = async ({ order_id, status }) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_user_order_canceling}`,
      { order_id, status }
    );

    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};
export const expertOrderReject = async (order_id) => {
  try {
    const res = await instance.post(`${ORDER_END_POINTS.expert_order_reject}`, {
      order_id,
    });

    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postExpertGoingToWork = async (order_id) => {
  try {
    const res = await instance.post(
      `${EXPERT_END_POINT.post_expert_going_to_work}`,
      { order_id }
    );

    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postExpertOrderStarting = async ({ order_id, confirmation }) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_expert_order_starting}`,
      { order_id, confirmation }
    );

    toast.success("کار شما با موفقیت شروع شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postInvoiceOffering = async ({
  order_id,
  salary,
  equipment_cost,
  transportation_cost,
  expertise,
  description,
}) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_invoice_offering}`,
      {
        order_id,
        salary,
        equipment_cost,
        transportation_cost,
        expertise,
        description,
      }
    );
    toast.success("صورتحساب برای کاربر ارسال شد");
    return res?.status;
  } catch (err) {
    return err;
  }
};

export const postDepositOffering = async ({
  order_id,
  initial_agreed_amount,
  deposit,
  deposit_description,
}) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_deposit_offering}`,
      { order_id, initial_agreed_amount, deposit, deposit_description }
    );
    toast.success("درخواست بیعانه برای کاربر ارسال شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postPayment = async ({
  order_id,
  payment_type,
  use_credit,
  use_bonus_points,
}) => {
  try {
    const res = await instance.post(`${ORDER_END_POINTS.post_payment}`, {
      order_id,
      payment_type,
      use_credit,
      use_bonus_points,
    });
    // toast.success("پرداخت با موفقیت انجام شد");
    return res;
  } catch (err) {
    // toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postDepositPayment = async (order_id) => {
  try {
    const res = await instance.post(
      `${ORDER_END_POINTS.post_deposit_payment}`,
      { order_id }
    );
    // toast.success("بیعانه برای کاربر ارسال شد");
    return res?.data;
  } catch (err) {
    // toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const updateGuaranteeOrder = async (data) => {
  try {
    const res = await instance.patch(
      `${ORDER_END_POINTS.patch_order_guarantee}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const updateOrderInvoice = async (data) => {
  try {
    const res = await instance.put(
      `${ORDER_END_POINTS.update_order_invoice}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};
