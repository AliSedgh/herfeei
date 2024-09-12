import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  InputAdornment,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePostInvoiceOffering } from "../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import formatNumberWithCommas, {
  removeCommas,
} from "../../core/utils/formatNumbersWithCommas";

const validationSchema = yup.object({
  salary: yup.string(),
  equipment_cost: yup.string(),
  transportation_cost: yup.string(),
  expertise: yup.string(),
});

const InvoiceFrom = ({ status, initialAgreedAmount, deposit }) => {
  const queryClient = useQueryClient();
  const [isDisabled, setIsDisabled] = useState(
    status === "DEPOSIT" ? true : false
  );
  const router = useRouter();
  const [id, setId] = useState(router?.query?.id);
  const postInvoice = usePostInvoiceOffering();

  useEffect(() => {
    status && setIsDisabled(status === "DEPOSIT" ? true : false);
  }, [status]);

  useEffect(() => {
    setId(router?.query?.id);
  }, [router]);

  const formik = useFormik({
    initialValues: {
      order_id: id,
      salary: "",
      equipment_cost: "",
      transportation_cost: "",
      expertise: 0,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.salary === "") {
        values.salary = 0;
      }
      if (values.equipment_cost === "") {
        values.equipment_cost = 0;
      }
      if (values.transportation_cost === "") {
        values.transportation_cost = 0;
      }
      if (values.expertise === "") {
        values.expertise = 0;
      }

      const data = {
        salary: removeCommas(values.salary),
        equipment_cost: removeCommas(values.equipment_cost),
        transportation_cost: removeCommas(values.transportation_cost),
        expertise: removeCommas(values.expertise),
        description: values.description,
        order_id: values.order_id,
      };

      postInvoice.mutate(data, {
        onError: () => {
          queryClient.getQueriesData(["expertOrder"]);
        },

        onSuccess: (res) => {
          if (res === 200) {
            router.push("/desk");
          } else {
            if (
              res.response.data.detail.message ===
              "فقط یکی از موارد دستمزد یا کارشناسی قابل اخد میباشد"
            ) {
              toast.error(res.response.data.detail.message);
            } else {
              toast.error("خطا در ارتباط با سرور");
            }
          }
        },
      });
    },
  });

  return (
    <div className="w-full lg:w-[956px] flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] ">
      {status === "DEPOSIT" ? (
        <div className="flex items-center flex-row-reverse gap-2">
          <FormLabel
            className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%] cursor-pointer"
            htmlFor="isDisable"
          >
            انصراف از دریافت بیعانه
          </FormLabel>
          <Checkbox
            id="isDisable"
            name="isDisable"
            onClick={() => {
              setIsDisabled(!isDisabled);
            }}
            checked={!isDisabled}
          />
        </div>
      ) : (
        <></>
      )}
      <FormControl className="w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex gap-6 justify-around flex-wrap"
        >
          {status === "DEPOSIT_PAID" && (
            <>
              <div className="w-full rounded-md p-5 bg-[#F9F9F9] flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-full md:w-[48%] flex flex-col gap-2">
                  <FormLabel
                    className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
                    htmlFor="initialAgreedAmount"
                  >
                    مبلغ کل توافق شده سرویس
                  </FormLabel>
                  <TextField
                    disabled
                    className="text-[13px] sm:text-[16px]"
                    dir="ltr"
                    id="initialAgreedAmount"
                    name="initialAgreedAmount"
                    value={initialAgreedAmount}
                  />
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-2">
                  <FormLabel
                    className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
                    htmlFor="deposit"
                  >
                    بیعانه دریافت شده
                  </FormLabel>
                  <TextField
                    disabled
                    className="text-[13px] sm:text-[16px]"
                    dir="ltr"
                    id="deposit"
                    name="deposit"
                    value={deposit}
                  />
                </div>
              </div>
              <span className="[border:1px_solid_#EFEFEF] w-full rounded-[1px]" />
            </>
          )}
          <div className="w-full md:w-[48%] flex flex-col gap-2">
            <FormLabel
              disabled={isDisabled}
              className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
              htmlFor="salary"
            >
              مبلغ دستمزد
            </FormLabel>
            <TextField
              disabled={isDisabled}
              className="text-[13px] sm:text-[16px]"
              dir="ltr"
              id="salary"
              name="salary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">تومان</InputAdornment>
                ),
              }}
              value={formatNumberWithCommas(removeCommas(formik.values.salary))}
              onChange={(e) => {
                const data = removeCommas(e.target.value);
                if (!isNaN(data)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
          </div>
          <div className="w-full md:w-[48%] flex flex-col gap-2">
            <FormLabel
              disabled={isDisabled}
              className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
              htmlFor="equipment_cost"
            >
              هزینه وسایل
            </FormLabel>
            <TextField
              disabled={isDisabled}
              className="text-[13px] sm:text-[16px]"
              dir="ltr"
              id="equipment_cost"
              name="equipment_cost"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">تومان</InputAdornment>
                ),
              }}
              value={formatNumberWithCommas(
                removeCommas(formik.values.equipment_cost)
              )}
              onChange={(e) => {
                const data = removeCommas(e.target.value);
                if (!isNaN(data)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.equipment_cost &&
                Boolean(formik.errors.equipment_cost)
              }
              helperText={
                formik.touched.equipment_cost && formik.errors.equipment_cost
              }
            />
          </div>
          <div className="w-full md:w-[48%] flex flex-col gap-2">
            <FormLabel
              disabled={isDisabled}
              className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
              htmlFor="transportation_cost"
            >
              ایاب و ذهاب
            </FormLabel>
            <TextField
              disabled={isDisabled}
              className="text-[13px] sm:text-[16px]"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">تومان</InputAdornment>
                ),
              }}
              dir="ltr"
              id="transportation_cost"
              name="transportation_cost"
              value={formatNumberWithCommas(
                removeCommas(formik.values.transportation_cost)
              )}
              onChange={(e) => {
                const data = removeCommas(e.target.value);
                if (!isNaN(data)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.transportation_cost &&
                Boolean(formik.errors.transportation_cost)
              }
              helperText={
                formik.touched.transportation_cost &&
                formik.errors.transportation_cost
              }
            />
          </div>
          <div className="w-full md:w-[48%] flex flex-col gap-2">
            <FormLabel
              disabled={isDisabled}
              className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
              htmlFor="expertise"
            >
              هزینه کارشناسی
            </FormLabel>
            <TextField
              disabled={isDisabled}
              className="text-[13px] sm:text-[16px]"
              dir="ltr"
              id="expertise"
              name="expertise"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">تومان</InputAdornment>
                ),
              }}
              value={formatNumberWithCommas(
                removeCommas(formik.values.expertise)
              )}
              onChange={(e) => {
                const data = removeCommas(e.target.value);
                if (!isNaN(data)) {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expertise && Boolean(formik.errors.expertise)
              }
              helperText={"*در صورت انجام کار،هزینه کارشناسی تعلق نمی گیرد"}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <FormLabel
              disabled={isDisabled}
              className="text-black text-[13px] sm:text-[16px] font-[400] leading-[140%]"
              htmlFor="description"
            >
              شرح کار
            </FormLabel>
            <TextareaAutosize
              disabled={isDisabled}
              className="max-w-full min-w-full min-h-[128px] p-4"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-fit">
            <Button
              disabled={isDisabled}
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

export { InvoiceFrom };
