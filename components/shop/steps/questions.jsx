// Questions.jsx
import React, { useState, useContext } from "react";
import NestedQuestions from "./nested-quesitons";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
import { sendServiceQuestionsAnswer } from "../../../core/api/serviceApi";
import { UserContext } from "../../../pages/_app";
import ProgressBar from "../../../core/utils/progress-bar";
import { Close } from "@mui/icons-material";
import useModalStore from "../../../store/modalStore";
import MyModal from "../../ui/modal";
function Questions({ data, id }) {
  const { user, setShowLogin, showLogin } = useContext(UserContext);

  let indices = [];
  const { isOpen, openModal } = useModalStore();
  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  function indexQAs(QAs, parrentQAIndex = 0) {
    QAs?.map((qa, i) => {
      const qaIndex = parrentQAIndex * 10 + (i + 1);
      indices.push(qaIndex);
      qa.index = qaIndex;
      if (qa?.children && qa.children.length) {
        indexQAs(qa.children, qaIndex);
      }
    });
    return indices;
  }
  indexQAs(data);
  // **** utils **** START
  function splitIntoDigits(num) {
    const digitCharacters = num.toString().split("");
    const digits = digitCharacters.map(Number);
    return digits;
  }
  //index questio ro bar migardone
  function findPreviousQuestionIndex(indices, currentQuestionIndex) {
    if (indices.includes(currentQuestionIndex - 1)) {
      return currentQuestionIndex - 1;
    } else {
      const preIndex = Math.floor(currentQuestionIndex / 100);
      return preIndex;
    }
  }
  //khode  question ro return mikone
  function findNextQuestionIndex(indices, currentQuestionIndex) {
    if (indices.includes(currentQuestionIndex + 1)) {
      return currentQuestionIndex + 1;
    } else {
      const parrentIndex = Math.floor(currentQuestionIndex / 100);
      if (parrentIndex == 0) return {};
      return findNextQuestionIndex(indices, parrentIndex);
    }
  }

  function findQuestionByIndexArray(QAs, indexArray) {
    let desiredQuestion = {};
    if (indexArray.length == 0) return desiredQuestion;
    desiredQuestion = QAs[indexArray[0] - 1];
    const newIndexArray = indexArray.slice(2);
    if (newIndexArray?.length > 0 && newIndexArray[0]) {
      const innerQAs = desiredQuestion?.children[indexArray[1] - 1].children;
      return findQuestionByIndexArray(innerQAs, newIndexArray);
    } else {
      return desiredQuestion;
    }
  }

  // **** utils **** END
  indexQAs(data);
  const [question, setQueston] = useState(data[0]);

  function findPreviousQuestion(QAs, indices, currentQuestionIndex) {
    const previousQuestionIndex = findPreviousQuestionIndex(
      indices,
      currentQuestionIndex
    );
    if (previousQuestionIndex == 0) return {};
    const previousIndexArray = splitIntoDigits(previousQuestionIndex);
    const previousQuestion = findQuestionByIndexArray(QAs, previousIndexArray);
    return previousQuestion;
  }

  function findNextQuestion(QAs, indices, currentQuestionIndex) {
    const nextQuestionIndex = findNextQuestionIndex(
      indices,
      currentQuestionIndex
    );
    const nextQuestionIndexArray = splitIntoDigits(nextQuestionIndex);
    const nextQuestion = findQuestionByIndexArray(QAs, nextQuestionIndexArray);
    return nextQuestion;
  }
  const [answers_id, setAnserId] = useState([]);
  const nexthandler = async () => {
    if (question?.index) {
      const nextQuestion = findNextQuestion(data, indices, question?.index);

      if (nextQuestion?.id) {
        setQueston(nextQuestion);
      } else {
        ///here should send request to back
        const service_id = localStorage?.getItem("service_id") || id;
        const strArr = answers_id.join(",");
        const res = await sendServiceQuestionsAnswer({
          service_id,
          answers_id: strArr,
        });

        if (res?.detail) {
          setShowLogin(!showLogin);
        } else if (res?.order_id) {
          localStorage.setItem("order_id", res?.order_id);
          router.replace("/services/order-description");
        }
      }
    }
  };
  const router = useRouter();

  const prevHndlrer = () => {
    if (question?.index == 1) {
      router.push(localStorage?.getItem("service_path"));
    }
    if (question?.index) {
      const prevQuestion = findPreviousQuestion(data, indices, question?.index);

      if (prevQuestion?.id) {
        setQueston(prevQuestion);
      }
    } else {
      setQueston(data[0]);
    }
  };
  let url = "";
  if (typeof window != "undefined") {
    url = localStorage?.getItem("service_path");
  }
  return (
    <div className="mt-[-12rem] md:mt-0">
      <div className="flex  md:hidden justify-between items-center p-5">
        <div>تعمیر یخچال و فریزر</div>
        <div>
          <Close onClick={openModal} />
        </div>
        <MyModal
          open={isOpen}
          title="تعمیر یخچال و فریزر"
          description="شما در حال تکمیل سفارش تعمیر یخچال و فریزر هستید، آیا مایل به خروج از ادامه ثبت سفارش هستید؟"
          questionPage={true}
        />
      </div>
      <ProgressBar currentStep={0} />
      <NestedQuestions
        onSelect={(item) => {
          setAnserId((pre) => [...pre, item.id]);
          setQueston(item.children[0]);
        }}
        question={question}
        next={nexthandler}
      />

      <div
        style={{
          boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
        }}
        className="flex  z-20 bg-[white] fixed gap-6 md:py-6 pb-10 w-full md:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
      >
        <div
          style={{
            boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
          }}
          className="flex z-20 bg-[white] fixed gap-6 md:py-6 pb-10 w-full md:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
        >
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevHndlrer}
            style={{ border: "1px solid red" }}
            className="mr-4  block w-full md:px-16 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText  md:w-fit"
          >
            {(question?.index == 1 && url != "") || !question ? (
              <Link
                href={{
                  pathname: url,
                }}
              >
                {" "}
                مرحله قبل
              </Link>
            ) : (
              <div>مرحله قبل</div>
            )}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full whitespace-nowrap block md:w-min px-8 md:px-16  py-3 rounded-xl border-0 bg-primary text-white ${
              question?.is_mandatory && question?.children.length > 0
                ? "bg-mutedText"
                : ""
            }`}
            onClick={nexthandler}
            disabled={
              question?.is_mandatory && question?.children.length > 0
                ? true
                : false
            }
          >
            ادامه
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
