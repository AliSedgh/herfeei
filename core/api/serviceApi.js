import { SERVICES_END_POINTS } from "../constants/endpoints.js";
import instance from "../constants/request.js";
import { handleRequestError } from "../utils/handle-req-err.js";

export const getServicesCategories = async () => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_service_categories_list}`
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getServicesInDemand = async () => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_service_in_demand_list}`
    );
    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getServiceQuestions = async (id) => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_service_questions}${id}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getSubCategories = async ({ slug }) => {
  const decodedSlug = decodeURIComponent(slug);

  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_category}${decodedSlug}/`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const serviceDetailPageData = async ({ slug }) => {
  const decodedSlug = decodeURIComponent(slug);
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_services_detail}${decodedSlug}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const sendServiceQuestionsAnswer = async ({
  service_id,
  answers_id,
}) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_service_questions}`,
      { service_id, answers_id }
    );

    return res?.data;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const sendOrderDescription = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_order_description}`,
      data
    );

    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};
export const sendServiceRecipient = async ({
  order_id,
  for_other,
  recipient,
  recipient_number,
}) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_service_recipient}`,
      { order_id, for_other, recipient, recipient_number }
    );
    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};
export const sendServiceTime = async ({ time, date, address_id, order_id }) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_service_time}`,
      { time, date, address_id, order_id }
    );

    return res?.status;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postServiceTime = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_service_time}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postGiftCreditCode = async (code) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_increase_gift_credit}`,
      { token: code }
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getExpertList = async (id) => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_expert_list}${id}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getNeighborhoodList = async (id) => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_neighborhood_list}${id}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postExpertPrioritizing = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_expert_prioritizing}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postAnswersQuestion = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_answers_question}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postOrderConfirmation = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_order_confirmation}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getSearchCategoryServices = async (query) => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_search_category_services}${query}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getServiceActive = async (service_id, city_id) => {
  try {
    const res = await instance.get(
      `${SERVICES_END_POINTS.get_service_active}?service_id=${service_id}&city_id=${city_id}`
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const getHistorySearch = async () => {
  try {
    const res = await instance.get(`${SERVICES_END_POINTS.get_history_search}`);

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postHistorySearch = async (id) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_history_search}`,
      {
        servicecategory_id: id,
      }
    );

    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};

export const postCheckDiscountCode = async (data) => {
  try {
    const res = await instance.post(
      `${SERVICES_END_POINTS.post_check_discount_code}`,
      data
    );
    return res;
  } catch (err) {
    return handleRequestError(err);
  }
};
