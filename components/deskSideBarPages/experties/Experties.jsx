import React from "react";

const Experties = ({ services }) => {
  return (
    <div className="w-full h-full bg-white gap-2 flex flex-col rounded-xl p-3">
      <p className="mb-4 font-bold">تخصص‌های شما</p>
      {services?.map((item, index) => (
        <Card key={index} title={item?.category?.title} />
      ))}
    </div>
  );
};

const Card = ({ title }) => {
  return (
    <div className="shadow rounded-lg w-full flex gap-2 items-center px-2 py-4">
      <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
      <span>{title}</span>
    </div>
  );
};

export { Experties };
