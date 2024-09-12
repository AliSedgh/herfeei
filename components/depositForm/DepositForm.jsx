import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePostDepositOffering } from "../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import formatNumberWithCommas, {
  removeCommas,
} from "../../core/utils/formatNumbersWithCommas";

const validationSchema = yup.object({
  initial_agreed_amount: yup
    .string("لطفا کل مبلغ توافق شده را به عدد بنویسید")
    .required("این فیلد ضروری میباشد"),
  deposit: yup
    .string("لطفا مبلغ بیعانه را به عدد بنویسید")
    .required("این فیلد ضروری میباشد"),
  deposit_description: yup
    .string("شرح کوتاهی برای دلیل دریافت بیعانه")
    .required("این فیلد ضروری میباشد"),
});

const DepositForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [id, setId] = useState(router?.query?.id);
  const postDeposit = usePostDepositOffering();

  useEffect(() => {
    router?.query?.id && setId(router?.query?.id);
  }, [router?.query?.id]);

  const formik = useFormik({
    initialValues: {
      order_id: id,
      initial_agreed_amount: "",
      deposit: "",
      deposit_description: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.initial_agreed_amount === "") {
        values.initial_agreed_amount = 0;
      }
      if (values.deposit === "") {
        values.deposit = 0;
      }
      const newValue = {
        ...values,
        initial_agreed_amount: removeCommas(values.initial_agreed_amount),
        deposit: removeCommas(values.deposit),
      };
      postDeposit.mutate(newValue, {
        onError: () => {
          queryClient.getQueriesData(["userOrderDetail"]);
        },
        onSettled: () => {
          queryClient.invalidateQueries(["userOrderDetail"]);
        },
        onSuccess: (res) => {
          if (res == 200) {
            queryClient.setQueryData(["userOrderDetail"], res);
            router.push("/desk");
          } else {
            toast.error("خطایی رخ داده است");
          }
        },
      });
    },
  });
  return (
    <div className="w-full lg:w-[956px] flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] md:[border:1px_solid_#d9d9d9] border-none bg-white md:[box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none">
      <FormControl className="w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex gap-6 justify-around flex-wrap"
        >
          <div className="w-full flex flex-col md:flex-row gap-2">
            <div className="w-full flex flex-col gap-2">
              <FormLabel
                className="text-black text-[16px] font-[400] leading-[140%]"
                htmlFor="initial_agreed_amount"
              >
                مبلغ کل توافق شده سرویس
              </FormLabel>
              <TextField
                dir="ltr"
                id="initial_agreed_amount"
                name="initial_agreed_amount"
                value={formatNumberWithCommas(
                  removeCommas(formik.values.initial_agreed_amount)
                )}
                onChange={(e) => {
                  const data = removeCommas(e.target.value);
                  if (!isNaN(data)) {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.initial_agreed_amount &&
                  Boolean(formik.errors.initial_agreed_amount)
                }
                helperText={
                  formik.touched.initial_agreed_amount &&
                  formik.errors.initial_agreed_amount
                }
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <FormLabel
                className="text-black text-[16px] font-[400] leading-[140%]"
                htmlFor="deposit"
              >
                مبلغ درخواستی بیعانه{" "}
              </FormLabel>
              <TextField
                dir="ltr"
                id="deposit"
                name="deposit"
                value={formatNumberWithCommas(
                  removeCommas(formik.values.deposit)
                )}
                onChange={(e) => {
                  const data = removeCommas(e.target.value);
                  if (!isNaN(data)) {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.deposit && Boolean(formik.errors.deposit)}
                helperText={formik.touched.deposit && formik.errors.deposit}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <FormLabel
              className="text-black text-[16px] font-[400] leading-[140%]"
              htmlFor="deposit_description"
            >
              شرح کار
            </FormLabel>
            <TextareaAutosize
              className="max-w-full min-w-full min-h-[128px] p-4"
              id="deposit_description"
              name="deposit_description"
              value={formik.values.deposit_description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.deposit_description &&
                Boolean(formik.errors.deposit_description)
              }
              helperText={
                formik.touched.deposit_description &&
                formik.errors.deposit_description
              }
            />
            <span className="text-red-500 text-[13px]">
              {formik.touched.deposit_description &&
                formik.errors.deposit_description}
            </span>
          </div>
          <div className="w-full md:w-fit">
            <Button
              variant="contained"
              className="w-full md:w-[173px]"
              type="submit"
            >
              تأیید
            </Button>
          </div>
        </form>
      </FormControl>
    </div>
  );
};

export { DepositForm };
