import { Button, Checkbox } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { usePostPayment } from "../../core/hooks/useOrderApi";
import { useQueryClient } from "react-query";
import { UserContext } from "../../pages/_app";

const OnlinePayment = ({ invoice, id, usedDiscount }) => {
  const router = useRouter();
  const isOffer = false;
  const isTrueOffer = false;
  const [offer, setOffer] = useState(0);
  const postPayment = usePostPayment();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [userCredit, setUserCredit] = useState(user?.credit);
  const [userBonusPoints, setUserBonusPoints] = useState(user?.bonus_points);
  const [finalPrice, setFinalPrice] = useState(invoice);

  const handlePayment = () => {
    postPayment.mutate(
      {
        order_id: id,
        payment_type: "online",
        use_credit: value === "credit" ? "true" : "false",
        use_bonus_points: value === "bonus" ? "true" : "false",
      },
      {
        onSuccess: (res) => {
          if (res?.status === 200) {
            queryClient.invalidateQueries(["userProfile"]);
            if (res?.data["bazaar-pay-url"]) {
              router.replace(res?.data["bazaar-pay-url"]);
            } else {
              router.replace(
                `/receipt?status=204&order_track_id=${res?.data?.order_track_id}&type=${res?.data?.type}`
              );
            }
          } else {
            toast.error("خطایی رخ داده است");
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-800 text-xs font-normal leading-[18px] m-0">
        مشتری گرامی پرداخت آنلاین یک روش پرداخت امن میباشد که میتواند از بروز
        مشکلات احتمالی جلوگیری نمایید.
      </p>
      {/* <div className="w-full flex gap-2">
        <div
          onClick={() => setGiftChecked(!giftChecked)}
          className="w-[calc(50%-0.25rem)] h-[72px] px-6 bg-stone-50 hover:bg-stone-100 rounded-md flex justify-between items-center transition-all cursor-pointer"
        >
          <div className="h-full flex gap-2 items-center">
            <span className="relative w-8 h-8">
              <Image src={giftCard} alt="giftCard" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-800 text-base font-semibold leading-snug">
                اعتبار هدیه
              </span>
              <div className="flex gap-2 text-neutral-800 text-sm font-semibold leading-tight">
                <span>موجودی</span>
                <span>20000 تومان</span>
              </div>
            </div>
          </div>
          <div>
            <Checkbox checked={giftChecked} />
          </div>
        </div>
        <div
          onClick={() => setWalletChecked(!walletChecked)}
          className="w-[calc(50%-0.25rem)] h-[72px] px-6 bg-stone-50 hover:bg-stone-100 rounded-md flex justify-between items-center transition-all cursor-pointer"
        >
          <div className="h-full flex gap-2 items-center">
            <span className="relative w-8 h-8">
              <Image src={wallet} alt="giftCard" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-800 text-base font-semibold leading-snug">
                کیف پول
              </span>
              <div className="flex gap-2 text-neutral-800 text-sm font-semibold leading-tight">
                <span>موجودی</span>
                <span>20000 تومان</span>
              </div>
            </div>
          </div>
          <div>
            <Checkbox checked={walletChecked} />
          </div>
        </div>
      </div> */}
      <div className="w-full flex flex-col items-center justify-center">
        <div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <form className="flex md:flex-col flex-row text-zinc-800 justify-start gap-2 font-semibold text-xs items-start">
              <div className="flex flex-row-reverse gap-2">
                <label>
                  پرداخت از اعتبار (اعتبار شما :
                  <span className="font-bold">{userCredit} تومان</span> )
                </label>{" "}
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
                  <span className="font-bold">{userBonusPoints}</span>)
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

export default OnlinePayment;
