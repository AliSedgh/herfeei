import Link from "next/link";
// import notFound from "../../public/images/404.gif";
import notFound from "../public/images/404.gif";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={notFound} alt="404NotFound" className="w-[250px] h-[250px]" />
      <h2 className="text-3xl">404 پیدا نشد</h2>
      <p className="text-center">
        صفحه مورد نظر شما یافت نشد لطفا به{" "}
        <Link className="text-blue-400" href="/">
          خانه
        </Link>{" "}
        برگردید
      </p>
    </div>
  );
}
