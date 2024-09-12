import { toast } from "react-toastify";
import { EXPERT_END_POINT } from "../constants/endpoints.js";
import instance from "../constants/request.js";
import { handleRequestError } from "../utils/handle-req-err.js";

export const getNotAvailableTime = async () => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_not_available_time}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const putNotAvailableTime = async (not_available) => {
  try {
    const res = await instance.put(
      `${EXPERT_END_POINT.put_not_available_time}`,
      { not_available }
    );
    toast.success("روزهای فعالیت ثبت شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getSampleList = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_sample_list}`);
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getSampleDetails = async (sample_id) => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_sample_details}${sample_id}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postCreateSample = async (data) => {
  try {
    const res = await instance.post(
      `${EXPERT_END_POINT.post_create_sample}`,
      data
    );
    toast.success("نمونه کار با موفقیت اضافه شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const increaseExpertCredit = async (data) => {
  try {
    const res = await instance.post(
      `${EXPERT_END_POINT.post_expert_increase_credit}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateSample = async ({
  sample_id,
  titel,
  deleted_images,
  new_image,
}) => {
  try {
    const res = await instance.put(`${EXPERT_END_POINT.put_update_sample}`, {
      sample_id,
      titel,
      deleted_images,
      new_image,
    });
    toast.success("نمونه کار با موفقیت ویرایش شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const deleteSample = async (data) => {
  try {
    const res = await instance.delete(
      `${EXPERT_END_POINT.delete_sample}`,
      {
        data: data,
      }
      // data
    );
    toast.success("نمونه کار با موفقیت حذف شد");
    return res?.status;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getExpertProfile = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_expert_profile}`);

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateExpert = async (data) => {
  try {
    const res = await instance.put(
      `${EXPERT_END_POINT.put_update_expert}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getExpertsNeighborhoodsList = async () => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_experts_neighborhoods_list}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getExpertsAvailableNeighborhoods = async () => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_experts_available_neighborhoods}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateNeighborhoodExpert = async (data) => {
  try {
    const res = await instance.put(
      `${EXPERT_END_POINT.put_update_neighborhood_expert}`,
      data
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};
export const getNotifications = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_notifications}`);
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getCredit = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_expert_credit}`);
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};
export const getExpertComments = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_expert_comments}`);
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const postExpertEarlySignUp = async (data) => {
  try {
    const res = await instance.post(
      `${EXPERT_END_POINT.post_expert_early_sign_up}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postExpertComment = async (data) => {
  try {
    const res = await instance.post(
      `${EXPERT_END_POINT.post_expert_comment}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getExpertsSpecialty = async () => {
  try {
    const res = await instance.get(`${EXPERT_END_POINT.get_experts_specialty}`);

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getExpertSampleList = async (expert_id) => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_expert_sample_list}${expert_id}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};

export const getExpertDetail = async (expert_id) => {
  try {
    const res = await instance.get(
      `${EXPERT_END_POINT.get_expert_detail}${expert_id}`
    );
    return res?.data;
  } catch (err) {
    toast.error(err.response.data.message);
    return handleRequestError(err);
  }
};
