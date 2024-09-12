import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { usePostPayment } from "../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { UserContext } from "../../pages/_app";

const CashPayment = ({ invoice, id, usedDiscount }) => {
  const [value, setValue] = useState("");

  const router = useRouter();
  const isOffer = false;
  const isTrueOffer = false;
  const [offer, setOffer] = useState(0);
  const postPayment = usePostPayment();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [finalPrice, setFinalPrice] = useState(invoice);

  const handlePayment = () => {
    postPayment.mutate(
      {
        order_id: id,
        payment_type: "cash",
        use_credit: value === "credit" ? "true" : "false",
        use_bonus_points: value === "bonus" ? "true" : "false",
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            queryClient.invalidateQueries(["userProfile"]);

            router.push({
              pathname: "/receipt",
              query: {
                status: 204,
                order_track_id: res?.data.order_track_id,
              },
            });
            toast.success("پرداخت با موفقیت انجام شد");
          } else {
            toast.error("خطایی رخ داده است");
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <ul className="text-zinc-800 text-xs font-normal leading-[18px] m-0  flex flex-col gap-4">
        <li>
          کاربرگرامی در نظر داشته باشید در صورت پرداخت نقدی, سرویس شما شامل
          گارانتی 7 روزه حرفه ای نخواهد شد
        </li>
        <li>
          پرداخت بصورت نقدی یک روش پرداخت امن نیست به همین خاطر ما پرداخت نقدی
          را به شما توصیه نمی کنیم.
        </li>
      </ul>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-center flex-col md:flex-row gap-5">
          <form className="flex md:flex-col text-zinc-800 flex-row justify-start gap-2 text-xs items-start">
            <div className="flex flex-row-reverse gap-2">
              <label>
                پرداخت از اعتبار (اعتبار شما :
                <span className="font-bold">{user?.credit} تومان</span> )
              </label>
              <input
                type="checkbox"
                checked={value === "credit"}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setValue("");
                    setFinalPrice((prev) => invoice - offer);
                  } else {
                    setValue("credit");

                    setFinalPrice((prev) => +invoice - offer - +user?.credit);
                  }
                }}
              />
            </div>
            <div className="flex flex-row-reverse gap-2">
              <label>
                پرداخت از اعتبار هدیه (اعتبار هدیه شما:{" "}
                <span className="font-bold">{user?.bonus_points}</span>)
              </label>

              <input
                type="checkbox"
                checked={value === "bonus"}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setValue("");
                    setFinalPrice((prev) => invoice - offer);
                  } else {
                    setValue("bonus");
                    setFinalPrice(
                      (prev) => +invoice - offer - +user?.bonus_points
                    );
                  }
                }}
              />
            </div>
          </form>
          {!usedDiscount && (
            <div className="w-[330px] h-[64px] [border:1px_solid_rgb(229_231_235)] rounded-2xl gap-3 flex items-center p-4">
              <input
                type="text"
                className="w-[187px] h-10 px-2.5 py-2.5 bg-stone-50 rounded-lg [border:1px_solid_#e5e7eb] justify-center items-center gap-2.5 outline-none text-xs placeholder:text-zinc-400 placeholder:text-xs text-center"
                placeholder="اگر کد تخفیف دارید وارد کنید"
              />
              <Button
                className="text-center text-white text-[10px] font-normal leading-[18px] p-2 h-10 w-[99px] bg-[#0361FF] rounded-lg"
                variant="contained"
              >
                بررسی کد تخفیف
              </Button>
            </div>
          )}
        </div>

        {isOffer ? (
          <div className="mt-4">
            {isTrueOffer ? (
              <p className="m-0 p-0 text-green-500">
                {offer} تومان تخفیف با موفقیت اعمال شد
              </p>
            ) : (
              <p className="m-0 p-0 text-red-700">
                کد تخفیف وجود ندارد یا منقضی شده است
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <div className="flex justify-center items-center gap-[39px]">
        <div className="flex flex-col gap-2 items-center justify-center text-zinc-800 text-base font-semibold leading-snug">
          <span>مبلغ قابل پرداخت:</span>
          <span>{finalPrice <= 0 ? 0 : finalPrice} تومان</span>
        </div>
        <Button
          className="p-2 h-[46px] w-[229px] hover:bg-green-500 bg-green-500 rounded-lg text-right text-white text-base font-semibold leading-snug"
          variant="contained"
          onClick={() => handlePayment()}
        >
          پرداخت
        </Button>
      </div>
    </div>
  );
};

export default CashPayment;
