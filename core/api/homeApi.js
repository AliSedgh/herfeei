import { HOME_END_POINTS } from "../constants/endpoints.js";
import instance from "../constants/request.js";
import { handleRequestError } from "../utils/handle-req-err.js";

export const getSlider = async () => {
  try {
    const res = await instance.get(`${HOME_END_POINTS.get_slider}`);

    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getEventService = async () => {
  try {
    const res = await instance.get(`${HOME_END_POINTS.event_service}`);

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getHomeComments = async () => {
  try {
    const res = await instance.get(`${HOME_END_POINTS.get_home_comments}`);

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};
