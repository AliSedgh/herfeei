import Link from "next/link";
import unauthorized from "../../public/images/unauthorized.png";
import Image from "next/image";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={unauthorized}
        alt="401unauthorized"
        className="w-[250px] h-[250px] p-[50px]"
      />
      <h2 className="text-3xl">401 لطفا وارد شوید</h2>
      <p className="text-center">
        {" "}
        شما اجازه دسترسی به این صفحه را ندارید لطفا به{" "}
        <Link className="text-blue-400" href="/">
          خانه
        </Link>{" "}
        برگردید
      </p>
    </div>
  );
};

export default Index;
