import Image from "next/image";
import emptyOrderimg from "../../public/images/empty-order.png";

const EmptyOrderList = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col text-center">
      <div className="w-[86px] h-[86px] relative">
        <Image
          src={emptyOrderimg}
          fill
          className="object-contain"
          alt="emtyOrderList"
        />
      </div>
      <b className="text-[18px] md:text-[22px] text-[#1A1D1F leading-[30px] mt-[32px]">
        هیچ درخواستی ندارید
      </b>
      <span className="text-[14px] md:text-[16px] text-[#535763] leading-[22px] mt-[10px]">
        در حال حاضر هیچ گونه درخواستی ندارید
      </span>
    </div>
  );
};

export { EmptyOrderList };
