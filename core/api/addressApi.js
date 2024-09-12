import { ADDRESS_END_POINTS } from "../constants/endpoints.js";
import instance from "../constants/request.js";
import { handleRequestError } from "../utils/handle-req-err.js";

export const getAddressList = async () => {
  try {
    const res = await instance.get(`${ADDRESS_END_POINTS.get_address_list}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getAddressById = async (addressId) => {
  try {
    const res = await instance.get(
      `${ADDRESS_END_POINTS.get_address}${addressId}`
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getProvinceList = async () => {
  try {
    const res = await instance.get(`${ADDRESS_END_POINTS.get_province_list}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getCityBaseProvince = async (id) => {
  try {
    const res = await instance.get(`${ADDRESS_END_POINTS.get_city_list}${id}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const putUpdateAddress = async (data) => {
  try {
    const res = await instance.put(
      `${ADDRESS_END_POINTS.put_update_address}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postCreateAddress = async (data) => {
  try {
    const res = await instance.post(
      `${ADDRESS_END_POINTS.post_create_address}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getSearchCity = async () => {
  try {
    const res = await instance.get(`${ADDRESS_END_POINTS.get_search_city}`);
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};
