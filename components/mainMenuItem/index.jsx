import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MainMenuItem({ key, link, imageSrc, title, onChangeState }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    onChangeState(false);
  };

  return (
    <div onClick={()=>{
      router.push(link);
      handleClick();
    }} key={key}>
      <div
        className="flex bg-white  items-center justify-between ml-1 rounded-lg mb-1 h-[3rem] hover:bg-[#CDDFFF] cursor-pointer"
        style={pathname === link ? { backgroundColor: "#CDDFFF" } : {}}
      >
        <div className="m-[.3rem] rounded-xl flex items-center">
          <Image
            className="rounded-lg cursor-pointer m-3"
            src={imageSrc}
            width={24}
            height={24}
            alt="icon"
          />

          <div>
            <p className="mt-0 mb-0 text-[#1A1D1F] text-sm font-[600]">
              {title}
            </p>
          </div>
        </div>
        <Image
          className="m-4"
          src="/icons/main-menu-arrow.svg"
          width={15}
          height={15}
          alt="arrow icon"
        />
      </div>
    </div>
  );
}
