import { Rating } from "@mui/material";
import React from "react";
import { formatRelativeTimeInPersian } from "../../core/utils/formatNumbersWithCommas";

const ExpertComments = ({ comments, rate }) => {
  return (
    <div className="w-full py-6 flex flex-col items-center  bg-white min-h-[60vh] md:min-h-0 md:h-full rounded-lg">
      <div
        style={{ borderBottom: "1px solid #EFEFEF" }}
        className="flex items-center w-[90%] gap-4 justify-center mb-5 pb-4"
      >
        <div
          style={{ border: "1px solid #EBEBEB" }}
          className="flex flex-col items-center py-4 gap-2 w-1/2 rounded-lg border  md:w-1/4"
        >
          <span className="text-xs text-[#616161]">امتیاز شما</span>
          <div className="text-sm flex items-center gap-1 text-[#212121]">
            <Rating
              name="read-only"
              value={rate}
              max={rate}
              dir="ltr"
              readOnly
            />
            <span className="mt-1 text-xs">{rate}</span>
          </div>
        </div>
        <div
          style={{ border: "1px solid #EBEBEB" }}
          className="flex flex-col items-center py-4 gap-2 w-1/2 border rounded-lg  md:w-1/4"
        >
          <span className="text-xs text-[#616161]">نظرات کاربران</span>
          <span className="text-sm text-[#212121] font-semibold">
            {comments?.length} نظر
          </span>
        </div>
      </div>

      {comments?.length ? (
        <div className="space-y-2 px-3 md:px-[100px] w-full">
          <p className="text-right w-full mb-6 font-semibold">
            نظر کاربران درباره شما
          </p>
          {comments?.map((comment, index) => (
            <CommentCard comment={comment} key={index} />
          ))}
        </div>
      ) : (
        <p>نظری درمورد شما ثبت نشده است</p>
      )}
    </div>
  );
};

export default ExpertComments;

const CommentCard = ({ comment }) => {
  return (
    <div
      style={{ border: "1px solid #D6D6D6" }}
      className="w-full rounded-lg md:px-12 px-3 py-2"
    >
      <div className=" flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-semibold">
              {comment?.user?.profile_name?.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col h-full gap-1 justify-between">
            <span className="text-sm font-semibold text-[#261E27]">
              {comment?.user?.profile_name}
            </span>
            <span className="text-xs text-[#999CA0]">
              {formatRelativeTimeInPersian(comment?.created_at)}
            </span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
               <Rating name="read-only" value={comment?.rate} dir="ltr" readOnly />
        <span className="mt-1 text-xs">{comment?.rate}</span>
        </div>
   

      </div>
      <div className="">
        <p className="text-xs text-[#5B555C]">{comment?.comment}</p>
      </div>
    </div>
  );
};
