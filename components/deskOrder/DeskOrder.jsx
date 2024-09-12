import Image from "next/image";
import Location from "../../public/icons/location2.svg";
import Clock from "../../public/icons/clock2.svg";
import {
  BrandExpertDetails,
  ExpertInvoiceData,
  GoToLocation,
  MediaInOrder,
  StartOrderDetails,
  UserInDetail,
} from "../../components/orderCards/OrderCards";
import moment from "jalali-moment";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

const DeskOrder = ({ status, data }) => {
  const draft =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(153,155,167,0.10)] text-[#999BA7] text-[12px] 2xs:text-[16px]";

  const neighborhood = data?.user_address?.neighborhood ?? "";
  const details = data?.user_address?.details ?? "";
  const title = data?.user_address?.title ?? "";
  const fullAddress = neighborhood + " - " + details + " - " + title;

  const timeData =
    data?.order_time === null ? "" : data?.order_time?.split("-")[0];
  const time = timeData > 12 ? timeData - 12 : timeData;

  const convertToJalaliDate = (gregorianDate) => {
    // تبدیل تاریخ میلادی به تاریخ شمسی و قالب‌بندی آن
    return format(new Date(gregorianDate), "EEEE dd MMMM", { locale: faIR });
  };

  return (
    <div className="w-full flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] md:[border:1px_solid_#d9d9d9] border-none bg-white md:[box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] shadow-none">
      <div className="flex flex-row-reverse justify-end items-center gap-4 self-stretch">
        <div className="w-auto 2xs:w-[244px] flex flex-col gap-[6px] shrink-0">
          <b className="text-[12px] 2xs:text-[16px] text-right font-[600] leading-[160%] text-[#212121]">
            {data?.service?.category?.title}
          </b>
          <span className="text-[#6F767E] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
            کد پیگیری: {data?.order_track_id}
          </span>
        </div>
        <div className="w-[50px] h-[50px] rounded-[4px] [border:1px_solid_#d6d6d6] flex justify-center items-center p-[3px] bg-white relative">
          <Image
            src={data?.service?.category?.category_image}
            alt="orderPic"
            fill
          />
        </div>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />

      <div className="flex justify-between items-center gap-[7px] self-stretch">
        <span className="text-[#6F767E] text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
          وضعیت سفارش:
        </span>
        <span className={draft}>
          {status === "FINISHED" ? "پایان یافته" : ""}
        </span>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-start gap-3 md:gap-10 self-stretch">
        <div className="flex items-center gap-2">
          <div className="relative w-[24px] h-[24px] p-[3px_4.5px]">
            <Image src={Location} alt="location" fill />
          </div>
          <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
            {fullAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-[24px] h-[24px] p-[2.75px]">
            <Image src={Clock} alt="clock" fill />
          </div>
          <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
            {data?.order_date === null || data?.order_date === undefined
              ? ""
              : convertToJalaliDate(data?.order_date) +
                " ساعت " +
                time +
                " " +
                (timeData > 3 && timeData < 12
                  ? "صبح"
                  : timeData >= 12 && timeData < 14
                  ? "ظهر"
                  : timeData >= 14 && timeData < 17
                  ? "بعد از ظهر"
                  : timeData >= 17 && timeData < 20
                  ? "غروب"
                  : "شب")}
          </span>
        </div>
      </div>
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <UserInDetail data={data} />
      <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
      <BrandExpertDetails data={data} />
      <MediaInOrder data={data} />
      <ExpertInvoiceData data={data} />
    </div>
  );
};

export { DeskOrder };
