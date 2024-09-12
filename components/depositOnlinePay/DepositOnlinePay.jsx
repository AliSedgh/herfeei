import Image from "next/image";
import wallet from "../../public/icons/wallet.svg";
import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import { usePostDepositPayment } from "../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const DepositOnlinePay = ({ invoice, id }) => {
  const router = useRouter();
  const [walletChecked, setWalletChecked] = useState(false);
  const postDepositPayment = usePostDepositPayment();

  const handlePayment = () => {
    postDepositPayment.mutate(id, {
      onSuccess: (res) => {
        if (res["bazaar-pay-url"] && res["bazaar-pay-url"] !== undefined) {
          router.push(res["bazaar-pay-url"]);
        } else {
          toast.error("خطایی رخ داده است");
        }
      },
      onError: (res) => {
        toast.error("خطایی رخ داده است");
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-zinc-800 text-xs font-normal leading-[18px] m-0">
        مشتری گرامی پرداخت آنلاین یک روش پرداخت امن میباشد که میتواند از بروز
        مشکلات احتمالی جلوگیری نمایید.
      </p>
      {/* <div className="w-full">
        <div
          onClick={() => setWalletChecked(!walletChecked)}
          className="w-full h-[72px] px-6 bg-stone-50 hover:bg-stone-100 rounded-md flex justify-between items-center transition-all cursor-pointer"
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
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <div className="flex justify-center items-center gap-[39px]">
        <div className="flex flex-col gap-2 items-center justify-center text-zinc-800 text-base font-semibold leading-snug">
          <span>مبلغ قابل پرداخت:</span>
          <span>{invoice} تومان</span>
        </div>
        <Button
          className="p-2 h-[46px] w-[229px] hover:bg-green-500 bg-green-500 rounded-lg text-right text-white text-base font-semibold leading-snug"
          variant="contained"
          onClick={handlePayment}
        >
          پرداخت
        </Button>
      </div>
    </div>
  );
};

export default DepositOnlinePay;
