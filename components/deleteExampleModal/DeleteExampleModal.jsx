import { Close } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { createPortal } from "react-dom";
import { deleteSample } from "../../core/api/expertApi";
import { useDeleteSample } from "../../core/hooks/useExpertApi";

const DeleteExampleModal = ({ isShow, setIsShow, sampleId }) => {
  const deletThisSample = useDeleteSample();
  const handleRemove = async (sampleId) => {
    const formData = new FormData();
    formData.append("sample_id", sampleId);
    deletThisSample.mutate(formData);
    setIsShow(!isShow);
  };
  return (
    <>
      {createPortal(
        <div className="w-[100vw] h-[100vh] bg-[#00000050] fixed top-0 left-0 z-50 flex justify-center items-center ">
          <div className="w-[95%] 2xs:w-[354px] py-4 bg-white flex-col rounded-2xl">
            <div className="w-full px-6 flex justify-between items-center">
              <span className=" h-8 text-right text-black text-base font-normal leading-snug">
                حذف نمونه کار
              </span>
              <div className="w-6 h-6">
                <IconButton
                  className="p-0 text-[#999CA0]"
                  onClick={() => setIsShow(!isShow)}
                >
                  <Close />
                </IconButton>
              </div>
            </div>
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px] mt-4" />
            <div className="p-6">
              <span>آیا از حذف این نمونه کار مطمئن هستید؟</span>
            </div>
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px] mb-4" />
            <div className="flex justify-center gap-[15px]">
              <Button
                variant="outlined"
                className="text-black border-neutral-400 hover:border-neutral-400"
                onClick={() => setIsShow(!isShow)}
              >
                انصراف
              </Button>
              <Button
                onClick={() => handleRemove(sampleId)}
                variant="outlined"
                className="border-rose-500 hover:border-rose-500 text-rose-500"
              >
                حذف نمونه کار
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export { DeleteExampleModal };
