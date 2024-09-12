import {
  ORDER_END_POINTS,
  PROFILE_END_POINTS,
} from "../../constants/endpoints.js";
import instance from "../../constants/request.js";
import { handleRequestError } from "../../utils/handle-req-err.js";

export const getProfile = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_profile}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getProfileAvatar = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_profile_avatar}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getAvatarList = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_avatar_list}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateProfile = async (data) => {
  try {
    const res = await instance.put(
      `${PROFILE_END_POINTS.put_update_profile}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateProfileAvatar = async (data) => {
  try {
    const res = await instance.put(
      `${PROFILE_END_POINTS.put_update_profile_avatar}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const increaseCredit = async (data) => {
  try {
    const res = await instance.post(
      `${PROFILE_END_POINTS.post_increase_credit}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getTransaction = async (data) => {
  try {
    const res = await instance.get(
      `${ORDER_END_POINTS.get_Transactions}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getNotifications = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_notifications}`);
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getUserTransactions = async () => {
  try {
    const res = await instance.get(`${ORDER_END_POINTS.get_user_transactions}`);
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getInvitationCode = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_invitation_code}`);
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};
