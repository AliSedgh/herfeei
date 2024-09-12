import { Button } from "@mui/material";
import blogCard from "../../public/images/blog-card.png";
import edit from "../../public/icons/edit-example.svg";
import close from "../../public/icons/close-blog.svg";
import Image from "next/image";
import { DeleteExampleModal } from "../deleteExampleModal/DeleteExampleModal";
import { useEffect, useState } from "react";
import { UploadImageExample } from "../uploadImageExample/UploadImageExample";
import { ArrowRightAlt } from "@mui/icons-material";
import { useGetSampleList } from "../../core/hooks/useExpertApi";

const DeskWorkSamples = () => {
  const { data: sampleList, isLoading, refetch } = useGetSampleList();
  const [isShow, setIsShow] = useState(false);
  const [sampleId, setSampleId] = useState();
  const [isShowCreate, setIsShowCreate] = useState(false);

  const handleOpen = (id) => {
    setIsShow(!isShow);
    setSampleId(id);
  };

  useEffect(() => {
    !isShow && refetch();
    !isShowCreate && refetch();
  }, [isShow, isShowCreate]);

  const handleCreateShow = () => {
    refetch();
    setIsShowCreate(!isShowCreate);
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      {isShow && (
        <DeleteExampleModal
          isShow={isShow}
          setIsShow={setIsShow}
          sampleId={sampleId}
        />
      )}
      {isShowCreate ? (
        <div className="w-full rounded-md bg-white flex flex-col items-center justify-center gap-6">
          <div className="w-full flex justify-start">
            <Button
              onClick={handleCreateShow}
              startIcon={<ArrowRightAlt className="!text-black ml-2" />}
              className="text-[#000]"
            >
              بازگشت
            </Button>
          </div>
          <UploadImageExample setIsShowCreate={setIsShowCreate} />
        </div>
      ) : (
        <div className="w-full rounded-2xl flex flex-col items-center gap-6 md:bg-white">
          <div className="flex justify-center">
            <Button
              onClick={handleCreateShow}
              className="px-4 py-3 bg-blue-600 rounded-lg text-center text-white hover:bg-blue-700"
            >
              نمونه کار جدید
            </Button>
          </div>
          <div className="w-full text-right text-neutral-800 font-semibold leading-snug text-[14px] xs:text-[16px]">
            نمونه کارهای شما
          </div>
          <div className="w-full flex gap-[16px_40px] flex-wrap justify-center">
            {sampleList.map((sample) => (
              <div
                dir="ltr"
                className="w-full xs:w-[40%] md:w-[172px] rounded-lg overflow-hidden relative [border:1px_solid_#D6D6D6] shadow"
                key={sample.id}
              >
                <div className="absolute z-10 top-2 left-2 w-full flex gap-2">
                  <Button
                    className="text-white w-[58px] h-6 bg-[#ff000087] hover:bg-[#d9000087] p-[2.75px] pr-0.5 rounded-sm justify-between items-center gap-0.5 inline-flex"
                    onClick={() => handleOpen(sample?.id)}
                  >
                    <span className="relative w-6 h-6">
                      <Image src={close} alt="close" fill />
                    </span>
                    <span className="pt-0.5">حذف</span>
                  </Button>
                  <Button className="text-white w-[72px] h-6 bg-[#246bfd87] hover:bg-[#024ce087] p-[2.75px] pr-0.5 rounded-sm justify-between items-center gap-0.5 inline-flex">
                    <span className="relative w-6 h-6">
                      <Image src={edit} alt="edit" fill />
                    </span>
                    <span>ویرایش</span>
                  </Button>
                </div>
                <div className="w-full h-[180px] relative">
                  {sample.images.length === 0 ? (
                    <Image src={blogCard} alt="blogImage" fill />
                  ) : (
                    <Image
                      src={sample?.images[0]?.image}
                      alt="blogImage"
                      fill
                    />
                  )}
                </div>
                <div className="w-full h-9 p-2 bg-white justify-end items-center gap-2.5 inline-flex">
                  <span className="text-right text-sm font-normal leading-tight">
                    {sample?.title === "" ||
                    sample?.title == null ||
                    sample?.title == undefined
                      ? "بدون عنوان"
                      : sample?.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { DeskWorkSamples };
