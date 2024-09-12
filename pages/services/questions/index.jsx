// Questions.jsx
import React, { useState } from "react";
import NestedQuestions from "../../../components/shop/steps/nested-quesitons";
import { motion } from "framer-motion";
import useQuestionStore from "../../../store/questions";
import { useRouter } from "next/router";

function Questions({ id }) {
  const { questions } = useQuestionStore();
  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };
  let indices = [];
  const [end, setEnd] = useState(false);
  function indexQAs(QAs, parrentQAIndex = 0) {
    QAs?.map((qa, i) => {
      const qaIndex = parrentQAIndex * 10 + (i + 1);
      indices.push(qaIndex);
      qa.index = qaIndex;
      if (qa?.children && qa?.children.length) {
        indexQAs(qa?.children, qaIndex);
      }
    });
    return indices;
  }

  indexQAs(questions);
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
    if (indexArray?.length == 0) return desiredQuestion;
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
  indexQAs(questions);
  const [question, setQueston] = useState(questions[0]);

  questions, "dd";

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
  const nexthandler = () => {
    if (question?.index) {
      const nextQuestion = findNextQuestion(
        questions,
        indices,
        question?.index
      );
      if (nextQuestion?.id) {
        setQueston(nextQuestion);
      }
    } else {
      setEnd(true);
    }
  };
  const router = useRouter();
  const prevHndlrer = () => {
    if (question?.index == 1) {
      router.replace("/services/questions/");
    }
    if (question?.index) {
      const prevQuestion = findPreviousQuestion(
        questions,
        indices,
        question?.index
      );

      if (prevQuestion?.id) {
        setQueston(prevQuestion);
      }
    } else {
      setQueston(questions[0]);
    }
  };

  return (
    <div>
      <NestedQuestions
        onSelect={(item) => {
          setQueston(item[0]);
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
            مرحله قبل
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full whitespace-nowrap block md:w-min px-8 md:px-16  py-3 rounded-xl border-0 bg-primary text-white "
            href={nexthandler}
          >
            ادامه
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
