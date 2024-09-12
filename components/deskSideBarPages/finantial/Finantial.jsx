import { FinancialInformation } from "../../financialInformation/FinancialInformation";

const Finantial = ({ setClickSideBar }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-3">
      <FinancialInformation setClickSideBar={setClickSideBar} />
    </div>
  );
};

export { Finantial };
