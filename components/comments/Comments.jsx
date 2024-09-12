import React from "react";

const Comments = ({ data }) => {
  const renderStars = (rating) => {
    const starIcons = Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-yellow-500 ${
          index + 1 > rating ? "text-current" : "stroke-current"
        }`}
      >
        ★
      </span>
    ));

    return <div className="flex">{starIcons}</div>;
  };

  const formatDateDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} روز قبل`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} ماه قبل`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} سال قبل`;
    }
  };

  return (
    <div className="mt-8 rounded-xl">
      {data?.map((item) => (
        <div
          key={item.id}
          style={{ border: "2px solid #D6D6D6" }}
          className="md:flex justify-between w-full md:py-6 my-3 p-6 md:px-10 rounded-xl [border:1px_solid_#D6D6D6] mb-4"
        >
          <div>
            <div className="flex w-full items-center gap-3">
              <div className="w-[52px] h-[52px] rounded-full bg-[#FFDBD1]/40"></div>
              <div className="text-gray-600 w-full mb-1">
                {item.user.profile_name ? item.user.profile_name : "کاربر"}
                <div className="flex md:hidden justify-between mt-3 items-center w-full">
                  <p className="text-sm text-gray-500 m-0 p-0 w-20">
                    {formatDateDifference(item.created_at)}
                  </p>
                  {renderStars(item.rate)}
                </div>
              </div>
            </div>
            <p className="text-[12px] md:w-80 ">{item.comment}</p>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <p className="text-sm text-gray-500 m-0 p-0 w-20">
              {formatDateDifference(item.created_at)}
            </p>
            {renderStars(item.rate)}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Comments };

// import React from "react";

// const Comments = ({ data }) => {
//   // const comments = [
//   //   {
//   //     id: 1,
//   //     user: "مسعود ذ.",
//   //     date: "3 ماه قبل",
//   //     content:
//   //       "واقعا آدم کار درستی هستش ریز بین و نکته بین کار کرد خدایی دمش گرم",
//   //     rating: 5,
//   //   },
//   //   {
//   //     id: 2,
//   //     user: "علیرضا ا.",
//   //     date: "3 ماه قبل",
//   //     content: "بسیار عالی و کار بلد",
//   //     rating: 4,
//   //   },
//   //   {
//   //     id: 3,
//   //     user: "علی .",
//   //     date: "1 ماه قبل",
//   //     content: "بسیار عالی و کار بلد",
//   //     rating: 2,
//   //   },
//   // ];

//   const renderStars = (rating) => {
//     const starIcons = Array.from({ length: 5 }, (_, index) => (
//       <span
//         key={index}
//         className={`text-yellow-500 ${
//           index + 1 > rating ? "text-current" : "stroke-current"
//         }`}
//       >
//         ★
//       </span>
//     ));

//     return <div className="flex">{starIcons}</div>;
//   };

//   return (
//     <div className="mt-8 rounded-xl">
//       {data?.map((item) => (
//         <div
//           key={item.id}
//           style={{ border: "2px solid #D6D6D6" }}
//           className="md:flex justify-between w-full md:py-6 my-3 p-6 md:px-10 rounded-xl [border:1px_solid_#D6D6D6] mb-4"
//         >
//           <div>
//             <div className="flex w-full  items-center gap-3">
//               {" "}
//               <div className="w-[52px] h-[52px] rounded-full bg-[#FFDBD1]/40"></div>{" "}
//               <div className="text-gray-600 w-full  mb-1 w-44 ">
//                 {item.user.profile_name ? item.user.profile_name : "کاربر"}
//                 <div className="flex md:hidden justify-between items-center w-full ">
//                   <p className="text-sm text-gray-500 mb-1 w-20">
//                     {item.created_at}
//                   </p>
//                   {renderStars(item.rate)}
//                 </div>
//               </div>
//             </div>
//             <p className="text-[12px] md:w-80 ">{item.comment}</p>
//           </div>
//           <div className="hidden md:flex  items-center gap-8 ">
//             <p className="text-sm text-gray-500 mb-1 w-20">{item.created_at}</p>
//             {renderStars(item.rate)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Comments;
