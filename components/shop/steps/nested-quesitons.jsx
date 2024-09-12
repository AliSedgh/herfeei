import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
function NestedQuestions({ question, onSelect, next, prev }) {
  const [questionChild, setQuestionChild] = useState(question || []);

  useEffect(() => {
    setQuestionChild(question);
  }, [question]);

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };
  return (
    <div className="px-3 mx-auto">
      <div className="mb-4">{questionChild?.title}</div>

      {questionChild?.children && questionChild?.children?.length > 0 && (
        <div className="sm:flex md:gap-6  ">
          {questionChild?.children?.map((item, index) => (
            <div key={item.id} item={item}>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ border: "1px solid red" }}
                className="!bg-[#F9F9F9] inline-block w-full sm:w-[361px] !border-solid !border-[#EBEBEB] !border-1 text-right  mb-3  hover:bg-secondary rounded-xl  py-4 "
                onClick={() => {
                  if (item.children[0]) {
                    onSelect(item);
                  } else {
                    next();
                  }
                }}
              >
                {item.title}
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NestedQuestions;
