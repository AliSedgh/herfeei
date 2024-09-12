import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePostAnswersQuestion } from "../../../core/hooks/useServiceApi";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getServiceQuestions } from "../../../core/api/serviceApi";
import { toast } from "react-toastify";
import { UserContext } from "../../_app";
import { MultiStepProgressBar } from "../../../components/multiStepProgressBar/MultiStepProgressBar";
import Breadcrumb from "../../../components/breadCrumb";
import { Close } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Shop({ data, id }) {
  const [currentPath, setCurrentPath] = useState([data]);
  const [questionHistory, setQuestionHistory] = useState([]); // استیت جدید برای ذخیره کردن مسیر سوالات و پاسخ‌ها
  const { user, setShowLogin } = useContext(UserContext);
  const [answersPath, setAnswersPath] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(undefined);
  const [error, setError] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const router = useRouter();
  const postAnswersQuestion = usePostAnswersQuestion();
  const categoryTitle = localStorage.getItem("category_title_modal");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    isLoading,
    isError,
    data: serviceQuestions,
  } = useQuery(["serviceQuestions", id], () => getServiceQuestions(id), {
    initialData: data,
  });

  useEffect(() => {
    if (serviceQuestions) {
      setCurrentPath([serviceQuestions.data]);
    }
  }, [serviceQuestions]);

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
  ];

  const handleMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const handleAnswerClick = (answer) => {
    // setSelectedAnswer(...selectedAnswer, answer);
    if (selectedAnswer == undefined) {
      setSelectedAnswer([answer]);
    } else {
      // Check if answer's id already exists in selectedAnswer
      if (selectedAnswer.find((item) => item.id === answer.id)) {
        // If exists, filter out the answer with the matching id
        setSelectedAnswer((prevStateArray) =>
          prevStateArray.filter((item) => item.id !== answer.id)
        );
      } else {
        // If not exists, add the answer to selectedAnswer
        setSelectedAnswer((prevStateArray) => [...prevStateArray, answer]);
      }
      // setSelectedAnswer((prevStateArray) => [...prevStateArray, answer]);
    }
    setError("");
    handleMouseLeave();
  };

  const handleSubmit = (answers) => {
    postAnswersQuestion.mutate(
      {
        service_id: id,
        answers_id: answers.join(","),
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("order_id", data?.data.order_id);
          router.push("/services/order-description");
        },
        onError: (error) => {
          toast.error("خطایی رخ داده است");
        },
      }
    );
  };

  console.log("mlit", questionHistory);

  const handleNextStep = (item) => {
    // if (selectedAnswer === null) {
    //   toast.error("لطفا یک پاسخ را انتخاب کنید");
    //   return;
    // }

    const newAnswersPath = [
      ...answersPath,
      item?.id != null ? item.id : selectedAnswer?.map((it) => it.id),
    ];
    setAnswersPath(newAnswersPath);

    // var updatedAnswerPath;

    // if (item.id !== null) {
    //   // const newAnswersPath = [...answersPath, item.id];
    //   setAnswersPath((state) => {
    //     updatedAnswerPath = [...state, item.id];
    //     return [...state, item.id];
    //   });
    // } else {
    //   // const newAnswersPath = [...answersPath, selectedAnswer.id];
    //   setAnswersPath((state) => {
    //     updatedAnswerPath = [...state, selectedAnswer.id];
    //     return [...state, selectedAnswer.id];
    //   });
    //   // setAnswersPath(newAnswersPath);
    // }
    // console.log("updatedAnswerPath", updatedAnswerPath);

    setQuestionHistory((prevHistory) => [
      ...prevHistory,
      {
        question: currentPath,
        answer: item?.id != null ? item : selectedAnswer?.map((it) => it),
      },
    ]); // ذخیره کردن سوالات و پاسخ‌ها

    if (
      selectedAnswer?.map((it) => it.children.length) > 0 ||
      item?.children.length > 0
    ) {
      setCurrentPath((prevPath) => {
        const newPath = [
          ...prevPath,
          item?.id != null
            ? item.children
            : selectedAnswer?.map((it) => it.children),
        ];
        console.log("newPath", newPath);
        return newPath;
      });
      setSelectedAnswer(null); // Reset selected answer for next step
      // console.log("p1");
    } else {
      // go back to first level from here
      // first next question from layer 1
      let thisQuestionIndex;
      serviceQuestions?.data.forEach((question, index) => {
        // check if item[0] exists in currentPath state (array)
        currentPath.forEach((item) => {
          console.log(
            "if condition",
            JSON.stringify(question) === JSON.stringify(item[0])
          );
          JSON.stringify(question) === JSON.stringify(item[0])
            ? (thisQuestionIndex = index)
            : null;
        });
      });

      // console.log("p2");
      setSelectedAnswer(null);

      const nextQuestionIndex = thisQuestionIndex + 1;

      // Check if we have reached the last question
      if (nextQuestionIndex < serviceQuestions?.data.length) {
        console.log(
          "thisQuestionIndex",
          serviceQuestions?.data[nextQuestionIndex]
        );
        setCurrentPath([[serviceQuestions?.data[nextQuestionIndex]]]);

        // console.log("p3");
        setSelectedAnswer(null);
      } else {
        handleSubmit(newAnswersPath);
        // console.log("p4");
      }
    }
  };

  const handlePreviousStep = () => {
    // اگر در لایه اول هستیم و سوال اول در حال نمایش است، به صفحه سرویس‌ها هدایت شود
    if (questionHistory.length === 0) {
      router.push("/services");
    } else {
      setQuestionHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        const lastEntry = newHistory.pop();
        setCurrentPath(lastEntry.question);
        // setSelectedAnswer(lastEntry.answer);
        setSelectedAnswer(undefined);
        setAnswersPath((prevAnswers) => prevAnswers.slice(0, -1));
        return newHistory;
      });
    }
  };

  const currentQuestion = currentPath[currentPath.length - 1];

  // console.log("lml:selectedAnswer", answersPath);

  // useEffect(() => {
  //   // فقط اگر selectedAnswer مقدار داشته باشد و شرایط مورد نظر برای اجرای handleNextStep فراهم باشد، اجرا شود
  //   if (selectedAnswer !== null && !currentQuestion[0].is_multiselect) {
  //     handleNextStep();
  //   }
  // }, [selectedAnswer, currentQuestion]); // افزودن handleNextStep به وابستگی‌ها

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="md:mt-0 p-2">
      <div className="flex mb-0 md:hidden justify-between items-center p-5">
        <div>{categoryTitle}</div>
        <div>
          <Close className="cursor-pointer" onClick={handleOpen} />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-2xl min-h-[225px] w-[270px] 3xs:w-[90%] 2xs:w-[343px] bg-white flex flex-col items-center justify-between"
        >
          <div className="flex flex-row-reverse w-full justify-between items-center p-4">
            <Close
              onClick={handleClose}
              className="text-[#999CA0] cursor-pointer hover:scale-[1.05] duration-300"
            />
            <p className="m-0 p-0 text-[#000000] text-[16px]">
              {categoryTitle}
            </p>
          </div>
          <div className="w-full p-5 [border-top:1px_solid_#EBEBEB] [border-bottom:1px_solid_#EBEBEB]">
            <p className="m-0 p-0 text-[#212121] text-[16px] font-semibold">
              شما در حال تکمیل سفارش {categoryTitle} هستید، آیا مایل به ادامه
              خروج از ثبت سفارش هستید؟
            </p>
          </div>
          <div className="w-full min-h-[70px] flex-col-reverse items-center justify-center gap-3 3xs:gap-3 3xs:py-5">
            <div className="flex gap-1 justify-center w-full">
              <Button
                onClick={() => {
                  handleClose();
                  router.replace("/");
                }}
                variant="outlined"
                color="inherit"
                className="text-[#F75555] [border:1px_solid_#F75555] rounded-lg font-semibold text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                خروج و ذخیره سفارش
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  router.replace("/");
                }}
                variant="outlined"
                color="inherit"
                className="text-[#F75555] [border:1px_solid_#F75555] rounded-lg font-semibold text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                انصراف از سفارش
              </Button>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="inherit"
                className="text-white bg-primary mt-2 [border:1px_solid_#999CA0] rounded-lg font-semibold w-[80%] text-[12px] 3xs:text-[14px] 2xs:text-[16px] p-2"
              >
                ادامه سفارش
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {currentQuestion && currentQuestion.length > 0 ? (
        <div className="w-full mb-[91px]">
          <div className="hidden md:block">
            <Breadcrumb paths={breadcrumbPaths} />
          </div>
          <MultiStepProgressBar step={1} />
          <p className="mb-8">{currentQuestion[0].title}</p>
          <div className="w-full grid grid-cols-1 grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
            {currentQuestion[0].children.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (!user) {
                    setShowLogin(true);
                  } else {
                    if (!currentQuestion[0].is_multiselect) {
                      handleNextStep(item);
                    } else {
                      handleAnswerClick(item);
                    }
                  }
                  console.log(
                    "lmde",
                    selectedAnswer && selectedAnswer,
                    selectedAnswer?.includes(item?.id),
                    item.id
                  );
                }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                className={`w-full flex justify-between items-center gap-1 text-[14px] rounded-[11px] px-2 py-3 cursor-pointer duration-300 ${
                  hoveredItemId === item.id
                    ? "hover:[border:1px_solid_blue] hover:[background-color:rgb(219,234,254)] scale-105"
                    : ""
                } ${
                  currentQuestion[0].is_multiselect &&
                  selectedAnswer?.findIndex((it) => it.id == item?.id) > -1
                    ? "[border:1px_solid_blue] [background-color:rgb(219,234,254)]"
                    : "[border:1px_solid_#ccc] [background-color:rgb(243,244,246)]"
                }`}
              >
                <p className="m-0 p-0">{item.title}</p>
                <div className="w-[10%] h-full flex justify-center items-center">
                  {currentQuestion[0].is_multiselect &&
                    !(
                      selectedAnswer?.findIndex((it) => it.id == item?.id) > -1
                    ) && (
                      <div className="w-[16px] h-[16px] bg-white rounded-[3px] [border:1px_solid_#cecece]"></div>
                    )}
                  {currentQuestion[0].is_multiselect &&
                    selectedAnswer?.findIndex((it) => it.id == item?.id) >
                      -1 && (
                      <CheckBoxIcon className="text-[blue] w-[20px] h-[20px]" />
                    )}
                </div>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div></div>
      )}
      <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePreviousStep}
          className="md:!mx-auto !block !px-6 md:!px-12 !whitespace-nowrap !py-3 !rounded-xl !bg-white [border:1px_solid_#ccc] !w-full md:!w-[173px] cursor-pointer"
        >
          مرحله قبل
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:mx-auto whitespace-nowrap block px-10 md:px-16 py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px] cursor-pointer"
          // onClick={handleNextStep}
          onClick={() => {
            if (
              currentQuestion[0].is_mandatory === true &&
              selectedAnswer == undefined
            ) {
              toast.error("لطفا یک پاسخ را انتخاب کنید");
            } else {
              handleNextStep();
            }
          }}
        >
          ادامه
        </motion.button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const serviceQuestions = await getServiceQuestions(params?.id);

  return {
    props: {
      data: serviceQuestions?.data || [],
      id: params?.id,
    },
  };
}

export default Shop;
