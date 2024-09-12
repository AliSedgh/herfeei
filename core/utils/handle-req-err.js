export const handleRequestError = (err) => {
  if (err?.response) {
    console.log("***********", err);

    return err.response.data;
  } else {
  }
};
