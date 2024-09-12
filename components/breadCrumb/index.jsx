import React from "react";
import { ChevronLeft } from "@mui/icons-material";

const Breadcrumb = ({ paths, currentStep, setCurrentStep }) => {
  if (!Array.isArray(paths)) {
    return null;
  }

  const handleBreadcrumbClick = (index) => {
    // setCurrentStep(index);
  };

  return (
    <div className="mb-4 hidden md:flex z-0">
      {paths.map((path, index) => (
        <div key={index} className="flex">
          {index === paths.length - 1 ? (
            <span className="text-black">{path.label}</span>
          ) : (
            <div className="flex items-center justify-center" href={path.link}>
              <span
                className="text-mutedText whitespace-nowrap text-[12px] hover:text-blue-500 transition duration-300"
                onClick={() => handleBreadcrumbClick(index)}
              >
                {path.label}
              </span>
            </div>
          )}
          {index < paths.length - 1 && (
            <span className="mx-2 w-fit  items-center justify-center flex text-mutedText">
              <ChevronLeft />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
