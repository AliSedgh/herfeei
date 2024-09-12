import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ArrowSvg from "../../public/icons/arrow.svg";

export default function ProfileMenuItem({
  link,
  imageSrc,
  imageBgColor,
  title,
  footerItem = false,
  children,
}) {
  const pathname = usePathname();

  return (
    <>
      <Link href={link} className={footerItem && "md:hidden"}>
        <div
          className="flex bg-white items-center justify-between ml-1 rounded-lg h-[4rem]"
          style={pathname === link ? { backgroundColor: "#CDDFFF" } : {}}
        >
          <div className="m-[.3rem] rounded-xl flex items-center">
            <Image
              className="!bg-[#F9F9F9] rounded-lg p-[.4rem] cursor-pointer  m-3"
              style={imageBgColor ? { background: imageBgColor } : {}}
              src={imageSrc}
              width={32}
              height={32}
              alt="icon"
            />

            <div>
              <p className="xs:mt-2 xs:mb-0 text-[#1A1D1F] text-[14px] xs:text-base font-bold">
                {title}
              </p>
              {imageBgColor && (
                <p
                  className={`xs:mt-2 xs:mb-0 text-${
                    imageBgColor ? "[#0361FF]" : "[#1A1D1F]"
                  } text-[14px] xs:text-base font-bold`}
                >
                  {imageBgColor ? "دریافت امتیاز" : ""}
                </p>
              )}
            </div>
          </div>
          <div className="relative w-[15px] h-[15px] m-4">
            <Image
              className="object-contain"
              src={ArrowSvg.src}
              fill
              alt="arrow icon"
            />
          </div>
        </div>
      </Link>
      {title === "پیام‌ها" && children}
    </>
  );
}
