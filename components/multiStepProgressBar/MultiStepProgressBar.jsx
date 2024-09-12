// import React from "react";

// const MultiStepProgressBar = ({ step }) => {
//   const steps = Array(8).fill(null);

//   return (
//     <div className="stepper-wrapper-c">
//       {steps.map((_, index) => (
//         <div
//           key={index}
//           className={`stepper-item-c ${index < step ? "completed" : ""}`}
//         >
//           {index === step - 1 && <div className="step-counter-c"></div>}
//         </div>
//       ))}
//     </div>
//   );
// };

// export { MultiStepProgressBar };

import React, { useEffect, useState, useRef } from "react";

const MultiStepProgressBar = ({ step }) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const containerRef = useRef(null);
  const steps = Array(8).fill(null);

  useEffect(() => {
    // Update the width of the progress bar based on the parent's width and active div count
    const updateProgressWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const divs = containerRef.current.querySelectorAll("div").length;
        const activeDivs =
          containerRef.current.querySelectorAll(".active").length;
        const widthRatio = Math.min((containerWidth / (divs - 1)) * step); // ensure the ratio does not exceed 1
        setProgressWidth(widthRatio);
      }
    };

    // Initial width calculation
    updateProgressWidth();

    // Recalculate width on window resize
    window.addEventListener("resize", updateProgressWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateProgressWidth);
    };
  }, []);

  return (
    <div dir="rtl" className="progress_container w-full" ref={containerRef}>
      <div
        className="progress rounded-r-lg"
        id="progress"
        style={{ width: `${progressWidth}px` }}
      ></div>
      {steps.map((_, index) => (
        <div
          key={index}
          className={`${index === step - 1 ? "circle" : ""} ${
            index <= step - 1 ? "active" : ""
          }`}
          style={{ right: `${progressWidth}px` }}
        ></div>
      ))}
    </div>
  );
};

export { MultiStepProgressBar };

// import React from "react";

// const MultiStepProgressBar = ({ step }) => {
//   return (
//     <>
//       <div className="stepper-wrapper-c">
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c"></div>
//         <div className="stepper-item-c completed">
//           <div className="step-counter-c"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export { MultiStepProgressBar };
