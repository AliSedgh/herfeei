import { PROFILE_END_POINTS } from "../../../constants/endpoints";
import instance from "../../../constants/request.js";
import { handleRequestError } from "../../../utils/handle-req-err.js";

export const getAllFaqs = async () => {
  try {
    const res = await instance.get(`${PROFILE_END_POINTS.get_all_faqs}`);

    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};
